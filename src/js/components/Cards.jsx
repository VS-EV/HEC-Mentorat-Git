// src/components/Cards.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

Card.propTypes = {
  id: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  price: PropTypes.number,
};

export default function Card({ id, coverImg, name, rating, reviewCount,price}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () =>{
    setIsFavorite(!isFavorite);
  }

  return (
    <div key={id} id={id} className="home-card">
      <img src={coverImg} className="card-image" alt="" />
      <div className="card-overlay">
        <h4 className="card-title">{name}</h4>
        {rating && reviewCount && (
          <div className="card-rating">
            {rating} <ion-icon name="star"></ion-icon> <span className="review-count"> ({reviewCount} avis)</span>
          </div>
        )}
        <div className="card-price">{price}€/h</div>
        <div className="card-heart" onClick={toggleFavorite}>{isFavorite ? <ion-icon name="heart"></ion-icon> : <ion-icon name="heart-outline"></ion-icon>}</div>
      </div>
    </div>
  );
}