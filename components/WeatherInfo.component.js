import React from 'react';
import { connect } from 'react-redux';
import './WeatherInfo.component.styles.css';

class WeatherInfo extends React.Component {
    // TO DO: make get icon func more modular and efficient
    _renderIcon = () => (
        '../static/images/' + this.props.weather.image + '.png'
    );

    _renderLeftInfo = () => {
        const { weather: { time, caption, degree, currency } } = this.props;
        return (
            <div className="left-info">
                <div className="text">{time}</div>
                <div className="text">{caption}</div>
                <div className="degree-container">
                    <img className="image-weather" src={this._renderIcon()} />
                    <div className="degree-text">{degree}</div>
                    <div className="degree-type">{currency}</div>
                </div>
            </div>
        );
    };

    _renderRightInfo = () => {
        const { weather: { pressure, humidity, wind} } = this.props;
        return (
            <div className="right-info">
                <div><span>Pressure: {pressure}</span></div>
                <div><span>Humidity: {humidity}%</span></div>
                <div><span>Wind: {wind} km/h</span></div>
            </div>
        );
    }

    render() {
        return (
            <div className="weather-info-container">
                { this._renderLeftInfo() }
                { this._renderRightInfo() }
            </div>
        );
    };
}

const mapStateToProps = state => ({
    weather: state.data
});

export default connect(mapStateToProps)(WeatherInfo);
