import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ForecastCard = ({ forecast }) => {
  const date = new Date(forecast.dt_txt);
  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;

  return (
    <Paper
      elevation={4}
      sx={{
        width: 180,
        padding: 2,
        margin: 1,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {date.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })}
      </Typography>

      <Box component="img"
        src={iconUrl}
        alt={forecast.weather[0].description}
        sx={{ height: 64, width: 64, margin: '0 auto' }}
      />

      <Typography variant="body2" sx={{ mt: 1 }}>
        {forecast.weather[0].description}
      </Typography>

      <Typography variant="body2">🌡 Temp: {Math.round(forecast.main.temp)}°C</Typography>
      <Typography variant="body2">💨 Wind: {forecast.wind.speed} m/s</Typography>
      <Typography variant="body2">💧 Humidity: {forecast.main.humidity}%</Typography>
    </Paper>
  );
};

export default ForecastCard;
