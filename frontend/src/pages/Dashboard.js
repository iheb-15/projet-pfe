import React from 'react';
import Taux from './Taux';
import TempsMoyen from "./TempsMoyen";
import './Dashboard.css'; // Assurez-vous que ce fichier CSS est correctement configuré pour l'importation
import TendanceScore from "./TendanceScore";
import RepartitionScore from './RepartitionScore';

import UserData from './UserData';
import Statistique from './Statistiques';


function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
          <Taux/> 
          <div className="inline-elements">
          <TempsMoyen/>
          <UserData/>
          </div>
          <div className="inline-elements">
            <RepartitionScore />
            <TendanceScore />
          </div>
      
        <div className="App">
      
      
        <Statistique />
      
    </div>
        {/* Ajoutez d'autres composants de tableau de bord ici */}
      </div>
  );
}
export default Dashboard;
