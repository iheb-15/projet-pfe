import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import de Bootstrap CSS
import { FaPlus } from 'react-icons/fa'; // Import des icônes Plus et X
import './AjoutQuestion.css';
import { CloseSquareOutlined } from '@ant-design/icons';

function AjoutQuestion() {
  const [selectedLangue, setSelectedLangue] = useState('');
  const [selectedDomaine, setSelectedDomaine] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [question, setQuestion] = useState('');
  const [reponses, setReponses] = useState(['']); // Array pour stocker les réponses

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

  const handleReponseChange = (index, e) => {
    const newReponses = [...reponses];
    newReponses[index] = e.target.value;
    setReponses(newReponses);
  };

  const ajouterReponse = () => {
    setReponses([...reponses, '']);
  };

  const supprimerReponse = (index) => {
    const newReponses = [...reponses];
    newReponses.splice(index, 1);
    setReponses(newReponses);
  };

  return (
    <div className="container">
      <div className="text-center"> 
        <h2 style={{ color: '#3987ee' }}>Ajouter Question</h2>
      </div>
      <h4 style={{ fontSize: "14px" }}>Paramètre Question*</h4>
      <div className="border p-3 mb-4"> {/* Cadre contenant la sélection de langue, domaine et skills */}
        <div className="form-group">
          <label htmlFor="langue">Langue* :</label>
          <select className="form-control" id="langue" value={selectedLangue} onChange={handleLangueChange}>
            <option value="">Choisissez une langue</option>
            <option value="francais">Français</option>
            <option value="anglais">Anglais</option>
            <option value="arabe">Arabe</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="domaine">Domaine* :</label>
          <select className="form-control" id="domaine" value={selectedDomaine} onChange={handleDomaineChange}>
            <option value="">Choisissez un domaine</option>
            <option value="programmation">Programmation</option>
            <option value="design">Design</option>
            <option value="gestion_de_projet">Gestion de projet</option>
           
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills* :</label>
          <select className="form-control" id="skills" value={selectedSkill} onChange={handleSkillChange}>
            <option value="">Choisissez un skill</option>
            <option value="communication">Communication</option>
            <option value="analyse">Analyse</option>
            <option value="resolution_probleme">Résolution de problèmes</option>
           
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="question">Question* :</label>
          <textarea className="form-control" id="question" value={question} onChange={handleQuestionChange}></textarea>
        </div>
        
       
        {reponses.map((reponse, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`reponse${index + 1}`} >Réponse {index + 1}* :</label>
            <div className="input-group" >
              <textarea className="form-control"  id={`reponse${index + 1}`} value={reponse} onChange={(e) => handleReponseChange(index, e)}></textarea>
              <CloseSquareOutlined  onClick={() => supprimerReponse(index)} />
            </div>
          </div>
        ))}
        
        {/* Bouton pour ajouter une réponse */}
        <button onClick={ajouterReponse}>
          <FaPlus /> Ajouter
        </button>
      </div>
    </div>
  );
}

export default AjoutQuestion;
