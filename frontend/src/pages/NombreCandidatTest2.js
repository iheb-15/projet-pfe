import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CandidatTests2.css';

const NombreCandidatNonTest = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer le nombre de candidats n'ayant pas passé les tests
    const fetchCandidatesCount = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/candidates-without-test');
        setCount(response.data.count);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCandidatesCount();
  }, []);

  return (
    <div className="container3">
      <header className="header2 text-center my-4">
        <h2 className="title">Nombre de Candidats N'ayant Pas Passé les Tests</h2>
        <p className="subtitle">Voici le nombre de candidats n'ayant pas passé les tests :</p>
        <div className="candidates-box1">
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur: {error}</p>
          ) : (
            <p>{count}</p>
          )}
        </div>
      </header>
    </div>
  );
};

export default NombreCandidatNonTest;
