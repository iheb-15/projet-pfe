import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NombreCandidat.css';

function NombreCompany2() {
  const [company2Count, setCompany2Count] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Effectuer une requête GET pour obtenir le nombre total d'entreprises
    axios.get('http://localhost:3002/api/company2/count')
      .then(response => {
        setCompany2Count(response.data.count);
        setLoading(false);
      })
      .catch(error => {
        setError('Une erreur est survenue lors de la récupération des données.');
        setLoading(false);
      });
  }, []);
  return (
    <div className="App container">
      <header className="App-header text-center my-2">
        <h2>Nombre Total d'Entreprises</h2>
        <p className="lead">Voici le nombre total d'entreprises inscrites :</p>
        <div className="total-candidates-box">
          {loading && <p>Chargement...</p>}
          {error && <p>{error}</p>}
          {company2Count !== null && <h3>{company2Count }</h3>}
        </div>
      </header>
    </div>
  );
}

export default NombreCompany2;
