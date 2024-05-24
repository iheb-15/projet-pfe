import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Test.css'; // Fichier CSS modifié
import Chart from 'chart.js/auto';
import { Container, Row, Col, Form } from 'react-bootstrap';

const TestCand = () => {
  const [numberOfNonCandidates, setNumberOfNonCandidates] = useState(0);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Fonction pour gérer le changement de valeur dans l'input
  const handleInputChange = (e) => {
    setNumberOfNonCandidates(e.target.value);
  };

  useEffect(() => {
    // Détruit le graphique existant avant d'en créer un nouveau
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Crée un nouveau graphique avec les données mises à jour
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Number of Non-Candidates',
          data: [2, 3, 20, 5, numberOfNonCandidates],
          fill: false,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
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

    // Nettoie le graphique lorsqu'il est supprimé du DOM
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [numberOfNonCandidates]);

  return (
    <Container>
      <Row className="row">
        <Col md={6} className="offset-md-3"> {/* Déplacement vers la droite avec offset */}
          <div className="test-container">
            <h2 className="test-title">Test des non-candidats</h2>
            <Form.Group>
              <Form.Label htmlFor="numberOfNonCandidates">Nombre de candidats n'ayant pas passé le test :</Form.Label>
              <Form.Control
                type="number"
                id="numberOfNonCandidates"
                value={numberOfNonCandidates}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="result">
              <canvas ref={canvasRef} id="myChart"></canvas>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TestCand;
