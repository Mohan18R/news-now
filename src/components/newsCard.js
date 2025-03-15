import React, { useState } from "react";

const NewsCards = ({ articles }) => {
  const [imageLoadError, setImageLoadError] = useState({});

  const fallbackImage = "https://via.placeholder.com/400x200?text=News";

  const handleImageError = (index) => {
    setImageLoadError(prev => ({...prev, [index]: true}));
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
      {articles.map((article, index) => (
        <div className="col" key={index}>
          <div className="card h-100">
            <div className="card-img-wrapper">
              <img
                src={imageLoadError[index] ? fallbackImage : (article.urlToImage || fallbackImage)}
                alt={article.title}
                onError={() => handleImageError(index)}
                loading="lazy"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              {article.description && <p className="card-text">{article.description}</p>}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-auto"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCards;
