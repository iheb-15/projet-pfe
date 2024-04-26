// Statistiques.js

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Statistiques.css'; // Importez le fichier CSS spécifique

const data = [
  { name: 'Jan', accès_non_autorisé: 10, Violations_sécurité: 5, Mesures_sécurité: 20 },
  { name: 'Feb', accès_non_autorisé: 12, Violations_sécurité: 8, Mesures_sécurité: 25 },
  { name: 'Mar', accès_non_autorisé: 8, Violations_sécurité: 3,  Mesures_sécurité: 22 },
  { name: 'Apr', accès_non_autorisé: 15, Violations_sécurité: 6, Mesures_sécurité: 28 },
  { name: 'May', accès_non_autorisé: 11, Violations_sécurité: 4, Mesures_sécurité: 24 },
  { name: 'Jun', accès_non_autorisé: 9, Violations_sécurité: 7,  Mesures_sécurité: 26 },
  { name: 'Jul', accès_non_autorisé: 14, Violations_sécurité: 5, Mesures_sécurité: 21 },
  { name: 'Aug', accès_non_autorisé: 13, Violations_sécurité: 9, Mesures_sécurité: 27 },
  { name: 'Sep', accès_non_autorisé: 16, Violations_sécurité: 3, Mesures_sécurité: 23 },
  { name: 'Oct', accès_non_autorisé: 18, Violations_sécurité: 7, Mesures_sécurité: 29 },
  { name: 'Nov', accès_non_autorisé: 10, Violations_sécurité: 4, Mesures_sécurité: 25 },
  { name: 'Dec', accès_non_autorisé: 12, Violations_sécurité: 6, Mesures_sécurité: 26 }
];

const Statistique = () => {
  return (
    <div className="BarChart-container">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Security Statistics</h5>
      </div>
      <div className="recharts-wrapper">
        <BarChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis />
          <Tooltip/>
          <Legend />
          <Bar dataKey="accès_non_autorisé" stackId="a" fill="#8884d8" />
          <Bar dataKey="Violations_sécurité" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Mesures_sécurité" stackId="a" fill="#ffc658" />
        </BarChart>
      </div>
    </div>
  );
};

export default Statistique;
