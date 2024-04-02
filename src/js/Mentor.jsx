// src/js/Mentor.jsx 
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

import dataHomeMentor from "./components/mentor-data.js";
import Card from "./components/Cards";
import { getFavorites } from "./components/Cards";

import '../css/mentor.css'

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

InputFilter.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

// Render dans un seul div un input et un label de type radio
function InputFilter({id, name, type, label, onChange, filtersActive}){

    return (
        <div className="mentor-input-and-label">
            <input
                className="mentor-input" 
                id={id}
                name={name}
                type={type}
                readOnly = {true}
                onChange={onChange}
                disabled={!filtersActive}
            />
            <label htmlFor={id}>{label}</label>
        </div>  
    )
}

isFiltered.propTypes = {
    mentor: PropTypes.shape({
        locations: PropTypes.arrayOf(PropTypes.string).isRequired,
        levels: PropTypes.arrayOf(PropTypes.string).isRequired,
        availabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    filterLocations: PropTypes.arrayOf(PropTypes.string).isRequired,
    filterLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
    filterAvailabilities: PropTypes.arrayOf(PropTypes.string).isRequired,
};
function isFiltered(mentor, filterLocations, filterLevels, filterAvailabilities, onlyFavorites, favorites) {
    const mentorLocations = mentor.locations || [];
    const mentorLevels = mentor.levels || [];
    const mentorAvailabilities = mentor.availabilities || [];
    const isFavorite = favorites.includes(mentor.id);
  
    return (
      (!onlyFavorites || isFavorite) &&
      filterLocations.some(location => mentorLocations.includes(location)) &&
      filterLevels.some(level => mentorLevels.includes(level)) &&
      filterAvailabilities.some(availability => mentorAvailabilities.includes(availability))
    );
  }

export default function Mentor(){
    const allLocations = ["online", "home", "outside"];
    const allLevels = ["college", "lycée", "1A", "2A"];
    const allAvailabilities = ["morning", "afternoon", "night"];

    const [filterLocations, setFilterLocations] = useState(allLocations);
    const [filterLevels, setFilterLevels] = useState(allLevels);
    const [filterAvailabilities, setFilterAvailabilities] = useState(allAvailabilities);

    const [filtersActive, setFiltersActive] = useState(false);
    const [onlyFavorites, setOnlyFavorites] = useState(false);
    const [favorites, setFavorites] = useState([]);


    const toggleFilters = () => {
        setFiltersActive(!filtersActive);
    };

    const toggleFavoriteFilter = () => {
        setOnlyFavorites(!onlyFavorites);
    };

    useEffect(() => {
        if (filtersActive) {
            setFilterLocations([])
            setFilterLevels([])
            setFilterAvailabilities([])
        } else {
            setFilterLocations(allLocations)
            setFilterLevels(allLevels)
            setFilterAvailabilities(allAvailabilities)
        }
    }, [filtersActive]);

    useEffect(() => {
        const fetchFavorites = async () => {
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
            const favs = await getFavorites(userId);
            setFavorites(favs);
          }
        };
      
        fetchFavorites();
      }, []);

    const handleLocationChange = (location, checked) => {
        setFilterLocations(
            checked
                ? [...filterLocations, location]
                : filterLocations.filter(l => l !== location)
        );
    };

    const handleLevelChange = (level, checked) => {
        setFilterLevels(
            checked
                ? [...filterLevels, level]
                : filterLevels.filter(l => l !== level)
        );
    };

    const handleAvailabilityChange = (availability, checked) => {
        setFilterAvailabilities(
            checked
                ? [...filterAvailabilities, availability]
                : filterAvailabilities.filter(a => a !== availability)
        );
    };

    const filteredMentors = dataHomeMentor.filter(mentor =>
        isFiltered(mentor, filterLocations, filterLevels, filterAvailabilities, onlyFavorites, favorites)
      );
    
    return (
        <main className="mentor-main">
            {/* Sidebar avec tous les filtres */}
            <aside  className="mentor-aside" >
                <div className="filter-container">
                    <h2  className="mentor-h2" >
                        Filtres   
                        <button className="mentor-filter-toggle-btn" onClick={toggleFilters}>{filtersActive ? "Désactiver les filtres" : "Activer les filtres"}</button>
                    </h2>
                    
                    <div className={`mentor-filter-list ${!filtersActive ? 'filters-disabled' : ''}`}>
                        {/* Lieux des cours */}
                        <fieldset className="mentor-filter-section" id="mentor-location-fieldset">
                            <legend className="mentor-legend">Lieux des cours</legend>
                            <InputFilter 
                                id="filter-location-online" 
                                name="filter-location" 
                                type="checkbox" 
                                label='En ligne 🖥️'
                                filtersActive={filtersActive}
                                onChange={(e) => handleLocationChange("online", e.target.checked)}
                            />
                            <InputFilter 
                                id="filter-location-home" 
                                name="filter-location" 
                                type="checkbox"
                                label='À domicile 🏡'
                                filtersActive={filtersActive}
                                onChange={(e) => handleLocationChange("home", e.target.checked)}
                            />
                            <InputFilter 
                                id="filter-location-outside" 
                                name="filter-location" 
                                type="checkbox"
                                label='Lieu public 📚'
                                filtersActive={filtersActive}
                                onChange={(e) => handleLocationChange("outside", e.target.checked)}
                            />
                        </fieldset>

                        {/* Niveau */}
                        <fieldset className="mentor-filter-section" id="mentor-level-fieldset">
                            <legend className="mentor-h3">Niveau</legend>
                            <InputFilter 
                                id="filter-level-college" 
                                name="filter-level" 
                                type="checkbox"
                                label='Collège'
                                filtersActive={filtersActive}
                                onChange={(e) => handleLevelChange("college", e.target.checked)}
                            />
                            <InputFilter 
                                id="filter-level-lycee" 
                                name="filter-level" 
                                type="checkbox"
                                label='Lycée'
                                filtersActive={filtersActive}
                                onChange={(e) => handleLevelChange("lycée", e.target.checked)}
                            />
                            <InputFilter 
                                id="filter-level-1A" 
                                name="filter-level" 
                                type="checkbox"
                                label='Première Année'
                                filtersActive={filtersActive}
                                onChange={(e) => handleLevelChange("1A", e.target.checked)}
                            />
                            <InputFilter 
                                id="filter-level-2A" 
                                name="filter-level" 
                                type="checkbox"
                                label='Deuxième Année'
                                filtersActive={filtersActive}
                                onChange={(e) => handleLevelChange("2A", e.target.checked)}
                            />
                        </fieldset>

                        {/* Disponibilités */}
                        <fieldset className="mentor-filter-section" id="mentor-availability-fieldset">
                            <legend className="mentor-h3">Disponibilités</legend>
                            <InputFilter 
                                id="filter-availability-morning" 
                                name="filter-availability" 
                                type="checkbox"
                                label='Dans la matinée'
                                filtersActive={filtersActive}
                                onChange={(e) => handleAvailabilityChange("morning", e.target.checked)}
                            />
                            <InputFilter 
                                id="filter-availability-afternoon" 
                                name="filter-availability" 
                                type="checkbox"
                                label="Dans l'après midi"
                                filtersActive={filtersActive}
                                onChange={(e) => handleAvailabilityChange("afternoon", e.target.checked)}
                            />
                            <InputFilter 
                                id="filter-availability-night" 
                                name="filter-availability" 
                                type="checkbox"
                                label='Dans la soirée'
                                filtersActive={filtersActive}
                                onChange={(e) => handleAvailabilityChange("night", e.target.checked)}
                            />
                        </fieldset>
                    </div>
                </div>
            </aside>
            {/* Affichage central des mentor cards */}
            <div className="mentor-main-container">
                <button className="mentor-only-favorite-btn" onClick={toggleFavoriteFilter}>
                    Favoris 
                    <div className="mentor-heart">
                        {onlyFavorites ? <ion-icon name="heart"></ion-icon> : <ion-icon name="heart-outline"></ion-icon>} 
                    </div>
                </button>
                <div className="mentor-main-card-container">
                    {filteredMentors.map((mentor) => (
                    <Card
                        key={mentor.id}
                        id={mentor.id}
                        coverImg={mentor.coverImg}
                        name={mentor.name}
                        rating={mentor.rating}
                        reviewCount={mentor.reviewCount}
                        price={mentor.price}
                    />
                    ))}
                </div>
            </div>
        </main>
    )
};