import React, { useState } from 'react'; // Importation de React et de useState pour gérer l'état dans les composants fonctionnels
import { FaPlus } from 'react-icons/fa'; // Importation de l'icône FaPlus depuis react-icons
import { CloseSquareOutlined } from '@ant-design/icons'; // Importation de l'icône CloseSquareOutlined depuis ant-design/icons
import { Modal } from 'react-bootstrap'; // Importation du composant Modal depuis react-bootstrap

function TraduireQuest() {
    // Déclaration des états avec useState
    const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer le modal
    const [selectedDomaine, setSelectedDomaine] = useState(''); // État pour stocker le domaine sélectionné
    const [selectedSkill, setSelectedSkill] = useState(''); // État pour stocker la compétence sélectionnée
    const [question, setQuestion] = useState(''); // État pour stocker la question saisie
    const [reponses, setReponses] = useState(['']); // État pour stocker les réponses saisies, initialisé avec une réponse vide
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // État pour afficher ou masquer le modal de confirmation

    // Fonction pour fermer le modal principal
    const handleCloseModal = () => setShowModal(false);
    // Fonction pour afficher le modal principal
    const handleShowModal = () => setShowModal(true);
    // Fonction pour gérer le changement de domaine sélectionné
    const handleDomaineChange = (e) => {
        setSelectedDomaine(e.target.value);
    };
    // Fonction pour gérer le changement de compétence sélectionnée
    const handleSkillChange = (e) => {
        setSelectedSkill(e.target.value);
    };
    // Fonction pour gérer le changement de la question saisie
    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };
    // Fonction pour gérer le changement d'une réponse à un index spécifique
    const handleReponseChange = (index, e) => {
        const newReponses = [...reponses];
        newReponses[index] = e.target.value;
        setReponses(newReponses);
    };
    // Fonction pour ajouter une réponse
    const ajouterReponse = () => {
        setReponses([...reponses, '']);
    };
    // Fonction pour supprimer une réponse à un index spécifique
    const supprimerReponse = (index) => {
        const newReponses = [...reponses];
        newReponses.splice(index, 1);
        setReponses(newReponses);
    };
    // Fonction pour afficher le modal de confirmation
    const handleShowConfirmationModal = () => {
        setShowConfirmationModal(true);
    };
    // Fonction pour fermer le modal de confirmation
    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };
    // Fonction pour afficher un message de succès et masquer le modal principal
    const handleShowSuccessMessage = () => {
        alert('Question traduite avec succès!'); // Affichage de l'alerte
        setShowModal(false); // Masquer le modal principal
    };

    return (
        <div className="container">
            <div className="text-center">
                <h2 style={{ color: '#3987ee' }}>Ajouter Question</h2>
            </div>
            {/* Formulaire pour saisir et traduire la question */}
            <h4 style={{ fontSize: '14px' }}>Traduire Question *</h4>
            <div className="border p-3 mb-4">
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
                        {/* Options pour le domaine */}
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
                        {/* Autres options pour le domaine */}
                    </select>
                </div>
                {/* Sélection de la compétence */}
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
                        {/* Options pour la compétence */}
                        <option value="">Choisissez un skill</option>
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
                        {/* Autres options pour la compétence */}
                    </select>
                </div>
                {/* Saisie de la question */}
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
                {/* Saisie des réponses */}
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
                            <CloseSquareOutlined onClick={() => supprimerReponse(index)} />
                        </div>
                    </div>
                ))}
                {/* Bouton pour ajouter une réponse */}
                <button onClick={ajouterReponse} className="">
                    <FaPlus /> Ajouter
                </button>
            </div>
            {/* Bouton pour ouvrir le modal de confirmation */}
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
                    {/* Bouton pour annuler la traduction */}
                    <button onClick={handleCloseConfirmationModal}>Annuler</button>
                    {/* Bouton pour confirmer la traduction */}
                    <button onClick={handleShowSuccessMessage}>Oui</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TraduireQuest;
