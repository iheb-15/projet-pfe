import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TendanceScore.css'; // Ce fichier contiendra vos styles CSS personnalisés

function TestCand() {
  const [nombreCandidats, setNombreCandidats] = useState(0);

  // Fonction pour simuler le chargement du nombre de candidats depuis une source de données
  const fetchNombreCandidats = () => {
    // Simuler une requête réseau ou tout autre moyen de récupérer les données
    // Ici, nous utilisons setTimeout pour simuler un délai de chargement
    setTimeout(() => {
      // Supposons que vous avez récupéré le nombre de candidats de quelque part
      const nombreDeCandidatsRecupere = 10; // Par exemple
      setNombreCandidats(nombreDeCandidatsRecupere);
    }, 2000); // Délai de 2 secondes pour simuler le chargement
  };

  // Appeler la fonction fetchNombreCandidats lorsque le composant est monté
  useState(() => {
    fetchNombreCandidats();
  }, []);

  return (
    <div className="container">
      <h1>Liste des candidats</h1>
      <div className="nombre-candidats">
        <p>Nombre de candidats ayant passé le test : {nombreCandidats}</p>
      </div>
    </div>
  );
}

export default TestCand;
