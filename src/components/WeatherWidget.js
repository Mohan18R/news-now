import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherWidget = () => {
  // Set default location to Bengaluru
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(new Date());

  const fetchWeather = async () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // Access the API key from .env file
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=metric&appid=${apiKey}` // Fixed location Bengaluru
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    fetchWeather();
    const timer = setInterval(() => setDate(new Date()), 1000); // Update time every second
    return () => clearInterval(timer);
  }, []); // Empty dependency array since location is static

  return (
    <div className="weather-widget card text-center shadow-lg">
      {weather ? (
        <div className="card-body">
          <h5 className="card-title">{weather.name}, {weather.sys.country}</h5>
          <div className="d-flex justify-content-center">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <h3 className="card-text">{weather.main.temp}°C</h3>
          </div>
          <p className="card-text">{weather.weather[0].description}</p>
          <p className="card-text">{date.toLocaleDateString()} | {date.toLocaleTimeString()}</p>
        </div>
      ) : (
        <div className="card-body">
          <p>Loading weather data...</p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
