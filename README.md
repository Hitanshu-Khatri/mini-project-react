# ⛅ Weather App (React)

A modern and responsive weather application built with **React** and **Material-UI**. Search weather by city or fetch it based on your current location. Displays both current weather conditions and a 5-day forecast.

---

## 📌 Features

- 🌍 Search weather by city name
- 📍 Fetch weather using current geolocation
- ☀️ Display current weather with detailed stats and city image
- 📆 Show 5-day weather forecast with icons and summaries
- 💻 Responsive, user-friendly UI built with Material-UI

---

## 🧩 Main Components

### 1. **WeatherApp.jsx**
- Root component managing all app state
- Uses `useState` to hold:
  - `weatherInfo`: current weather data
  - `forecast`: 5-day forecast
- Renders:
  - Header with cloud icon
  - `SearchBox` (input)
  - `InfoBox` (current weather display)
  - Forecast section with `ForecastCard` list

---

### 2. **SearchBox.jsx**
- Takes user input (city) or uses browser geolocation
- Fetches:
  - Current weather from OpenWeatherMap API
  - 5-day forecast (filtered to 1/day)
- On success: calls `updateInfo()` from props
- Uses Material-UI components
- Handles fetch errors with alerts and logs

---

### 3. **InfoBox.jsx**
- Displays current weather info:
  - Temperature, feels like, min/max, humidity, description, etc.
- Fetches background image from Unsplash API
- Uses:
  - Material-UI Cards
  - Weather icons based on description
  - Responsive grid layout

---

### 4. **ForecastCard.jsx**
- Displays forecast for a single day
- Shows:
  - Formatted date
  - Weather icon
  - Temperature, wind, humidity, description
- Styled with Material-UI `Paper` component and hover effects

---


---

## 🎨 Styling and UI

- Uses **Material-UI (MUI)** for layout and components
- Responsive design with media queries
- Custom CSS in:
  - `SearchBox.css`
  - `ForecastCard.css`
  - `InfoBox.css`
- Icons from FontAwesome and MUI Icons

---

## 🛠️ Getting Started

### ✅ Prerequisites

- Node.js & npm installed
- API keys for OpenWeatherMap and Unsplash

### 🚀 Installation

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
npm install
npm start
