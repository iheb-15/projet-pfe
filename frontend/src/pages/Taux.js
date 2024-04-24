import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './Taux.css';

const Taux = ( ) => {
  const totalCandidates = 100;
  const successfulCandidates = 75;
  const totalAbandon = 100;
  const abandonedCandidates = 25; // Assume 25 candidates abandoned the test

  const data = [
    { name: 'Succès', value: successfulCandidates },
    { name: 'Échec', value: totalCandidates - successfulCandidates }
  ];

  const COLORS1 = ['#0088FE', '#FF8042', '#FFBB28'];
  const data1 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS2 = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const data2 = [{ name: 'Succès', value:totalAbandon },
                { name: 'Abandon', value:  totalAbandon-abandonedCandidates }
                
];
  
  const COLORS3 = ["#e4e8ef", "#475be8", '#FF5733']; // Choisir la couleur pour le taux d'abandon ici

  const renderTooltipContent = (value) => {
    return `${(value / totalCandidates) * 100} %`;
  };

  return (
    <div className="inline-elements">
      <div className="content-Success-cards">
        <h5 className="info-title">Taux de réussite</h5>
        <div className="success-card-chart">
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx={50}
              cy={45}
              innerRadius={20}
              fill="#e4e8ef"
              paddingAngle={0}
              dataKey="value"
              startAngle={-270}
              endAngle={150}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS1[index % COLORS1.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={renderTooltipContent} />
          </PieChart>
        </div>
      </div>
      <div className="content-Success-cards">
        <h5 className="info-title">Taux d'achèvement</h5>
        <div className="success-card-chart">
          <PieChart width={100} height={100}>
            <Pie
              data={data1}
              cx={50}
              cy={45}
              innerRadius={20}
              fill="#e4e8ef"
              paddingAngle={0}
              dataKey="value"
              startAngle={-270}
              endAngle={150}
              stroke="none"
            >
              {data1.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS2[index % COLORS2.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={renderTooltipContent} />
          </PieChart>
        </div>
      </div>
      <div className="content-Success-cards">
        <h5 className="info-title">Taux d'abandon</h5>
        <div className="success-card-chart">
          <PieChart width={100} height={100}>
            <Pie
              data={data2}
              cx={50}
              cy={45}
              innerRadius={20}
              fill="#e4e8ef"
              paddingAngle={0}
              dataKey="value"
              startAngle={-270}
              endAngle={150}
              stroke="none"
            

            >
              {data2.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS3[index % COLORS3.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={renderTooltipContent} />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Taux;
