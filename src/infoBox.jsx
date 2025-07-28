import Card from '@mui/material/Card';
import "./infoBox.css"
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import GrainIcon from '@mui/icons-material/Grain';

export default function InfoBox({ info }) {
  const [imageUrl, setImageUrl] = useState("");
  
  
  const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  async function getCityImage(city) {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${info.city}&client_id=${unsplashAccessKey}&orientation=landscape&per_page=1`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash.");
    }

    const data = await response.json();
    return data.results[0]?.urls?.regular; // Return image URL
  }

  useEffect(() => {

    getCityImage(info.city).then((url) => {
      if (url)
         setImageUrl(url);
        document.body.style.backgroundImage = `url(${url})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed'; 
    });

  }, [info.city]); // Fetch new image whenever city changes

  const backgroundStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
    };

  return (
    <div className="InfoBox">

      <div className="InfoBox__row">
        <Card sx={{
          maxWidth: 500,
          borderRadius: '14px',
          '&:hover': {
            backgroundColor: '#a0d4fad7',
             boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
             cursor: "pointer",
          },
        }}>
          <CardMedia
            sx={{ height: 250 }}
            image={imageUrl}
            title="Weather"
          />
          <CardContent sx={{ textAlign: "center", backgroundColor: "#a0d4fad7" }}>
            <Typography gutterBottom variant="h5" component="div">
              <b>Weather in {info.city}</b>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
              <p>Temperature {info.temp}</p>
              {info.description?.toLowerCase().includes("rain") ? (
                <p><GrainIcon /> Rainy Weather</p>
              ) : info.humidity > 80 ? (
                <p><GrainIcon /> Humid Weather</p>
              ) : info.temp < 20 ? (
                <p><AcUnitIcon /> Cold Weather</p>
              ) : (
                <p><WbSunnyIcon /> Warm Weather</p>
              )}
              <p>The weather can be described as {info.description}</p>
              <p>Feels Like <i>{info.feelsLike}</i></p>
              <p>Humidity <i>{info.humidity}</i></p>
              <p>TempMin <i>{info.tempMin}</i></p>
              <p>TempMax <i>{info.tempMax}</i></p>
            </Typography>
          </CardContent>

        </Card>
      </div>
    </div>
  )
};