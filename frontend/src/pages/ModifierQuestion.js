import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Radio, Modal, Form, Input, Select, Button } from 'antd';
import { CloseSquareOutlined, EditOutlined } from '@ant-design/icons';
import { FaPlus, FaTrash } from 'react-icons/fa'; 
import '../AjoutQuestion.css';
import Filtrer from './filtrer_Question';

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
    // Logique pour afficher la page de filtrage
    // Par exemple, vous pouvez utiliser des routes pour naviguer vers la page de filtrage
    // Ou vous pouvez utiliser un état pour afficher/dissimuler la page de filtrage
  };
  return (
    <div className="container">
      <div className="text-center">
        <h2 style={{ color: '#3987ee' }}>Modifier Questions</h2>
        <Button onClick={handleFiltrerClick} style={{ marginRight: '10px' }}>Filtrer</Button>
      </div>
      {/* Modal pour éditer la question */}
      <Modal
        title="Modifier la Question"
        visible={editQuestionModalVisible}
        onOk={handleEditQuestionModalOk}
        onCancel={handleEditQuestionModalCancel}
      >
        {/* Formulaire pour éditer la question */}
        <Form>
          {/* Insérez ici les champs de formulaire pour éditer la question */}
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
          {/* Insérez ici les champs de formulaire pour éditer la réponse */}
        </Form>
      </Modal>
      {/* Modal de confirmation */}
      <Modal
        title="Confirmation"
        visible={confirmationModalVisible}
        onOk={handleModifier}
        onCancel={() => setConfirmationModalVisible(false)}
      >
        <p>Êtes-vous sûr de vouloir effectuer la modification ?</p>
      </Modal>
      {questions.map(question => (
        <div key={question.id}>
          <h4 style={{ fontSize: '14px' }}>Paramètre Question*</h4>
          <div className="border p-3 mb-4">
            <div className="form-group">
              <label htmlFor={`domaine_${question.id}`}>
                Domaine* :{' '}
              </label>
              <select
                className="form-control custom-select-width"
                id={`domaine_${question.id}`}
                value={question.domaine}
                onChange={e => handleDomaineChange(question.id, e)}
              >
                <option value="">Choisissez un domaine</option>
                <option value="programmation">Programmation</option>
                <option value="design">Design</option>
                <option value="gestion_de_projet">Gestion de projet</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`niveau_${question.id}`}>
                Niveau* :{' '}
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
              <label>Type* :</label>
              <div>
                <Radio.Group onChange={handleTypeChange} value={selectedType}>
                  <div><Radio value="seul">Seul réponse</Radio></div>
                  <div><Radio value="multiple">Multiple réponse</Radio></div>
                </Radio.Group>
              </div>
            </div>
            <div className="form-group" style={{ width: '60%' }}>
              <label htmlFor={`question_${question.id}`}>Question* :</label>
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
                <label htmlFor={`reponse_${question.id}_${reponse.id}`}>Réponse {reponse.id}* :</label>
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
    </div>
  );
}

export default Modifier;