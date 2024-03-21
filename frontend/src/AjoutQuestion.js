import React, { useState } from 'react'; // Import de React et du hook useState
import 'bootstrap/dist/css/bootstrap.min.css'; // Import des styles Bootstrap
import { FaPlus } from 'react-icons/fa'; // Import de l'icône Plus depuis react-icons
import './AjoutQuestion.css'; // Import des styles spécifiques à ce composant
import { CloseSquareOutlined } from '@ant-design/icons'; // Import de l'icône CloseSquareOutlined depuis ant-design/icons
import Ajout2 from './Ajout2'; // Import du composant Ajout2 depuis un fichier local
import { Link } from 'react-router-dom'; // Import de Link depuis react-router-dom pour la navigation

function AjoutQuestion() {
  // Définition des états initiaux à l'aide du hook useState
  const [selectedLangue, setSelectedLangue] = useState('');
  const [selectedDomaine, setSelectedDomaine] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [question, setQuestion] = useState('');
  const [reponses, setReponses] = useState(['']); // Initialisation avec un tableau contenant une réponse vide
  const [showSecondForm, setShowSecondForm] = useState(false); // Initialisation de l'état pour afficher le deuxième formulaire

  // Gestionnaires d'événements pour mettre à jour les états en fonction des changements dans les formulaires
  const handleLangueChange = (e) => {
    setSelectedLangue(e.target.value);
  };

  const handleDomaineChange = (e) => {
    setSelectedDomaine(e.target.value);
  };

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Gestionnaire d'événement pour la modification d'une réponse spécifique dans le tableau
  const handleReponseChange = (index, e) => {
    const newReponses = [...reponses];
    newReponses[index] = e.target.value;
    setReponses(newReponses);
  };

  // Fonction pour ajouter une nouvelle réponse au tableau
  const ajouterReponse = () => {
    setReponses([...reponses, '']);
  };

  // Fonction pour supprimer une réponse spécifique du tableau
  const supprimerReponse = (index) => {
    const newReponses = [...reponses];
    newReponses.splice(index, 1);
    setReponses(newReponses);
  };

  // Gestionnaire d'événement pour passer au deuxième formulaire
  const handleSuivantClick = () => {
    setShowSecondForm(true);
  };

  return (
    <div className="container">
      {showSecondForm ? (
        <Ajout2 /> // Affichage du deuxième formulaire si showSecondForm est vrai
      ) : (
        <div>
          <div className="text-center">
            <h2 style={{ color: '#3987ee' }}>Ajouter Question</h2> {/* Titre du formulaire */}
          </div>
          <h4 style={{ fontSize: '14px' }}>Paramètre Question*</h4> {/* Sous-titre du formulaire */}
          <div className="border p-3 mb-4 form-container"> {/* Conteneur du formulaire */}
            {/* Sélection de langue, domaine et skills */}
            <div className="form-group">
              <label htmlFor="langue">Langue
              <b style={{ color: 'red' }}>* </b>
              </label>
              <select
                className="form-control"
                id="langue"
                value={selectedLangue}
                onChange={handleLangueChange}
              >
                <option value="">Choisissez une langue</option>
                <option value="francais">Français</option>
                <option value="anglais">Anglais</option>
                <option value="arabe">Arabe</option>
              </select>
            </div>
            {/* Sélection du domaine */}
            <div className="form-group">
              <label htmlFor="domaine">Domaine
              <b style={{ color: 'red' }}>* </b>
              </label>
              <select
                className="form-control"
                id="domaine"
                value={selectedDomaine}
                onChange={handleDomaineChange}
              >
                <option value="">Choisissez un domaine</option>
                <option value="programmation">Programmation</option>
                <option value="Design et créativité">Design et créativité</option>
                <option value="gestion_de_projet">Gestion de projet</option>
                <option value="IT">IT</option>
                <option value="Santé"> Santé</option>
                <option value="Finance"> Finance</option>
                <option value="Éducation">Éducation</option>
                <option value="Commerce électronique"> Commerce électronique</option>
                <option value="Divertissement et médias"> Divertissement et médias</option>
                <option value="Mobilité et transport "> Mobilité et transport</option>
                <option value="Science des données et analytique">Science des données et analytique</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Tourisme et voyage">Tourisme et voyage</option>
                <option value="Gestion des ressources humaines">Gestion des ressources humaines</option>
               
              </select>
            </div>
            {/* Sélection des skills */}
            <div className="form-group">
              <label htmlFor="skills">Skills
              <b style={{ color: 'red' }}>* </b>
              </label>
              <select
                className="form-control"
                id="skills"
                value={selectedSkill}
                onChange={handleSkillChange}
              >
                <option value="">Choisissez un Skill</option>
                <option value="communication">Communication</option>
                        <option value="analyse">Analyse</option>
                        <option value="cybersécurité"> cybersécurité</option>
                        <option value="intelligence artificielle">intelligence artificielle</option>
                        <option value="services de cloud computing">services de cloud computing</option>
                        <option value="technologies médicales">technologies médicales</option>
                        <option value="services bancaires en ligne">services bancaires en ligne</option>
                        <option value="paiements numériques">paiements numériques</option>
                        <option value="solutions d'e-learning">solutions d'e-learning</option>
                        <option value="marché en ligne">marché en ligne</option>
                        <option value="marketing numérique">marketing numérique</option>
                        <option value="solutions de recrutement en ligne">solutions de recrutement en ligne</option>
                        <option value="solutions de cybersécurité">solutions de cybersécurité</option>
                        <option value="design industriel">design industriel</option>
                        <option value="architecture">architecture</option>
                        <option value="intelligence d'affaires">intelligence d'affaires</option>
                        <option value="analyse de Big Data">analyse de Big Data</option>
                        <option value="solutions de gestion de données">solutions de gestion de données</option>
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="C">C</option>
                        <option value="C++">C++</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="PHP">PHP</option>

              </select>
            </div>
            {/* Champ de texte pour la question */}
            <div className="form-group">
              <label htmlFor="question">Question
              <b style={{ color: 'red' }}>* </b>
              </label>
              <textarea
                className="form-control"
                id="question"
                value={question}
                onChange={handleQuestionChange}
              ></textarea>
            </div>

            {/* Boucle pour afficher les champs de réponse */}
            {reponses.map((reponse, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`reponse${index + 1}`}>Réponse {index + 1}
                <b style={{ color: 'red' }}>* </b>
                </label>
                <div className="input-group">
                  <textarea
                    className="form-control"
                    id={`reponse${index + 1}`}
                    value={reponse}
                    onChange={(e) => handleReponseChange(index, e)}
                  ></textarea>
                  {/* Icône pour supprimer la réponse */}
                  <CloseSquareOutlined onClick={() => supprimerReponse(index)} />
                </div>
              </div>
            ))}

            {/* Bouton pour ajouter une réponse */}
            <button onClick={ajouterReponse} className="">
              <FaPlus /> Ajouter
            </button>
          </div>
          {/* Bouton "Suivant" pour passer au deuxième formulaire */}
          <button className="next-button">
            <Link to="/ajout2" onClick={handleSuivantClick} style={{ color: 'black' }}>Suivant</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default AjoutQuestion;
