import React from "react";

const NewsCards = ({ articles }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
      {articles.map((article, index) => (
        <div className="col" key={index}>
          <div className="card h-100 shadow">
            <img
              src={article.urlToImage || "https://via.placeholder.com/400x200"}
              className="card-img-top"
              alt={article.title}
            />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
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
