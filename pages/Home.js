import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';

import WeatherInfo from '../components/WeatherInfo.component';
import WeatherList from '../components/WeatherList.component';
import { actions as WeatherActions } from '../redux/Weather.reducer';
import './Home.styles.css';

class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errorCode: null
        };
    }

    componentDidMount() {
        this._getWeatherData();
    }

    // TO DO: move async request to reducer (using thunk) or saga
    _getWeatherData = async () => {
        let errorCode;
        try {
            let weathers = [];
            // TO DO: set city dynamically by get user's current location
            const response = await fetch('https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&lang=zh_cn&appid=b1b15e88fa797225412429c1c50c122a1');
            const data = await response.json();
            
            // TO DO: create actions to separate fetch and parsing process
            data.list.forEach((element, index) => {
                const weather = {
                    key: index,
                    degree: element.deg,
                    currency: 'F',
                    currentDate: new Date(element.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' }),
                    time: new Date(element.dt * 1000).toLocaleDateString("en-US", 
                        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
                    caption: element.weather[0].description,
                    image: element.weather[0].main,
                    pressure: element.pressure,
                    humidity: element.humidity,
                    wind: element.speed,
                };

                weathers.push(weather);
            });

            const { saveWeatherHandler, setSelectedCard, setCity } = this.props;
            setSelectedCard(weathers[0]);
            saveWeatherHandler(weathers);
            setCity(data.city.name);
            errorCode = data.cod;
        } catch(err) {
            errorCode = null;
        } finally {
            this.setState({ loading: false, errorCode });
        }
    }

    _renderLoading = () => (
        // TO DO: create loading component beatifully
        <div className="title">Loading...</div>
    );

    _renderSuccessContent = () => (
        <React.Fragment>
            <div className="title">{this.props.city}</div>
            <WeatherInfo />
            <WeatherList />
        </React.Fragment>
    );

    _renderFailedContent = () => (
        // TO DO: create failed content beatifully with dynamic message
        <div className="title">Oops... Something went wrong</div>
    );

    _renderContent = () => 
        (this.state.errorCode) ? this._renderSuccessContent() : this._renderFailedContent();

    render() {
        return (
            <div className="container">
                { (this.state.loading) ? this._renderLoading() : this._renderContent() }
            </div>
        );
    };
}

const mapStateToProps = state => ({
    city: state.city
});

const mapDispatchToProps = {
    setSelectedCard: WeatherActions.setSelectedCard,
    saveWeatherHandler: WeatherActions.saveWeathers,
    setCity: WeatherActions.setCity
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
