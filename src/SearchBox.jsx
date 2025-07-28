import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"

import { useState, useEffect } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    let getWeathrInfo = async (cityName) => {
        try {
            let response = await fetch(API_URL + "?q=" + cityName + "&appid=" + API_KEY + "&units=metric");
            let forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            let jsonResponse = await response.json();
            const forecastData = await forecastRes.json();
            let forecastData2 = forecastData.list;
            forecastData2 = forecastData2.filter((item, index) => index % 8 === 0);
            console.log(forecastData2);
            let result = {
                city: cityName,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                windSpeed: jsonResponse.wind.speed,
                feelsLike: jsonResponse.main.feels_like,
                description: jsonResponse.weather[0].description,
            }
            console.log(result);
            return { newInfo: result, forecastData2: forecastData2 };
        } catch (error) {
            console.error("Failed to fetch weather info:", error);
            return null;
        }
    }

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(city);
        if (city.trim() === "") return;
        let data = await getWeathrInfo(city);
        if (data) {
            updateInfo(data.newInfo, data.forecastData2);
            setCity("");
        } else {
            alert("Failed to fetch weather information. Please check the city name or your API key.");
        }
    }

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherByCoords(lat, lon);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    // Fallback to default city or show an alert
                }
            );
        }
    }, []);

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
            );
            const data = await response.json();

            // Use the data to update your UI
            updateInfo({
                city: data.name,
                temp: data.main.temp,
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                description: data.weather[0].description,
            });
        } catch (err) {
            console.error("Failed to fetch weather by location:", err);
        }
    };
    return (
        <div className='SearchBox'>
            <div style={{
                    backgroundColor: "rgba(136, 135, 135, 0.77)",
                    display: "block",
                    borderRadius: "14px",
                    textAlign: "center",
                    margin: "0px",
                    padding: "0px",
                    height:"65px",
                }}>
            <h3>Search for the Weather</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <br /><br />
                <TextField className="userinput" id="city" label="City Name" variant="outlined" onChange={handleChange} required value={city}
                    sx={{
                        marginRight: '70px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '14px',
                            backgroundColor: '#a0d4fa9c',
                            width: "300px",
                            // ✅ light background
                            '& fieldset': {
                                borderWidth: '2px',
                                borderColor: '#1976d2',   // ✅ custom border color
                            },
                            '&:hover fieldset': {
                                borderColor: '#1565c0',   // ✅ on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#0d47a1',   // ✅ on focus
                            },
                        },
                    }}
                />

                <Button className="searchbtn" variant="contained" type='submit'>Search</Button>
                
                <Button style={{marginLeft:"10px"}}className="searchbtn" variant="contained" onClick={getUserLocation}>Use My Location</Button>
            </form>
        </div>
    )
}
