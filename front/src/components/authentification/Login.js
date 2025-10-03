import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { connectUser } from "../../store/Store";
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Logo from '../../assets/logo.png';        // ← remplace par ton logo blanc si tu as
import ArenaBg from '../../assets/arena.png';
import StadiumBg from '../../assets/back.jpg';    // ← image de fond “stade” (peut être la tienne)
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
          onLogin?.();
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
        } else if (error.request) {
          setErrorMessage("Aucune réponse du serveur.");
        } else {
          setErrorMessage("Erreur inconnue : " + error.message);
        }
      });
  };

  const toggleShowPassword = () => setShowPassword((v) => !v);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="arena-login">
      {/* Fond stade + dégradé */}
      <div className="arena-bg" style={{ backgroundImage: `url(${StadiumBg})` }} />

      <div className={`arena-card ${isSignup || isForgotPassword ? "move-transition" : ""}`}>
        {/* Logo marque */}
        <img src={Logo} alt="Logo Arenalyx" className="arena-logo" />
        <h1 className="arena-brand">ARENALYX</h1>

        {isSignup ? (
          <Signup onLogin={onLogin} />
        ) : isForgotPassword ? (
          <ForgotPassword />
        ) : (
          <>
            <h2 className="arena-title">Se connecter</h2>

            <label className="arena-label" htmlFor="email">Adresse e-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              className="arena-input"
              autoComplete="email"
            />

            <label className="arena-label" htmlFor="password">Mot de passe</label>
            <div className="arena-password">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={onKeyDown}
                className="arena-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="arena-eye"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                onClick={toggleShowPassword}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            {errorMessage && <p className="arena-error">{errorMessage}</p>}

            <button className="arena-primary" onClick={handleLogin}>
              Se connecter
            </button>

            <div className="arena-divider"><span>ou</span></div>

            <button type="button" className="arena-sso">
              <span className="arena-sso-ic">🟢</span> Se connecter avec Google
            </button>
            <button type="button" className="arena-sso">
              <span className="arena-sso-ic">🧿</span> Se connecter avec Microsoft
            </button>

            <div className="arena-links">
              <a onClick={() => setIsForgotPassword(true)}>Mot de passe oublié ?</a>
              <a onClick={() => setIsSignup(true)}>Première connexion</a>
            </div>
          </>
        )}

        {(isSignup || isForgotPassword) && (
          <a className="arena-back" onClick={() => { setIsSignup(false); setIsForgotPassword(false); }}>
            Retour
          </a>
        )}
      </div>
    </div>
  );
}
