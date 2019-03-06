import './WeatherCard.component.styles.css';

const renderIcon = (image) => (
    '../static/images/' + image + '.png'
);

export const WeatherCard = ({ currentDate, degree, image }) => (
    // TO DO: fix styling
    <div className="card-container">
        <div><span>{currentDate}</span></div>
        <img draggable="false" className="image" src={renderIcon(image)} />
        <div>{degree}</div>
    </div>
);
