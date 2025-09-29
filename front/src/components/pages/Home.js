import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import Cv from './Cv';
import "../../styles/pages/Home.css";
import "../../styles/pages/HomeDark.css";
import Logo from "../../assets/logo.png";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CVModal = ({ onClose, cvContent }) => {
  return (
    <div className="cv-modal">
      <div className="cv-modal-content">
        <Cv cvData={cvContent} onClose={onClose} />
      </div>
    </div>
  );
};

export default function Home({ onLogout }) {
  axios.defaults.baseURL = process.env.REACT_APP_API_API;

  const userData = useSelector((state) => state.user);
  const userId = userData.id;

  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleFiltre = () => {
    console.log(`filtre`);
  };

  const handleCv = (cvContent) => {
    setSelectedCV(cvContent);
    setIsCVModalOpen(true);
  };

  const closeCVModal = () => {
    setIsCVModalOpen(false);
    setSelectedCV(null);
  };

  const data = {
    labels: ["Janvier", "Février", "Mars", "Avril", "Mai"],
    datasets: [
      {
        label: "Consultations par mois",
        data: [5, 8, 12, 6, 10],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="header-box">
        <div className="header-title">
          <img src={Logo} alt="Logo" className="header-logo" />
          <h1>Bienvenue sur DoctoMaroc, {userData.firstName} !</h1>
        </div>
        <div className="header-buttons">
          <button className="icon-button" onClick={onLogout} title="Déconnexion">
            <FiLogOut size={20} />
          </button>
          <button className="icon-button" title="Mode sombre">
            🌙
          </button>
          <button className="icon-button" title="Paramètres">
            <FiSettings size={20} />
          </button>
          <button className="icon-button" title="Profil">
            <FaUserCircle size={20} />
          </button>
        </div>
      </div>

      <div className="new-application-box"></div>
      <div className="searching-box">
        <input
          className="input-searching"
          placeholder="Rechercher un dossier"
        />
        <div
          className="applications-filtre"
          onClick={handleFiltre}
          title="Filtre"
        >
          <p>Filtrer</p>
        </div>
      </div>

      <div className="boxes">
        <div className="left-box">
          <ul className="application-section">
            {Array.isArray(userData.applications) && userData.applications.length > 0 ? (
              userData.applications.map((app, index) => (
                <li key={index} className="application-content">
                  <div className="application">
                    <div className="application-primitifs">
                      <div
                        className="application-name"
                        onClick={() => handleCv(app.name)}
                      ></div>

                      <div
                        className="application-status"
                        style={{
                          backgroundColor:
                            app.status === "Done"
                              ? "#6a994e"
                              : app.status === "Cancelled"
                              ? "#f94144"
                              : app.status === "Planned"
                              ? "#f4a261"
                              : "gray",
                        }}
                      >
                        {app.status}
                      </div>
                    </div>

                    <div
                      className="application-details"
                      onClick={() => handleCv(app.name)}
                    >
                      Détails
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>Aucun dossier enregistré</li>
            )}
          </ul>
        </div>

        <div className="applications">
          <ul className="application-section">
            <li>Aucun dossier enregistrée</li>
          </ul>
        </div>

        <div className="right-box">
          <div className="statistic-box">
            <Bar data={data} options={options} />
          </div>
          <div className="calendar-box">
            <div className="calendar">
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </div>
          </div>
        </div>
      </div>

      {isCVModalOpen && <CVModal onClose={closeCVModal} cvContent={selectedCV} />}
    </>
  );
}
