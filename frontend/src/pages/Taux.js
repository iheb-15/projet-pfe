import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Taux.css'; // fichier de style CSS pour personnalisation supplémentaire

class Taux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCandidates: 0,
      totalTests: 0,
      totalQuestions: 0
    };
  }

  componentDidMount() {
    // Simuler la récupération des données depuis une API
    // Ici, les données sont simulées statiquement, mais dans une application réelle, elles proviendraient d'une API
    this.setState({
      totalCandidates: 50, // Exemple de nombre de candidats
      totalTests: 25, // Exemple de nombre de tests
      totalQuestions: 150 // Exemple de nombre de questions
    });
  }

  render() {
    return (
      <Container className="containerTaux">
        <div className="card-smoke">
          <div className="smoke-border">
            <h2 className='info-title'>Total Candidats</h2>
            <p>{this.state.totalCandidates}</p>
          </div>
        </div>
        <div className="card-smoke">
          <div className="smoke-border">
            <h2 className='info-title'>Total Tests</h2>
            <p>{this.state.totalTests}</p>
          </div>
        </div>
        <div className="card-smoke">
          <div className="smoke-border">
            <h2 className='info-title'>Total Questions</h2>
            <p>{this.state.totalQuestions}</p>
          </div>
        </div>
      </Container>
    );
  }
}

export default Taux;
