import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Radio, Modal, Form, Input, Select, Button } from 'antd';
import { CloseSquareOutlined, EditOutlined } from '@ant-design/icons';
import { FaPlus, FaTrash } from 'react-icons/fa'; 
import '../AjoutQuestion.css';
import Filtrer from './filtrer_Question';
import Link from 'antd/lib/typography/Link';
import {  useHistory } from 'react-router-dom';

const { TextArea } = Input;


function Modifier() {
  const [questions, setQuestions] = useState([
    { id: 1, domaine: '', niveau: '', type: '', question: '', reponses: [{ id: 1, value: '' }] }
  ]);
  const [selectedDomaine, setSelectedDomaine] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [questionId, setQuestionId] = useState(1);
  const [reponseId, setReponseId] = useState(1);
  const [editQuestionModalVisible, setEditQuestionModalVisible] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [editReponseModalVisible, setEditReponseModalVisible] = useState(false);
  const [editReponseData, setEditReponseData] = useState({ questionId: null, reponseId: null });
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [filtreVisible, setFiltreVisible] = useState(false); 
  const [modalFiltrerVisible, setModalFiltrerVisible] = useState(false);
  const openModalFiltrer = () => {
    setModalFiltrerVisible(true);
  };
  const closeModalFiltrer = () => {
    setModalFiltrerVisible(false);
  };
  const handleNiveauChange = (questionId, e) => {
    const selectedNiveau = e.target.value;
    const updatedQuestions = questions.map(question =>
      question.id === questionId ? { ...question, niveau: selectedNiveau } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = e => {
    setSelectedType(e.target.value);
  };

  const handleDomaineChange = (questionId, e) => {
    const selectedDomaine = e.target.value;
    const updatedQuestions = questions.map(question =>
      question.id === questionId ? { ...question, domaine: selectedDomaine } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (id, e) => {
    const updatedQuestions = questions.map(question =>
      question.id === id ? { ...question, question: e.target.value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleReponseChange = (questionId, reponseId, e) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedReponses = question.reponses.map(reponse =>
          reponse.id === reponseId ? { ...reponse, value: e.target.value } : reponse
        );
        return { ...question, reponses: updatedReponses };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const ajouterReponse = questionId => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          reponses: [...question.reponses, { id: reponseId + 1, value: '' }]
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
    setReponseId(reponseId + 1);
  };

  const supprimerReponse = (questionId, reponseId) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === questionId) {
        const updatedReponses = question.reponses.filter(reponse => reponse.id !== reponseId);
        return { ...question, reponses: updatedReponses };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const ajouterQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questionId + 1,
        domaine: '',
        niveau: '',
        type: '',
        question: '',
        reponses: [{ id: 1, value: '' }]
      }
    ]);
    setQuestionId(questionId + 1);
  };

  const supprimerQuestion = questionId => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const handleEditQuestionModalOk = () => {
    // Logique de mise à jour de la question éditée
    setEditQuestionModalVisible(false);
    setEditQuestionId(null);
  };

  const handleEditQuestionModalCancel = () => {
    setEditQuestionModalVisible(false);
    setEditQuestionId(null);
  };

  const handleEditReponseModalOk = () => {
    // Logique de mise à jour de la réponse éditée
    setEditReponseModalVisible(false);
    setEditReponseData({ questionId: null, reponseId: null });
  };

  const handleEditReponseModalCancel = () => {
    setEditReponseModalVisible(false);
    setEditReponseData({ questionId: null, reponseId: null });
  };

  const handleEditQuestion = questionId => {
    setEditQuestionId(questionId);
    setEditQuestionModalVisible(true);
  };

  const handleEditReponse = (questionId, reponseId) => {
    setEditReponseData({ questionId, reponseId });
    setEditReponseModalVisible(true);
  };

  const handleModifierConfirmation = () => {
    setConfirmationModalVisible(true);
  };

  const handleModifier = () => {
    // Logique pour la modification
    setConfirmationModalVisible(false);
  };
  const handleFiltrerClick = () => {
    openModalFiltrer();
  };
  const history = useHistory(); // Obtenir l'objet history
  const handleRetourListe = () => {
    history.push('/liste_question'); // Naviguer vers la route de la liste des questions
  };
  return (
    <div className="container">
      <div className="text-center">
        <h2 style={{ color: '#3987ee' }}>Modifier Questions</h2>
        <Button onClick={handleFiltrerClick} style={{ marginRight: '10px' }}>Filtrer</Button>      </div>
        <Modal 
            title="Filtrer"
            visible={modalFiltrerVisible}
            onCancel={closeModalFiltrer}
            footer={null}
            width={1200}
          >
            {/* Contenu de la page de filtrage */}
            <Filtrer />
        </Modal>
      {/* Modal pour éditer la question */}
      <Modal
        title="Modifier la Question"
        visible={editQuestionModalVisible}
        onOk={handleEditQuestionModalOk}
        onCancel={handleEditQuestionModalCancel}
      >
        {/* Formulaire pour éditer la question */}
        <Form>
          <Form.Item label="Question">
            <TextArea
              className="form-control"
              value={questions.find(q => q.id === editQuestionId)?.question}
              onChange={e => handleQuestionChange(editQuestionId, e)}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal pour éditer la réponse */}
      <Modal
        title="Modifier la Réponse"
        visible={editReponseModalVisible}
        onOk={handleEditReponseModalOk}
        onCancel={handleEditReponseModalCancel}
      >
        {/* Formulaire pour éditer la réponse */}
        <Form>
        <Form.Item label="Question">
        <TextArea
          className="form-control"
          value={questions.find(question => question.id === editQuestionId)?.question} // Correction ici
          onChange={e => handleQuestionChange(editQuestionId, e)}
        />
      </Form.Item>
        </Form>
      </Modal>
      {/* Modal de confirmation */}
      <Modal
        title="Confirmation"
        visible={confirmationModalVisible}
        onOk={handleModifier}
        onCancel={() => setConfirmationModalVisible(false)}      >
        <p>Êtes-vous sûr de vouloir effectuer la modification ?</p>
      </Modal>
       
      {questions.map(question => (
        <div key={question.id}>
          <h4 style={{ fontSize: '14px' }}>Paramètre Question*</h4>
          <div className="border p-3 mb-4">
            <div className="form-group">
              <label htmlFor={`domaine_${question.id}`}>
                Domaine{' '}
                <b style={{ color: 'red' }}>* </b>
              </label>
              <select
                className="form-control custom-select-width"
                id={`domaine_${question.id}`}
                value={question.domaine}
                onChange={e => handleDomaineChange(question.id, e)}
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
            <div className="form-group">
              <label htmlFor={`niveau_${question.id}`}>
                Niveau{' '}
                <b style={{ color: 'red' }}>* </b>
              </label>
              <select
                className="form-control custom-select-width"
                id={`niveau_${question.id}`}
                value={question.niveau}
                onChange={e => handleNiveauChange(question.id, e)}
              >
                <option value="">Choisissez niveau</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type 
              <b style={{ color: 'red' }}>* </b>
              </label>
              <div>
                <Radio.Group onChange={handleTypeChange} value={selectedType}>
                  <div><Radio value="seul">Seul réponse</Radio></div>
                  <div><Radio value="multiple">Multiple réponse</Radio></div>
                </Radio.Group>
              </div>
            </div>
            <div className="form-group" style={{ width: '60%' }}>
              <label htmlFor={`question_${question.id}`}>Question
              <b style={{ color: 'red' }}>* </b>
              </label>
              <TextArea
                className="form-control"
                id={`question_${question.id}`}
                value={question.question}
                onChange={e => handleQuestionChange(question.id, e)}
              />
                  
            <EditOutlined onClick={() => handleEditQuestion(question.id)} style={{ marginLeft: '10px' }} /> 
            
            </div>
            {question.reponses.map(reponse => (
              <div className="form-group" key={reponse.id} style={{ width: '60%' }}>
                <label htmlFor={`reponse_${question.id}_${reponse.id}`}>Réponse {reponse.id}
                <b style={{ color: 'red' }}>* </b>
                </label>
                <TextArea
                  className="form-control"
                  id={`reponse_${question.id}_${reponse.id}`}
                  value={reponse.value}
                  onChange={e => handleReponseChange(question.id, reponse.id, e)}
                />
                <CloseSquareOutlined onClick={() => supprimerReponse(question.id, reponse.id)} />
                <EditOutlined onClick={() => handleEditReponse(question.id, reponse.id)} style={{ marginLeft: '10px' }}/> 
                
              </div>
            ))}
            <button onClick={() => ajouterReponse(question.id)} style={{ width: '150px' }}>
              <FaPlus /> Ajouter Réponse
            </button>
            <button onClick={() => supprimerQuestion(question.id)} style={{ width: '250px', marginTop: '10px',marginLeft: '30px' }}>
              <FaTrash /> Supprimer la Question
            </button>
            
          </div>
        </div>
      ))}
      <Button onClick={handleModifierConfirmation} style={{ width: '350px' }} type="primary">
        Modifier
      </Button>
      <button onClick={ajouterQuestion} style={{ width: '350px', marginTop: '10px',marginLeft: '30px' }}>
        <FaPlus /> Ajouter une autre Question à Modifier
      </button>
      <div className="text-center mt-4">
          {/* Bouton pour retourner à la liste des questions */}
          <button onClick={handleRetourListe} style={{ marginRight: '875px' }}>Précedent</button>
        </div>
    </div>
  );
}

export default Modifier;
