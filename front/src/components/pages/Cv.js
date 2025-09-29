import React from "react";
import "../../styles/pages/Cv.css"; // Styles pour le composant Cv
import axios from "axios";

export default function Cv({ cvData, onClose }) {


    const handleLogin = () => {

            };

  return (
    <div className="cv-container">
        <button className="close-button" onClick={onClose}>
            <span role="img" aria-label="close">❌</span>
        </button>
            
        <h2>Mon CV</h2>
        <p>Nom:</p>
        
        <button onClick={handleLogin}>Récupérer le CV</button>
    </div>
  );
}
