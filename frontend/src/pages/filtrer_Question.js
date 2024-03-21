import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox, Radio } from 'antd';
import { FaPlus } from 'react-icons/fa';
import {  useHistory } from 'react-router-dom';
function Filtrer() {
  const [selectedCompetences, setSelectedCompetences] = useState([]);
  const [selectedDomaines, setSelectedDomaines] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedClasser, setSelectedClasser] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [newCompetence, setNewCompetence] = useState('');
  const [newDomaine, setNewDomaine] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [competencesOptions, setCompetencesOptions] = useState([
    { label: 'Programmation', value: 'programmation' },
    { label: 'Design graphique', value: 'design_graphique' },
    { label: 'Marketing digital', value: 'marketing_digital' },
  ]);

  const [domainesOptions, setDomainesOptions] = useState([
    { label: 'Informatique', value: 'informatique' },
    { label: 'Arts et design', value: 'arts_design' },
    { label: 'Marketing', value: 'marketing' },
  ]);

  const [skillsOptions, setSkillsOptions] = useState([
    { label: 'Communication', value: 'communication' },
    { label: 'Analyse de données', value: 'analyse_donnees' },
    { label: 'Gestion de projet', value: 'gestion_projet' },
  ]);

  const handleCompetencesChange = checkedValues => {
    setSelectedCompetences(checkedValues);
  };

  const addCompetence = () => {
    if (!newCompetence) return;
    const newOption = { label: newCompetence, value: newCompetence.toLowerCase().replace(/\s+/g, '_') };
    setCompetencesOptions(prev => [...prev, newOption]);
    setNewCompetence('');
  };

  const addDomaine = () => {
    if (!newDomaine) return;
    const newOption = { label: newDomaine, value: newDomaine.toLowerCase().replace(/\s+/g, '_') };
    setDomainesOptions(prev => [...prev, newOption]);
    setNewDomaine('');
  };

  const addSkill = () => {
    if (!newSkill) return;
    const newOption = { label: newSkill, value: newSkill.toLowerCase().replace(/\s+/g, '_') };//pour trouver toutes les occurrences d'un ou plusieurs caractères d'espacement (\s) dans la chaîne de manière globale (g) et les remplace par des traits de soulignement (_).
    setSkillsOptions(prev => [...prev, newOption]);
    setNewSkill('');
  };
  const handleAfficherResultats = () => {
    console.log("Afficher les résultats");
    
  };
  const handleAnnuler = () => {
   
    setSelectedCompetences([]);
    setSelectedDomaines([]);
    setSelectedSkills([]);
    setSelectedType('');
    setSelectedClasser('');
    setSelectedNiveau('');
    setNewCompetence('');
    setNewDomaine('');
    setNewSkill('');
   
  };
  const history = useHistory(); // Obtenir l'objet history

  const handleRetourListe = () => {
    history.push('/liste_question'); // Naviguer vers la route de la liste des questions
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2 style={{ color: '#3987ee' }}>Filtrer Question</h2>
      </div>
      <div className="border p-3 mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <div className="form-group">
            <label>Classer par* :</label>
            <div>
              <Radio.Group onChange={e => setSelectedClasser(e.target.value)} value={selectedClasser}>
                <Radio value="recents">Les plus récents</Radio>
                <Radio value="pertinents">Les plus pertinents</Radio>
              </Radio.Group>
            </div>
          </div>
              {/* Type et Classement */}
              <div className="form-group">
                
                <label>Type* :</label>
                <div>
                  <Radio.Group onChange={e => setSelectedType(e.target.value)} value={selectedType}>
                    <Radio value="seul">Seule réponse</Radio>
                    <Radio value="multiple">Multiple réponses</Radio>
                  </Radio.Group>
                </div>
              </div>
        {/* Niveau */}
        <div className="form-group" style={{width:'40%'}}>
          <label htmlFor="niveau">Niveau* :</label>
          <select className="form-control" id="niveau" value={selectedNiveau} onChange={e => setSelectedNiveau(e.target.value)}>
            <option value="">Choisissez niveau</option>
            <option value="debutant">Débutant</option>
            <option value="intermediaire">Intermédiaire</option>
            <option value="avance">Avancé</option>
          </select>
        </div>
        {/* Compétences */}
        <div className="form-group">
          <label>Compétence* :</label>
          <Checkbox.Group options={competencesOptions} value={selectedCompetences} onChange={handleCompetencesChange} />
          <div className="input-group mt-3" style={{width:'40%'}}>
            <input
              type="text"
              className="form-control"
              placeholder="Ajouter une nouvelle compétence"
              value={newCompetence}
              onChange={e => setNewCompetence(e.target.value)}
            />
            <div className="input-group-append">
              <button  type="button" onClick={addCompetence} style={{marginLeft: '30px'}}>
                <FaPlus /> Ajouter
              </button>
            </div>
          </div>
        </div>
        {/* Domaines */}
        <div className="form-group">
          <label>Domaine* :</label>
          <Checkbox.Group options={domainesOptions} value={selectedDomaines} onChange={setSelectedDomaines} />
          <div className="input-group mt-3" style={{width:'40%'}}>
            <input
              type="text"
              className="form-control"
              placeholder="Ajouter un nouveau domaine"
              value={newDomaine}
              onChange={e => setNewDomaine(e.target.value)}
            />
            <div className="input-group-append">
              <button  type="button" onClick={addDomaine}style={{marginLeft: '30px'}}>
                <FaPlus /> Ajouter
              </button>
            </div>
          </div>
        </div>
        {/* Skills */}
        <div className="form-group">
          <label>Skills* :</label>
          <Checkbox.Group options={skillsOptions} value={selectedSkills} onChange={setSelectedSkills} />
          <div className="input-group mt-3" style={{width:'40%'}}>
            <input
              type="text"
              className="form-control"
              placeholder="Ajouter un nouveau skill"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
            />
            <div className="input-group-append">
              <button  type="button" onClick={addSkill}style={{marginLeft: '30px'}}>
                <FaPlus /> Ajouter
              </button>
            </div>
          </div>
        </div>
      
        
      </div>
      <div className="container">
          <div className="text-center mt-4">
            <button onClick={handleAfficherResultats} style={{marginLeft: '30px'}}>Afficher Résultats</button>
            <button  onClick={handleAnnuler} style={{marginLeft: '30px'}}>Annuler</button>
          </div>
          <div className="text-center mt-4">
          {/* Bouton pour retourner à la liste des questions */}
          <button onClick={handleRetourListe} style={{ marginRight: '875px' }}>Précedent</button>
        </div>
        
      </div>
    </div>
  );
}

export default Filtrer;
