import React from "react";
import { Carousel } from "react-bootstrap";

const NewsCarousel = ({ articles }) => {
  return (
    <Carousel className="shadow">
      {articles.map((article, index) => (
        <Carousel.Item key={index}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img
              className="d-block w-100"
              src={article.urlToImage || "https://via.placeholder.com/800x400"}
              alt={article.title}
            />
            <Carousel.Caption>
              <h5>{article.title}</h5>
              <p>{article.description}</p>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default NewsCarousel;
