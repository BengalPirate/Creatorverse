import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, url, description, imageURL }) => {
  return (
    <div className="card">
      {imageURL && (
        <img src={imageURL} alt={name} className="card-image" />
      )}
      <div className="card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="card-actions">
          <a href={url} target="_blank" rel="noopener noreferrer" className="button">
            Visit Channel
          </a>
          <Link to={`/${id}`} className="button">
            View Details
          </Link>
          <Link to={`/edit/${id}`} className="button">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;