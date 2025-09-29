import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { connectUser } from "../../store/Store";
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Logo from '../../assets/logo.png';
import Back from '../../assets/back.jpg';
import Plant from '../../assets/plant.png';
import Tablet from '../../assets/tablet.png';
import "../../styles/authentification/Login.css";

export default function Login({ onLogin }) {
  axios.defaults.baseURL = process.env.REACT_APP_API_API;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLogin = () => {
    console.log("Sending request to:", axios.defaults.baseURL + "/api/v1/user/login");
    axios.post("/api/v1/user/login", { email, password })
      .then((response) => {
        const user = response.data;
        if (user.message === "Authentication failed") {
          setErrorMessage("Email ou mot de passe invalide");
        } else if (user.message === "Authentication success") {
          dispatch(connectUser({
            id: user.id,
            firstName: user.firstName,
            darkMode: user.darkMode,
            applications: user.applications
          }));
          onLogin(); // ✅ met à jour isAuthenticated dans App.js
          navigate("/home");
          setErrorMessage(null);
        }
      })
      .catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                setErrorMessage("Email ou mot de passe invalide");
                } else {
                setErrorMessage("Erreur : " + error.response.status);
                }
                console.error("Erreur API:", error.response);
            } else if (error.request) {
                setErrorMessage("Aucune réponse du serveur.");
                console.error("Erreur réseau:", error.request);
            } else {
                setErrorMessage("Erreur inconnue : " + error.message);
                console.error("Erreur inconnue:", error.message);
            }
        });

  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-tablet-container">
          <img src={Tablet} alt="Tablet" className="login-tablet" />
        </div>
        <div className="login-plant-container">
          <img src={Plant} alt="Plant" className="login-plant" />
        </div>
        <div className="login-back-container">
          <img src={Back} alt="Back" className="login-back" />
        </div>
      </div>

      <div className={`login-box ${isSignup || isForgotPassword ? "move-transition" : ""}`}>
        <img src={Logo} alt="Logo" className="login-logo" />

        {isSignup ? (
          <Signup onLogin={onLogin} />  // ✅ onLogin transmis ici
        ) : isForgotPassword ? (
          <ForgotPassword />
        ) : (
          <>
            <h2>Bienvenue dans votre espace DoctoMaroc</h2>
            <input
              type="text"
              placeholder="Identifiant ou Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="show-password" onClick={toggleShowPassword}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button onClick={handleLogin}>Se connecter</button>
            <div className="additional-links">
              <a onClick={() => setIsForgotPassword(true)}>Mot de passe oublié ?</a>
              <a onClick={() => setIsSignup(true)}>Première connexion</a>
            </div>
          </>
        )}

        {(isSignup || isForgotPassword) && (
          <a className="back-to-login" onClick={() => {
            setIsSignup(false);
            setIsForgotPassword(false);
          }}>Retour</a>
        )}

        <div className="login-plant-container-mobile">
          <img src={Plant} alt="Plant" className="login-plant-mobile" />
        </div>
      </div>
    </div>
  );
}
