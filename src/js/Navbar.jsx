// src/js/Navbar.jsx 
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import '../css/navbar.css'

// Fonction de scroll sur une page avec plusierus sections
const scrollToSection = (event, sectionId, gap) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        const currentPosition = section.getBoundingClientRect().top + window.scrollY - gap;
        window.scrollTo({ top : currentPosition,behavior: 'smooth' });
    }
  }

export default function Navbar(){
    return (
        <nav className="home-nav">
            <ul className="nav-ul">
                <li className="nav-li">
                    <Link to="/" onClick={(event) => {console.log(window.location.pathname) ; if (window.location.pathname === '/') {scrollToSection(event, 'home-page-section', 200);}}}>
                        <img src="src/assets/Lvmh.png" alt="" width='163'/>
                    </Link>
                </li>
                <li className="nav-li">
                    <Link className="nav-a" to="/" onClick={(event) => {if (window.location.pathname === '/') {
                                                                                scrollToSection(event, 'pricing-section', 100);
                                                                                }}}>Tarifs</Link>
                </li>
                <li className="nav-li">
                    <Link className="nav-a" to="/mentor" >Nos cours</Link>
                </li>
                <li className="nav-li">
                    <Link className="nav-a" >Donner des cours</Link>
                </li>
                <li className="nav-li">
                    <Link className="nav-a" onClick={(event) => scrollToSection(event, 'contact')}>Nous contacter</Link>
                </li>
                <li className="nav-li">

                    <Link className="nav-a" to="/" onClick={(event) => {if (window.location.pathname === '/') {scrollToSection(event, 'why-us-section', 100);}}}>Se renseigner</Link>
                </li>
                <li className="nav-li">
                    <Link className="nav-btn" to="/login">Connexion</Link>
                </li>
                <li className="nav-li">
                    <Link className="nav-btn" to="/mentor">Trouver votre mentor</Link>
                </li>
            </ul>
        </nav>
    )
}