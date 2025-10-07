import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { connectUser } from "../../store/Store";

import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Logo from '../../assets/logo.png';
import StadiumBg from '../../assets/back.jpg';

/* 1) On RÉUTILISE le style de la Landing pour la barre */
import "../../styles/Landing.css";
/* 2) Et on garde ton CSS de Login pour la carte et le footer */
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
          setErrorMessage(error.response.status === 401
            ? "Email ou mot de passe invalide"
            : "Erreur : " + error.response.status);
        } else if (error.request) {
          setErrorMessage("Aucune réponse du serveur.");
        } else {
          setErrorMessage("Erreur inconnue : " + error.message);
        }
      });
  };

  const toggleShowPassword = () => setShowPassword(v => !v);
  const onKeyDown = (e) => { if (e.key === 'Enter') handleLogin(); };

  return (
    <>
      {/* ===== Header identique à la Landing (PLACÉ HORS de .arena-login) ===== */}
      <header className="alx-header">
        <a href="/landing" className="alx-brand" aria-label="Arenalyx – Accueil">
          <svg className="alx-logo" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M32 6l18 30H14L32 6z" />
            <path d="M22 40h20l-10 18-10-18z" />
          </svg>
          <span className="alx-brand-text">Arenalyx</span>
        </a>

        <nav className="alx-nav" aria-label="Navigation principale">
          {/* Bouton retour dans la barre */}
          <a href="/landing">Accueil</a>
          <a href="/landing#contact" className="alx-login" aria-current="page">Contact</a>
        </nav>
      </header>

      {/* ===== Page Login (formulaire centré) ===== */}
      <div className="arena-login">
        {/* Fond stade + glow */}
        <div className="arena-bg" style={{ backgroundImage: `url(${StadiumBg})` }} />

        <div className={`arena-card ${isSignup || isForgotPassword ? "move-transition" : ""}`}>
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
            <a
              className="arena-back"
              onClick={() => { setIsSignup(false); setIsForgotPassword(false); }}
            >
              Retour
            </a>
          )}
        </div>

        {/* Footer identique */}
        <footer className="arena-footer">
          <div className="arena-footer-inner">
            <div className="arena-footer-brand">
              <span className="arena-footer-logo" />
              <span>Arenalyx</span>
            </div>
            <nav className="arena-footer-nav" aria-label="Liens légaux">
              <a href="/legal/terms">Conditions</a>
              <a href="/legal/privacy">Confidentialité</a>
              <a href="/legal/security">Sécurité</a>
            </nav>
            <span className="arena-footnote">
              © {new Date().getFullYear()} Arenalyx. Tous droits réservés.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
