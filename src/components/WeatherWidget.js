import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiNightClear, WiCloudy, WiRain, WiSnow, 
         WiThunderstorm, WiDust, WiHumidity, WiStrongWind } from "react-icons/wi";
import { MdLocationOn } from "react-icons/md";
import { BsThermometerHalf } from "react-icons/bs";
import "./Weather.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const getWeatherIcon = (iconCode) => {
    const icons = {
      "01d": <WiDaySunny className="main-weather-icon" />,
      "01n": <WiNightClear className="main-weather-icon" />,
      "02d": <WiCloudy className="main-weather-icon" />,
      "02n": <WiCloudy className="main-weather-icon" />,
      "03d": <WiCloudy className="main-weather-icon" />,
      "03n": <WiCloudy className="main-weather-icon" />,
      "04d": <WiCloudy className="main-weather-icon" />,
      "04n": <WiCloudy className="main-weather-icon" />,
      "09d": <WiRain className="main-weather-icon" />,
      "09n": <WiRain className="main-weather-icon" />,
      "10d": <WiRain className="main-weather-icon" />,
      "10n": <WiRain className="main-weather-icon" />,
      "11d": <WiThunderstorm className="main-weather-icon" />,
      "11n": <WiThunderstorm className="main-weather-icon" />,
      "13d": <WiSnow className="main-weather-icon" />,
      "13n": <WiSnow className="main-weather-icon" />,
      "50d": <WiDust className="main-weather-icon" />,
      "50n": <WiDust className="main-weather-icon" />,
    };
    return icons[iconCode] || <WiDaySunny className="main-weather-icon" />;
  };

  useEffect(() => {
    const getBangaloreWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Bangalore,IN&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching Bangalore weather:", error);
      }
    };

    const getWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        getBangaloreWeather();
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          getBangaloreWeather();
        }
      );
    } else {
      getBangaloreWeather();
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!weather) {
    return (
      <div className="weather-widget-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget-container">
      <div className="weather-widget-card">
        <div className="weather-header">
          <div className="location">
            <MdLocationOn className="location-icon" />
            <h3>{weather.name}, {weather.sys.country}</h3>
          </div>
          <div className="current-time">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        <div className="weather-body">
          <div className="weather-icon-temp">
            {getWeatherIcon(weather.weather[0].icon)}
            <div className="temperature-container">
              <BsThermometerHalf className="temp-icon" />
              <span className="temperature">{Math.round(weather.main.temp)}°C</span>
            </div>
          </div>
          
          <div className="weather-info">
            <p className="weather-description">
              {weather.weather[0].description}
            </p>
            
            <div className="weather-details">
              <div className="detail-item">
                <WiHumidity className="detail-icon" />
                <span>{weather.main.humidity}%</span>
                <label>Humidity</label>
              </div>
              <div className="detail-item">
                <WiStrongWind className="detail-icon" />
                <span>{weather.wind.speed} m/s</span>
                <label>Wind</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
