import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CandidatTest.css';

const NombreCandidatTest = () => {
  const [nombreCandidats, setNombreCandidats] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer le nombre de candidats ayant passé les tests
    const fetchNombreCandidats = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/candidates/with-score');
        setNombreCandidats(response.data.count);
      } catch (error) {
        setError('Erreur lors de la récupération des données');
      } finally {
        setLoading(false);
      }
    };

    fetchNombreCandidats();
  }, []);

  return (
    <div className="container2">
      <header className="header2 text-center my-4">
        <h2 className="title">Nombre de Candidats Ayant Passé les Tests</h2>
        <p className="subtitle">Voici le nombre de candidats ayant passé les tests :</p>
        <div className="candidates-box">
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>{nombreCandidats}</p>
          )}
        </div>
      </header>
    </div>
  );
};

export default NombreCandidatTest;
