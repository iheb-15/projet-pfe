import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import './RepartitionScore.css';

const data = [
  { name: 'Candidat 1', score: 85 },
  { name: 'Candidat 2', score: 70 },
  { name: 'Candidat 3', score: 92 },
  { name: 'Candidat 4', score: 65 },
  { name: 'Candidat 5', score: 78 },
];

const RepartitionScore = () => {
  const formatTooltipValue = (value) => {
    return `${value} points`; // Modifier l'unité de temps en "points" pour les scores
  };

  const formatYAxisLabel = (value) => {
    return `${value}`; // Pas besoin d'ajouter "min" pour les scores
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="content-repartition-score">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Répartition Score</h5>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickSize={0}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="score"
              fill="#475be8"
              barSize={30}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RepartitionScore;
