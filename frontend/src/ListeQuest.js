import React, { useState } from 'react'; // Import de React et du hook useState
import 'bootstrap/dist/css/bootstrap.min.css'; // Import des styles Bootstrap
import './AjoutQuestion.css'; // Import des styles spécifiques à ce composant
import { Table, Space, Modal } from 'antd'; // Import des composants Table, Space et Modal depuis Ant Design
import { EditOutlined, DeleteOutlined, SnippetsOutlined } from '@ant-design/icons'; // Import des icônes depuis Ant Design
import {  useHistory } from 'react-router-dom';
function ListeQuest() {
     // Configurer l'objet historique à partir du routeur React
     const history = useHistory();
    // Définition des états initiaux à l'aide du hook useState
    const [selectedLangue, setSelectedLangue] = useState('');
    const [selectedDomaine, setSelectedDomaine] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [questions, setQuestions] = useState([
        // Initialisation de l'état 'questions' avec un tableau d'objets représentant des questions
        { id: 1, question: "Qu'est-ce que React?", reponse: "React est une bibliothèque JavaScript pour la construction d'interfaces utilisateur.", code: "console.log('Hello, React!');" },
        { id: 2, question: "Qu'est-ce que Bootstrap?", reponse: "Bootstrap est un framework CSS pour le développement web.", code: "<button class='btn btn-primary'>Click me</button>" },
        { id: 3, question: "Qu'est-ce que JavaScript?", reponse: "JavaScript est un langage de programmation côté client pour le web.", code: "alert('Hello, JavaScript!');" }
    ]);

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

    // Fonction pour supprimer une question
    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Confirmation',
            content: `Êtes-vous sûr de vouloir supprimer la question: "${record.question}" ?`,
            onOk() {
                const filteredQuestions = questions.filter((q) => q.id !== record.id);
                setQuestions(filteredQuestions);
            },
            onCancel() {
                console.log('Annuler');
            },
        });
    };
    const handleEditClick = () => {
        // Rediriger vers route '/ModifierQuestion'
        history.push('/ModifierQuestion');
      };

      const handleFiltrerClick = () => {
        // Rediriger vers route 'MotPasseOublie' 
        history.push('/filtrer_Question');
      };

    // Définition des colonnes pour la table des questions
    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            width: '40%',
        },
        {
            title: 'Reponse',
            dataIndex: 'reponse',
            key: 'reponse',
            width: '40%',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '20%',
            // Définition des actions à effectuer pour chaque ligne de la table
            render: (text, record) => (
                <Space size="middle">
                    {/* Icône pour éditer la question */}
                    <EditOutlined style={{ color: 'blue' }} onClick={handleEditClick} />
                    {/* Icône pour supprimer la question */}
                    <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(record)} />
                    {/* Icône pour afficher le code associé à la question */}
                    <SnippetsOutlined style={{ color: 'gray' }} onClick={handleFiltrerClick} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="text-center">
                <h2 style={{ color: '#3987ee' }}>Liste Question</h2> {/* Titre de la page */}
            </div>
            <div className="border p-3 mb-4 form-container">
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
                        
                    
                    </select>
                </div>
            </div>
            {/* Affichage de la table des questions */}
            <div className="table-container">
                <Table columns={columns} dataSource={questions} bordered />
            </div>
        </div>
    );
}
export default ListeQuest;
