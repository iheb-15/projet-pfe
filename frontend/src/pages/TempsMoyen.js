// Test.js

import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Test.css'; // Fichier CSS modifié
import Chart from 'chart.js/auto';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Test = () => {
  const [numberOfCandidates, setNumberOfCandidates] = useState(0);
  const chartRef = useRef(null);

  // Fonction pour gérer le changement de valeur dans l'input
  const handleInputChange = (e) => {
    setNumberOfCandidates(e.target.value);
  };

  useEffect(() => {
    // Détruit le graphique existant avant d'en créer un nouveau
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    // Crée un nouveau graphique avec les données mises à jour
    const ctx = document.getElementById('myChart');
    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Number of Candidates',
          data: [12, 19, 3, 5, numberOfCandidates],
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    chartRef.current = newChart;

    // Nettoie le graphique lorsqu'il est supprimé du DOM
    return () => {
      newChart.destroy();
    };
  }, [numberOfCandidates]);

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6} className="offset-md-3"> {/* Déplacement vers la droite avec offset */}
          <div className="test-container">
            <h2 className="test-title">Test des candidats</h2>
            <Form.Group>
              <Form.Label htmlFor="numberOfCandidates">Nombre de candidats ayant passé le test :</Form.Label>
              <Form.Control
                type="number"
                id="numberOfCandidates"
                value={numberOfCandidates}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="result">
              <canvas id="myChart"></canvas>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Test;
