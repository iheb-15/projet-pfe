import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./UserData.css";

const data = [
  { name: 'Inscrits', actifs: 400, inactifs: 200 },
  { name: 'Actifs', actifs: 300, inactifs: 100 },
  { name: 'Inactifs', actifs: 100, inactifs: 100 },
];

const UserData = () => {
  return (
    <div className="user-data-container">
      <h2 className="chart-title">Utilisateurs</h2>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="actifs" fill="#8884d8" />
            <Bar dataKey="inactifs" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserData;
