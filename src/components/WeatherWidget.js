import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to a location if geolocation fails
          getWeather(51.5074, -0.1278); // London coordinates
        }
      );
    }

    // Update time every minute
    const timer = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!weather) {
    return (
      <div className="weather-widget card text-center shadow-lg">
        <div className="card-body p-4">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading weather data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget shadow-lg rounded-4 border-0">
      <div className="card-body p-4 text-white">
        <h5 className="fw-bold mb-3">
          <i className="bi bi-geo-alt me-2"></i>
          {weather?.name}, {weather?.sys?.country}
        </h5>
        <div className="d-flex justify-content-center align-items-center">
          <div className="display-1 fw-bold mb-0">
            {Math.round(weather?.main?.temp)}°C
          </div>
        </div>
        <p className="text-center mb-0">{weather?.weather[0]?.description}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
