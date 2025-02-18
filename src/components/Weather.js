import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            setWeather(response.data);
          } catch (error) {
            console.error('Error fetching weather:', error);
            // Fallback to Bangalore if location access fails
            fetchBangaloreWeather();
          }
          setLoading(false);
        },
        // If user denies location access, fallback to Bangalore
        () => {
          fetchBangaloreWeather();
          setLoading(false);
        }
      );
    } else {
      // If geolocation is not supported, fallback to Bangalore
      fetchBangaloreWeather();
      setLoading(false);
    }
  }, []);

  const fetchBangaloreWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Bangalore,IN&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching Bangalore weather:', error);
    }
  };

  if (loading) return <div>Loading weather...</div>;
  if (!weather) return null;

  return (
    <div className="weather-widget">
      <div className="weather-info">
        <div className="location">
          <h3>{weather.name}, {weather.sys.country}</h3>
        </div>
        <div className="temperature">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="weather-description">
          {weather.weather[0].description}
        </div>
        <div className="weather-details">
          <span>Humidity: {weather.main.humidity}%</span>
          <span>Wind: {weather.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default Weather; 