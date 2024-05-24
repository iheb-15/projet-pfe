import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import axios from 'axios';
import'./Entreprise.css'
function Entreprise() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null); 
    const [companies, setCompanies] = useState([]);

    const handleTitleClick = (title) => {
        setSelectedTitle(title);
        setIsModalVisible(true); 
    };

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/companies/names/all');
                setCompanies(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const expandedRowRender = (record) => (
        <div className="test-list-container">
        <ul>
            <h3>Cliquer sur le nom de test pour afficher leur contenu</h3>
            {record.titles.map((title, index) => (
                <li key={index} onClick={() => handleTitleClick(title)}>
                    {title.title}
                </li>
            ))}
        </ul>
    </div>
    );

    const columns = [
        {
            key: 'nomentreprise',
            title: 'Nom entreprise',
            dataIndex: 'nomentreprise',
        },
        {
            key: 'nombretest',
            title: 'Nombre de test',
            dataIndex: 'nombretest',
        },
        
    ];

    const data = companies.map((company, index) => ({
        key: index.toString(),
        nomentreprise: company.name,
        titles: company.titles,
        nombretest: company.titles.length,
        
    }));

    return (
        <>
        <h1 style={{textAlign: 'center', color: '#007BFF',padding: '10px',backgroundColor: '#ffffff', borderRadius: '4px',
         boxShadow: '0 2px 5px rgba(0,0,0,0.2)',width: '60%', margin: '10px auto'}}>
            Gestion Entreprise
        </h1>
            <Table
                dataSource={data}
                columns={columns}
                expandable={{
                    expandedRowRender: expandedRowRender,
                }}
            />
            <Modal
                title={selectedTitle ? selectedTitle.title : ''}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width={1000}
            >
            <div className="container" style={{fontFamily: 'Arial, sans-serif', padding: '20px',backgroundColor: '#f9f9f9',
                borderRadius: '8px',boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',maxWidth: '800px',margin: '20px auto'}}>
                    {selectedTitle && (
                        <div>
                            <strong>Description:</strong> {selectedTitle.description}<br />
                            <strong>Niveau:</strong> {selectedTitle.level}<br />
                            <strong>Languages:</strong> {selectedTitle.languages.join(', ')}
                            <h3>Questions:</h3>
                            <ul>
                                {selectedTitle.questions.map((question, index) => (
                                    <li key={index}>
                                        <strong>Question {index + 1}:</strong><br />
                                        <strong>FR:</strong> {question.question_fr}<br />
                                        <strong>EN:</strong> {question.question_en}
                                        {question.answers && question.answers.length > 0 && (
                                            <ul>
                                                {question.answers.map((answer, answerIndex) => (
                                                    <li key={answerIndex}>
                                                        <strong>Answer FR:</strong> {answer.answer_fr}<br />
                                                        <strong>Answer EN:</strong> {answer.answer_en}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default Entreprise;
