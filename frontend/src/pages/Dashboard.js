import React from 'react';
import Taux from './Taux';
import Test from './TempsMoyen';
import TestCand from './TendanceScore';
import './Dashboard.css'; // Assurez-vous que ce fichier CSS est correctement configuré pour l'importation

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <Taux /> 
      <div className="inline-elements">
        <div className="dashboard-item">
          <Test />
        </div>
        <div className="dashboard-item">
          <TestCand />
        </div>
      </div>
      {/* Ajoutez d'autres composants de tableau de bord ici */}
    </div>
  );
}
export default Dashboard;
