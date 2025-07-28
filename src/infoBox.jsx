import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GrainIcon from '@mui/icons-material/Grain';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "./infoBox.css";

export default function InfoBox({ info }) {
  const [imageUrl, setImageUrl] = useState("");

  const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  async function getCityImage(city) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashAccessKey}&orientation=landscape&per_page=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash.");
    }
    const data = await response.json();
    return data.results[0]?.urls?.regular;
  }

  useEffect(() => {
    getCityImage(info.city).then((url) => {
      if (url) setImageUrl(url);
    });
  }, [info.city]);

  return (
    <div className="InfoBox">
      <div className="InfoBox__row">
        <Card
          sx={{
            maxWidth: { xs: '90%', sm: 500 },
            margin: 'auto',
            borderRadius: '14px',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: '#a0d4fad7',
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              cursor: "pointer",
            },
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 250, width: "100%", filter: "brightness(60%)" }}
            image={imageUrl}
            alt={`Weather in ${info.city}`}
          />

          {/* Image Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 250,
              width: '100%',
              background: 'rgba(0,0,0,0.4)',
            }}
          />

          <CardContent
            sx={{
              position: 'relative',
              zIndex: 1,
              backgroundColor: "#ffffffcc",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Weather in {info.city}
            </Typography>

            {/* Condition Icon */}
            <Box sx={{ mb: 1 }}>
              {info.description?.toLowerCase().includes("rain") ? (
                <Typography><GrainIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Rainy Weather</Typography>
              ) : info.humidity > 80 ? (
                <Typography><GrainIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Humid Weather</Typography>
              ) : info.temp < 20 ? (
                <Typography><AcUnitIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Cold Weather</Typography>
              ) : (
                <Typography><WbSunnyIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Warm Weather</Typography>
              )}
            </Box>

            {/* Weather Details Grid */}
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={6}>
                <Typography>🌡 Temp: {info.temp}°C</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>🌡 Feels Like: <i>{info.feelsLike}°C</i></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>💧 Humidity: <i>{info.humidity}%</i></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>↕ Min: <i>{info.tempMin}°C</i></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>↕ Max: <i>{info.tempMax}°C</i></Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>📖 Description: {info.description}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
