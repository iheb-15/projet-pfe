import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NombreCandidat.css';

function NombreTest() {
  const [testCount, setTestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer le nombre de tests
    const fetchTestCount = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/tests/count');
        setTestCount(response.data.count);
      } catch (error) {
        setError('Erreur lors de la récupération du nombre de tests');
      } finally {
        setLoading(false);
      }
    };

    fetchTestCount();
  }, []);

  return (
    <div className="App container">
      <header className="App-header text-center my-2">
        <h2>Nombre Total de Tests</h2>
        <p className="lead">Voici le nombre total de tests effectués :</p>
        <div className="total-candidates-box">
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <h2>{testCount}</h2>
          )}
        </div>
      </header>
    </div>
  );
}

export default NombreTest;
