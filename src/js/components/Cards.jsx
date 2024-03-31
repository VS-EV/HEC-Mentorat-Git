// src/components/Cards.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { initializeApp } from "firebase/app";
import { getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy } from "firebase/firestore"

import '../css/feedback.css'

const firebaseConfig = {
    apiKey: "AIzaSyCtjchwiIcyzeNbx7XLo9ekldPsVmVcs5A",
    authDomain: "mentor-hec.firebaseapp.com",
    projectId: "mentor-hec",
    storageBucket: "mentor-hec.appspot.com",
    appId: "1:852168196060:web:f0cb26536636a1a0ca1919",
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

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