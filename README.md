# NewsNow - Modern News & Weather Dashboard

A modern, responsive news aggregator built with React that provides real-time news updates and local weather information. Features both light and dark modes for enhanced user experience.

## 🚀 Features

- **Real-time News Updates**
  - Live news feed from GNews API
  - Category-based filtering (General, Business, Technology, etc.)
  - Search functionality for specific news topics
  - Interactive news carousel for trending stories

- **Weather Integration**
  - Real-time local weather updates via OpenWeatherMap API
  - Automatic location detection
  - Displays temperature, humidity, wind speed, and weather conditions
  - Fallback to default location (Bangalore) if geolocation is unavailable

- **User Interface**
  - Responsive design for all device sizes
  - Dark/Light mode toggle
  - Smooth animations and transitions
  - Scroll-to-top functionality
  - Bootstrap-based card layout for news articles

## 🛠️ Technologies Used

- React.js
- Axios for API integration
- Bootstrap 5 for responsive design
- React Icons
- OpenWeatherMap API
- GNews API
- GitHub Pages for deployment

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Mohan18R/news-now.git
cd news-now
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
REACT_APP_WEATHER_API_KEY=your_openweather_api_key
REACT_APP_GNEWS_API_KEY=your_gnews_api_key
```

4. Start the development server:
```bash
npm start
```

## 🌐 Live Demo

Visit the live application: [NewsNow Dashboard](https://Mohan18R.github.io/news-now)

## 📱 Screenshots

[Add screenshots of your application here]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
