import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [theme, setTheme] = useState('light');
  const isMobile = useMediaQuery('(max-width:600px)');

  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const getWeatherInfo = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const jsonResponse = await response.json();
      let forecastData = await forecastRes.json();
      forecastData = forecastData.list.filter((_, index) => index % 8 === 0);

      return {
        newInfo: {
          city: cityName,
          temp: jsonResponse.main.temp,
          tempMin: jsonResponse.main.temp_min,
          tempMax: jsonResponse.main.temp_max,
          humidity: jsonResponse.main.humidity,
          windSpeed: jsonResponse.wind.speed,
          feelsLike: jsonResponse.main.feels_like,
          description: jsonResponse.weather[0].description,
        },
        forecastData2: forecastData,
      };
    } catch (error) {
      console.error("Failed to fetch weather info:", error);
      return null;
    }
  };

  const handleChange = (e) => setCity(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    const data = await getWeatherInfo(city);
    if (data) {
      updateInfo(data.newInfo, data.forecastData2);
      setCity("");
    } else {
      alert("Failed to fetch weather information. Please check the city name or your API key.");
    }
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    });
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  return (
    <Box className="SearchBox" sx={{ padding: 2, textAlign: "center" }}>
      <Paper elevation={3} sx={{
        padding: 3,
        borderRadius: 3,
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(5px)",
        maxWidth: 600,
        margin: "0 auto"
      }}>
        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', mb: 2 }}>
          🔍 Search for the Weather
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}>
            <TextField
              label="City Name"
              variant="outlined"
              value={city}
              onChange={handleChange}
              required
              sx={{
                width: isMobile ? '100%' : '300px',
                backgroundColor: '#a0d4fa9c',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  '& fieldset': {
                    borderColor: '#1976d2',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: '#1565c0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0d47a1',
                  },
                }
              }}
            />

            <Button variant="contained" type="submit" sx={{ borderRadius: 2 }}>
              Search
            </Button>

            <Button variant="contained" onClick={getUserLocation} sx={{ borderRadius: 2 }}>
              Use My Location
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
