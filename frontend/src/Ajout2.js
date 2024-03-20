// Import des modules nécessaires depuis React et d'autres bibliothèques
import React, { useState } from 'react'; // Import de React et du hook useState
import { useHistory } from 'react-router-dom'; // Import du hook useHistory de react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; // Import des styles CSS de Bootstrap
import { Modal } from 'react-bootstrap'; // Import du composant Modal de react-bootstrap
import './AjoutQuestion.css'; // Import du fichier de style local
import { Link } from 'react-router-dom'; // Import du composant Link de react-router-dom

// Définition de la fonction composante Ajout2
function Ajout2() {
    // Initialisation de l'historique de navigation
    const history = useHistory();

    // Définition des états locaux avec useState
    const [showModal, setShowModal] = useState(false); // Pour afficher ou masquer le premier modal
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Pour afficher ou masquer le modal de confirmation
    const [showSecondPopup, setShowSecondPopup] = useState(false); // Pour afficher ou masquer le deuxième popup
    const [points, setPoints] = useState(0); // Pour stocker le nombre de points de la question
    const [minutes, setMinutes] = useState(0); // Pour stocker le nombre de minutes allouées
    const [seconds, setSeconds] = useState(0); // Pour stocker le nombre de secondes allouées
    
    // Gestion de la fermeture du premier modal
    const handleCloseModal = () => setShowModal(false); 
    // Gestion de l'ouverture du premier modal
    const handleShowModal = () => setShowModal(true); 

    // Gestion de la fermeture du modal de confirmation
    const handleCloseConfirmationModal = () => setShowConfirmationModal(false); 

    // Gestion de la fermeture du deuxième popup
    const handleCloseSecondPopup = () => setShowSecondPopup(false); 
    // Gestion de l'ouverture du deuxième popup
    const handleShowSecondPopup = () => {
        setShowModal(false); // Ferme le premier modal
        setShowSecondPopup(true); // Ouvre le deuxième popup
    }; 

    // Gestion du changement du nombre de points
    const handlePointsChange = (e) => {
        setPoints(parseInt(e.target.value)); 
    };

    // Gestion du changement du nombre de minutes
    const handleMinutesChange = (e) => {
        setMinutes(parseInt(e.target.value)); 
    };

    // Gestion du changement du nombre de secondes
    const handleSecondsChange = (e) => {
        setSeconds(parseInt(e.target.value)); 
    };

    // Gestion de l'affichage du message de succès
    const handleShowSuccessMessage = () => {
        setShowConfirmationModal(false); // Ferme le modal de confirmation
        setShowSecondPopup(false); // Masque le deuxième popup
        alert('Question ajoutée avec succès!'); // Affiche une alerte de succès
        handleCloseSecondPopup(); // Ferme automatiquement le deuxième popup de confirmation
    }; 

    // Gestion de l'affichage de la traduction de la question
    const handleShowTraduireQuest = () => {
        setShowConfirmationModal(false); // Ferme le modal de confirmation
        history.push('/traduire_quest'); // Redirige vers une autre page (route)
    };

    // Rendu de l'interface utilisateur
    return (
        <div className="container">
            {/* Titre de la page */}
            <div className="text-center">
                <h2 style={{ color: '#3987ee' }}>Ajouter Question</h2>
            </div>
            {/* Formulaire pour saisir les détails de la question */}
            <h4 style={{ fontSize: '14px' }}>Détails Question*</h4>
            <div className="border p-3 mb-4 form-container" >
                {/* Sélection du type de question */}
                <div className="form-group">
                    <label htmlFor="type">Type *:</label>
                    <select className="form-control" id="type">
                        <option value="" disabled selected>-- Sélectionner un type --</option>
                        <option value="texte">Texte</option>
                        <option value="code">Code</option>
                        <option value="QCM">QCM</option>
                    </select>
                </div>
                {/* Saisie du nombre de points */}
                <div className="form-group">
                    <label htmlFor="points">Points *:</label>
                    <div className="input-group">
                        <input type="number" className="form-control" id="points" value={points} onChange={handlePointsChange} />
                    </div>
                </div>
                {/* Saisie du temps alloué */}
                <div className="form-group">
                    <label htmlFor="temps">Temps *:</label>
                    <div className="input-group">
                        <input type="number" className="form-control" id="minutes" value={minutes} onChange={handleMinutesChange} placeholder="Minutes" style={{ marginRight: '10px' }} />
                        <input type="number" className="form-control" id="seconds" value={seconds} onChange={handleSecondsChange} placeholder="Secondes" />
                    </div>
                </div>
                {/* Sélection du niveau de difficulté */}
                <div className="form-group">
                    <label htmlFor="type">Niveau:</label>
                    <select className="form-control" id="type">
                        <option value="" disabled selected>-- Sélectionner un Niveau --</option>
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>   
            </div>
            {/* Bouton pour ajouter la question */}
            <button className='button2' onClick={handleShowModal}>Ajouter</button>
           
            {/* Bouton de retour */}
            <div className="button-group">
                <button className='next-button'>
                    <Link to="/ajouter_question" style={{ color: 'black' }}>Retour</Link>
                </button>
            </div>

            {/* Premier modal pour confirmer l'ajout d'une autre langue */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Voulez-vous ajouter une autre langue ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Contenu du modal */}
                </Modal.Body>
                {/* Footer du modal */}
                <Modal.Footer>
                    {/* Bouton pour confirmer l'ajout d'une autre langue */}
                    <button  onClick={handleShowTraduireQuest} >
                        Oui
                    </button>
                    {/* Bouton pour ne pas ajouter une autre langue */}
                    <button onClick={handleShowSecondPopup}>
                    Non
                </button>
                </Modal.Footer>
            </Modal>

            {/* Modal de confirmation pour ajouter la question */}
            <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir ajouter cette question ?
                </Modal.Body>
                {/* Footer du modal */}
                <Modal.Footer>
                    {/* Bouton pour annuler l'action */}
                    <button onClick={handleCloseConfirmationModal}>
                        Annuler
                    </button>
                    {/* Bouton pour confirmer l'action */}
                    <button onClick={handleShowSuccessMessage}>
                        Oui
                    </button>
                </Modal.Footer>
            </Modal>

            {/* Deuxième modal de confirmation pour ajouter la question */}
            <Modal show={showSecondPopup} onHide={handleCloseSecondPopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr d'ajouter cette question ?
                </Modal.Body>
                {/* Footer du modal */}
                <Modal.Footer>
                    {/* Bouton pour annuler l'action */}
                    <button onClick={handleCloseSecondPopup}>
                        Annuler
                    </button>
                    {/* Bouton pour confirmer l'action */}
                    <button onClick={handleShowSuccessMessage}>
                        Oui
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

// Export de la composante Ajout2
export default Ajout2;

