import React from 'react';
import './ForecastCard.css';

const ForecastCard = ({ forecast }) => {
  const date = new Date(forecast.dt_txt);
  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

  return (
    
    <div >
      
      <div className="forecast-card">
      <h4 className='h44'>{date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</h4>
      <img src={iconUrl} alt={forecast.weather[0].description} className="weather-icon" />
      <p className="description">{forecast.weather[0].description}</p>
      <p className="temp">Temp: {Math.round(forecast.main.temp)}°C</p>
      <p className="wind">Wind: {forecast.wind.speed} m/s</p>
      <p className="humidity">Humidity: {forecast.main.humidity}%</p>
      </div>
    </div>
  );
};

export default ForecastCard;
