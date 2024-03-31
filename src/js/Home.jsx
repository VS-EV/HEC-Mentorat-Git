// src/js/Home.jsx 
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

import Card from "./components/Cards";
import dataHomeMentor from './components/mentor-examples.js'

import '../css/home.css'
import '../css/cards.css'

// Carrousel infini de mentors
export function Models() {
    const cards = dataHomeMentor.map((item) => {
      return (
          <Card
              key={item.id}
              id={item.id}
              coverImg={item.coverImg}
              name={item.name}
              rating={item.rating}
              reviewCount={item.reviewCount}
              price={item.price}
          />
        );
      });
    return (
        <section className="cards-carroussel">
            {cards}
            {cards}
        </section>
    );
  }
  

export default function Home(){
    return (
        <main>
            {/* Page d'accueil */}
            <section className="home-page-section" id="home-page-section">
                <section className="facing-section" id="mentor">
                    <h1 className="main-h1" >Insrivez vous dès maintenant en tant que Mentor</h1>
                    <p className="main-p">Partagez votre passion pour le savoir et guidez les élèves sur le chemin de la réussite.</p>
                    <p className="main-p">Avec des tarifs compétitifs, vous serez amplement récompensé pour votre <br/>dévouement et votre expertise.</p>
                    <img className="mentor-img" src="src/assets/mentor.jpg" width='190' alt="" />
                    <Link to="#afaire" className="main-a">Donnez vos premiers cours dès maintenant</Link>
                </section>
                <section className="facing-section" id="student">
                    <h1 className="main-h1">Devenez élève chez nous</h1>
                    <p className="main-p">Cours particuliers & soutien scolaire dispensés exclusivement par des étudiants de Hec.<br/>À partir de 14€/heure.</p>
                    <p className="main-p">Agence 100% étudiante agréée par l'État.<br/> 800 élèves déjà accompagnés.</p>
                    <Link to="/Mentor" className="main-a">Trouvez votre mentor dès maintenant</Link>
                </section>
            </section>


            {/* Pourquoi Nous ? */}
            <section className="why-us-section" id="why-us-section">
                <h2 className="main-h1">Pourquoi nous choisir ?</h2>
                <ul className="why-us-ul">
                    <li>Des mentors hautement qualifiés et passionnés par l'enseignement</li>
                    <li>Un suivi personnalisé adapté à vos besoins</li>
                    <li>Des tarifs abordables pour un enseignement de qualité</li>
                    <li>Une plateforme facile à utiliser pour réserver vos cours</li>
                </ul>
                    <Models/>
            </section>

            {/* Tarification */}
            <section className="pricing-section" id="pricing-section">
                <h2 className="main-h1">Nos tarifs et formules</h2>
                <div className="pricing-grid">
                    <div className="pricing-card">
                        <h3 className="main-h1">Formule à l'heure</h3>
                        <p className="main-p">14€/heure</p>
                        <ul className="main-p">
                        <li>Cours en présentiel ou en ligne</li>
                        <li>Flexibilité des horaires</li>
                        <li>Paiement à l'heure</li>
                        </ul>
                    </div>
                    <div className="pricing-card">
                        <h3 className="main-h1">Formule mensuelle</h3>
                        <p className="main-p">120€/mois</p>
                        <ul className="main-p">
                        <li>8 heures de cours par mois</li>
                        <li>Tarif avantageux</li>
                        <li>Engagement sur 3 mois minimum</li>
                        </ul>
                    </div>
                    <div className="pricing-card">
                        <h3 className="main-h1">Formule annuelle</h3>
                        <p className="main-p">1200€/an</p>
                        <ul className="main-p">
                        <li>100 heures de cours par an</li>
                        <li>Meilleur tarif</li>
                        <li>Suivi personnalisé inclus</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Comment ça marche */}
            <section className="how-it-works-section" id="how-it-works-section" >
                <h2 className="main-h1">Comment ça marche ?</h2>
                <ol className="main-p">
                    <li>
                        <h1 className="main-h1">Choisissez votre formule</h1>
                        <p className="main-p">Sélectionnez la formule qui correspond le mieux à vos besoins et à votre budget.</p>
                    </li>
                    <li>
                        <h1 className="main-h1">Réservez vos cours</h1>
                        <p className="main-p">Accédez à notre plateforme en ligne et réservez vos cours en quelques clics.</p>
                    </li>
                    <li>
                        <h1 className="main-h1">Rencontrez votre mentor</h1>
                        <p className="main-p">Votre mentor vous contactera pour convenir des détails de vos sessions de cours.</p>
                    </li>
                    <li>
                        <h1 className="main-h1">Progressez à votre rythme</h1>
                        <p className="main-p">Votre mentor s'adaptera à votre rythme et à vos objectifs pour vous aider à atteindre vos buts.</p>
                    </li>
                </ol>
            </section>
        </main>
        
    )
}