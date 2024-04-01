// src/components/Cards.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc, setDoc, getDocs, doc, deleteDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCtjchwiIcyzeNbx7XLo9ekldPsVmVcs5A",
    authDomain: "mentor-hec.firebaseapp.com",
    projectId: "mentor-hec",
    storageBucket: "mentor-hec.appspot.com",
    appId: "1:852168196060:web:f0cb26536636a1a0ca1919",
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

Card.propTypes = {
  id: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  price: PropTypes.number,
};


async function getFavorites(userId) {
  try {
    const favoritesRef = collection(db, `users/${userId}/favorites`);
    const querySnapshot = await getDocs(favoritesRef);
    const favorites = [];

    querySnapshot.forEach((doc) => {
      const favorite = doc.data();
      favorites.push(favorite.id);
    });
    return favorites;
  } catch (error) {
    console.error("Erreur lors de la récupération des favoris :", error);
    return [];
  }
}


export default function Card({ id, coverImg, name, rating, reviewCount,price}) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const favorites = await getFavorites(userId);
          const isFav = favorites.includes(id);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error("Erreur lors de la recherche des favoris :", error);
      }
    };

    fetchFavoriteStatus();
  }, [id]);

  const toggleFavorite = async (id) =>{
    try {
      const user = auth.currentUser;
      if (user){
        if(!isFavorite){
          const userId = user.uid;
            const favoritesRef = collection(db, `users/${userId}/favorites`);
            await addDoc(favoritesRef, id );         
          setIsFavorite(true);  
        } else {
          console.log('unfavoriting')
          const userId = user.uid;
            const favoriteDocRef = doc(db, `users/${userId}/favorites/${id}`);
            const querySnapshot = await getDocs(favoriteDocRef);
            querySnapshot.forEach((doc) => {
              if (doc.data() === id){
                console.log(doc.data())
                const favoriteId = doc.id;
                console.log(favoriteId)
                deleteDoc(doc(db, `users/${userId}/favorites/${favoriteId}`));
              }
            });

          setIsFavorite(false);
        }
      } else {
          console.log("Utilisateur non connecté.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la carte aux favoris :", error);
  }
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
        <div className="card-heart" onClick={() => toggleFavorite({id})}>{isFavorite ? <ion-icon name="heart"></ion-icon> : <ion-icon name="heart-outline"></ion-icon>}</div>
      </div>
    </div>
  );
}