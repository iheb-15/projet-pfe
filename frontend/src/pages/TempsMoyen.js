import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./TempsMoyen.css";

const data = [
  { name: 'Test 1', temps_moyen: 45 },
  { name: 'Test 2', temps_moyen: 50 },
  { name: 'Test 3', temps_moyen: 55 },
  { name: 'Test 4', temps_moyen: 60 },
  { name: 'Test 5', temps_moyen: 65 },
];

const TestCompletionTimeChart = () => {

  const formatTooltipValue = (value) => {
    return `${value} minutes`; // Ajout de "minutes" pour la clarification
  };

  const formatYAxisLabel = (value) => {
    return `${value} min`; // Ajout de "min" pour la clarification
  };

  const formatLegendValue = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="content-temps-moyen">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">Temps moyen de complétion </h5>
        <div className="chart-info-data">
          <p>Unité: minutes</p>
        </div>
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
              tickCount={6}
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
              dataKey="temps_moyen"
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

export default TestCompletionTimeChart;
