import SearchBox from './SearchBox';
import InfoBox from './infoBox';
import { useState } from 'react';
import ForecastCard from './ForecastCard';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        feelsLike: 24.4,
        humidity: 80,
        wind: 10.2,
        pressure: 1013.25,
        temperature: 22.5,
        tempMin: 23.5,
        tempMax: 24.5,
        weather: "cloudy",
        city: "Ahmedabad",
    });

    const [forecast, setForecast] = useState();


    let updateInfo = (newInfo, forecastData2) => {
        setWeatherInfo(newInfo);
        setForecast(forecastData2);
    }
    return (
        <div style={{ textAlign: "center" }}>

            <div style={{ display: "flex", alignItems: "left", justifyContent: "left", gap: "10px" }}>
                <i className="fa-solid fa-cloud" style={{ fontSize: "40px" }}></i>
                <h2 style={{ fontSize: "40px", margin: 0 }}>Weather App</h2>
            </div>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />

                {forecast ? (
                <div style={{
                    backgroundColor: "rgba(136, 135, 135, 0.77)",
                    display: "block",
                    borderRadius: "14px",
                    textAlign: "center",
                    margin: "0px",
                    padding: "0px",
                    height:"65px",
                }}>

                    
                    <h2 style={{
                        fontSize: "50px",
                        textAlign: "center",
                        color: "black",
                        margin:"0%",
                        width:"100%",
                        display:"inline-block",
                    }}>
                        Weather of next 5 days
                    </h2>
                    
                </div>
                ): null}
            

            <div className="forecast-container">

                {forecast && forecast.map((item, index) => (
                    <ForecastCard key={index} forecast={item} />
                ))}

            </div>
        </div>

    )
}