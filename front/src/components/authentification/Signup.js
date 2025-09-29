import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { connectUser } from "../../store/Store";

export default function Signup({ onLogin }) {

    axios.defaults.baseURL = process.env.REACT_APP_API_API;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = () => {
        console.log("Sending request to:", axios.defaults.baseURL + "/api/v1/user/login");
        console.log("Signing up with", { email, password, confirmPassword });
        console.log("Data sent:", { identifier, email, lastName, firstName, password });

        axios.post("/api/v1/user/signup", { identifier, email, lastName, firstName, password })
            .then((response) => {
                const user = response.data;
                if (user.message === "Registration failed") {
                    console.log("Registration failed");
                } else if (user.message === "Registration success") {
                    dispatch(connectUser({
                        id: user.id,
                        firstName: user.firstName,
                        darkMode: user.darkMode,
                        applications: user.applications
                    }));
                    onLogin?.(); //appel sécurisé
                    navigate("/home");
                    setErrorMessage(null);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Erreur backend:", error.response.status, error.response.data);
                } else {
                    console.error("Erreur inconnue:", error.message);
                }
                setErrorMessage("Une erreur est survenue lors de l'inscription.");
            });
    };

    return (
        <div className="signup-box">
            <h2>Créer un compte</h2>
            <input
                type="text"
                placeholder="Identifiant"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirmez le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleSignup}>S'inscrire</button>
        </div>
    );
}
