import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NombreCandidat.css';

function NombreCandidat() {
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/api/candidates/count')
      .then(response => {
        setTotalCandidates(response.data.count);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App container">
      <header className="App-header text-center my-2">
        <h2>Nombre Total de Candidats</h2>
        <p className="lead">Voici le nombre total de candidats inscrits :</p>
        <div className="total-candidates-box">
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p>Erreur : {error.message}</p>
          ) : (
            <p>{totalCandidates}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default NombreCandidat;
