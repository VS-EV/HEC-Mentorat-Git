// src/js/FeedBack.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"

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

InputFilter.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

// Render dans un seul div un input et un label
function InputFilter({id, name, type, value, onChange, placeholder, label}){

    return (
        <div className="feedback-input-and-label">
            <label className="feedback-label" htmlFor={id}>{label}</label>
            <input
                className="feedback-input"
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </div>  
    )
}

export default function FeedBack(){
  const [isSubmitted,setIsSubmitted]= useState(false)
  const [sumbmissionMessage,setSumbmissionMessage]= useState('')
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    childName: '',
    information: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {  
      addDoc(collection(db, "feedback"), formData);
      setSumbmissionMessage('Votre message a bien été transmis à nous équipes')
      setFormData({
        email: '',
        phone: '',
        childName: '',
        information: '',
      });
    } catch (error) {
      console.error("Error submiting feedback:", error);
      setSumbmissionMessage('Il y a eu une erreur dans la soumission de votre message, veuillez nous excuser de la gène occasionnée.')
    }
    setIsSubmitted(true)
  }

  return (
    <div className="feedback-container">
      <h2 className="feedback-h2">Vous souhaitez nous contacter ?</h2>
      <p className="feedback-p">Nous tacherons de vous répondre dans les plus bref délais</p>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <InputFilter
            id="email" 
            name="email" 
            type="email" 
            label='Email'
            value={formData.email}
            onChange={handleChange}
            placeholder="nicolas.dupont@gmail.com"
        />
        <InputFilter
            id="phone" 
            name="phone" 
            type="tel" 
            label='Numéro de téléphone'
            value={formData.phone}
            onChange={handleChange}
            placeholder="+33 X XX XX XX XX"
        />
        <InputFilter
            id="childName" 
            name="childName" 
            type="text" 
            label='Nom et Prénom'
            value={formData.childName}
            onChange={handleChange}
            placeholder="Dupont Nicolas"
        />
        <div className="form-group">
          <label htmlFor="information" className="feedback-label">Informations</label>
          <textarea
            className="feedback-textarea"
            id="information"
            name="information"
            value={formData.information}
            onChange={handleChange}
            placeholder="Je suis en première Année en prépa ECG et ..."
          />
        </div>
        {isSubmitted ? 
        <p className="feedback-p">{sumbmissionMessage}</p>
            : ''
        }
        <button type="submit" className="feedback-submit-btn">
          Envoyer
        </button>
      </form>
    </div>
  );
};