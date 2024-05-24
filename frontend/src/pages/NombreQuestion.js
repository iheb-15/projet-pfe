import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NombreCandidat.css'; // Assurez-vous que ce fichier CSS est correctement configuré pour l'importation

function NombreQuestion() {
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Effectuer une requête GET pour récupérer le nombre total de questions
    axios.get('http://localhost:3002/api/question2/count')
      .then(response => {
        setQuestionCount(response.data.count);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="App container">Chargement...</div>;
  }

  if (error) {
    return <div className="App container">Erreur : {error.message}</div>;
  }

  return (
    <div className="App container">
      <header className="App-header text-center my-2">
        <h2>Nombre Total de Questions</h2>
        <p className="lead">Voici le nombre total de questions disponibles :</p>
        <div className="total-candidates-box">
          <h3>{questionCount}</h3>
        </div>
      </header>
    </div>
  );
}

export default NombreQuestion;
