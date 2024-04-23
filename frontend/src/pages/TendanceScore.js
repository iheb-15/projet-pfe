// TendanceScore.js
import React from "react";
import "./TendanceScore.css";

const data = [
  {
    id: 1,
    name: "Hadir",
    percentValues: 70,
  },
  {
    id: 2,
    name: "Iheb",
    percentValues: 40,
  },
  {
    id: 3,
    name: "Aicha",
    percentValues: 60,
  },
  {
    id: 4,
    name: "Syryne",
    percentValues: 80,
  },
  {
    id: 5,
    name: "Others",
    percentValues: 20,
  },
];

const TendanceScore = () => {
  const totalPercentage = data.reduce((acc, item) => acc + item.percentValues, 0);

  return (
    <div className="tendance-score-container">
      <h2 className="tendance-score-title">Tendance de Score</h2>
      <div className="tendance-score-bars">
        {data.map((progressbar) => {
          const widthPercentage = (progressbar.percentValues / totalPercentage) * 100;

          return (
            <div className="tendance-score-bar" key={progressbar.id}>
              <div className="tendance-score-label">{progressbar.name}</div>
              <div className="tendance-score-progress">
                <div
                  className="tendance-score-progress-inner"
                  style={{
                    width: `${widthPercentage}%`,
                  }}
                ></div>
              </div>
              <div className="tendance-score-value">{progressbar.percentValues}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TendanceScore;
