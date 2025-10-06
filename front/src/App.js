import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import Login from './components/authentification/Login';
import Home from './components/pages/Home';
import Landing from './components/Landing'; // <-- ajoute ta page landing

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Racine (aucun “slash” supplémentaire) -> redirection conditionnelle */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/landing" replace />
              )
            }
          />

          {/* Landing page publique */}
          <Route path="/landing" element={<Landing />} />

          {/* Accueil appli (protégé) */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Home onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Auth */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <Login onLogin={handleLoginSuccess} />
              )
            }
          />

          {/* Fallback 404 -> landing */}
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
}
