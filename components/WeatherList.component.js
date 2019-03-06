import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import { WeatherCard } from './WeatherCard.component';
import { actions as WeatherActions } from '../redux/Weather.reducer';

class WeatherList extends React.Component {
    _renderCards = (list) => list.map((item) => 
        <WeatherCard
            key={item.key}
            degree={item.degree}
            currentDate={item.currentDate}
            image={item.image}
        />
    );

    _onClickItem = (key) => {
        const selected = find(this.props.list, { key: parseInt(key) });
        this.props.setSelectedCard(selected);
    }

    render() {
        // TO DO: styling for hover and click list item
        return (
            <ScrollMenu
                data={this._renderCards(this.props.list)}
                wheel
                dragging
                clickWhenDrag
                onSelect={this._onClickItem}
            />
        );
    }
}

const mapStateToProps = state => ({
    list: state.weathers
});

const mapDispatchToProps = {
    setSelectedCard: WeatherActions.setSelectedCard
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);
