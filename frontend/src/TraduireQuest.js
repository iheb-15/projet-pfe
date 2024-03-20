import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { CloseSquareOutlined } from '@ant-design/icons';
import { Modal } from 'react-bootstrap';

function TraduireQuest() {
    const [showModal, setShowModal] = useState(false); 
    const [selectedDomaine, setSelectedDomaine] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [question, setQuestion] = useState('');
    const [reponses, setReponses] = useState(['']);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSecondPopup, setShowSecondPopup] = useState(false); 

    const handleCloseModal = () => setShowModal(false); 
    const handleShowModal = () => setShowModal(true); 
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

    const handleShowConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    const handleShowSuccessMessage = () => {
       
        alert('Question traduite avec succès!'); // Affichage de l'alerte
        setShowModal(false); 
        setShowSecondPopup(true); 
    };

    return (
        <div className="container">
            <div className="text-center">
                <h2 style={{ color: '#3987ee' }}>Ajouter Question</h2>
            </div>
            <h4 style={{ fontSize: '14px' }}>Traduire Question *</h4>
            <div className="border p-3 mb-4">
                <div className="form-group">
                    <label htmlFor="domaine">Domaine* :</label>
                    <select
                        className="form-control"
                        id="domaine"
                        value={selectedDomaine}
                        onChange={handleDomaineChange}
                    >
                        <option value="">Choisissez un domaine</option>
                        <option value="programmation">Programmation</option>
                        <option value="design">Design</option>
                        <option value="gestion_de_projet">Gestion de projet</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="skills">Skills* :</label>
                    <select
                        className="form-control"
                        id="skills"
                        value={selectedSkill}
                        onChange={handleSkillChange}
                    >
                        <option value="">Choisissez un skill</option>
                        <option value="communication">Communication</option>
                        <option value="analyse">Analyse</option>
                        <option value="resolution_probleme">Résolution de problèmes</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="question">Question* :</label>
                    <textarea
                        className="form-control"
                        id="question"
                        value={question}
                        onChange={handleQuestionChange}
                    ></textarea>
                </div>
                {reponses.map((reponse, index) => (
                    <div className="form-group" key={index}>
                        <label htmlFor={`reponse${index + 1}`}>Réponse {index + 1}* :</label>
                        <div className="input-group">
                            <textarea
                                className="form-control"
                                id={`reponse${index + 1}`}
                                value={reponse}
                                onChange={(e) => handleReponseChange(index, e)}
                            ></textarea>
                            <CloseSquareOutlined onClick={() => supprimerReponse(index)} />
                        </div>
                    </div>
                ))}
                {/* Bouton pour ajouter une réponse */}
                <button onClick={ajouterReponse} className="">
                    <FaPlus /> Ajouter
                </button>
            </div>
            <button className="next-button" onClick={handleShowConfirmationModal}>
                Traduire
            </button>

            {/* Modal de confirmation */}
            <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir traduire cette question ?
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCloseConfirmationModal}>Annuler</button>
                    <button onClick={handleShowSuccessMessage}>Oui</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TraduireQuest;
