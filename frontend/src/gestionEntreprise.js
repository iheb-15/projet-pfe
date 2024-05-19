import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';
import axios from 'axios';

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
        <div>
            <ul>
                <h3 style={{ textAlign: 'center', color: 'red' }}>Cliquer sur le nom de test pour afficher leur contenu</h3>
                {record.titles.map((title, index) => (
                    <li key={index} style={{ margin: '5px 0', fontSize: '1.2em', cursor: 'pointer' }} onClick={() => handleTitleClick(title)}>
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
            <h1>Gestion D'entreprise</h1>
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
                {selectedTitle && (
                    <div>
                        <p>Description: {selectedTitle.description}</p>
                        <p>Niveau: {selectedTitle.level}</p>
                        <p>Languages: {selectedTitle.languages.join(', ')}</p>
                        <h3>Questions:</h3>
                        <ul>
                            {selectedTitle.questions.map((question, index) => (
                                <li key={index}>
                                    <strong>FR:</strong> {question.question_fr}<br />
                                    <strong>EN:</strong> {question.question_en}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default Entreprise;
