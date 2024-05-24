import React from 'react';
import './Dashboard.css'; // Assurez-vous que ce fichier CSS est correctement configuré pour l'importation
import TotalCandidates from './NombreCandidat';
import NombreTest from './NombreTest';
import NombreCompany from './NombreCompany';
import NombreQuestion from './NombreQuestion';
import NombreCandidatTest from './NombreCandidatTest';
import NombreCandidatNonTest from './NombreCandidatTest2';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="inline-elements">
        <TotalCandidates />
        <NombreTest />
        
      </div>
      <div className="inline-elements">
      <NombreCompany />
      <NombreQuestion></NombreQuestion>
      </div>
    
      <div className="inline-elements">

      <NombreCandidatTest/>
      <NombreCandidatNonTest/>
      </div>
      <div className="inline-elements">
      
      </div>
      {/* Ajoutez d'autres composants de tableau de bord ici */}
    </div>
  );
}

export default Dashboard;
