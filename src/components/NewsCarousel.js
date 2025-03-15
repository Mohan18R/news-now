import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const NewsCarousel = ({ articles }) => {
  const [imageLoadError, setImageLoadError] = useState({});

  const fallbackImage = "https://via.placeholder.com/800x400?text=News";

  const handleImageError = (index) => {
    setImageLoadError(prev => ({...prev, [index]: true}));
  };

  return (
    <Carousel className="shadow" interval={5000}>
      {articles.map((article, index) => (
        <Carousel.Item key={index}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <div className="carousel-image-container">
              <img
                src={imageLoadError[index] ? fallbackImage : (article.urlToImage || fallbackImage)}
                alt={article.title}
                onError={() => handleImageError(index)}
                loading="lazy"
              />
              <div className="carousel-gradient-overlay"></div>
            </div>
            <Carousel.Caption>
              <h5>{article.title}</h5>
              {article.description && <p>{article.description}</p>}
            </Carousel.Caption>
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default NewsCarousel;
