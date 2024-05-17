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
        // {
        //     key: 'nbcandidat',
        //     title: 'Nombre de candidat passé test',
        //     dataIndex: 'nbcandidat',
        // },
        // {
        //     key: 'scormax',
        //     title: 'Scort max',
        //     dataIndex: 'scormax',
        // },
        // {
        //     key: 'scormin',
        //     title: 'Scort Min',
        //     dataIndex: 'scormin',
        // }
    ];

    const data = companies.map((company, index) => ({
        key: index.toString(),
        nomentreprise: company.name,
        titles: company.titles,
        nombretest: company.titles.length,
        nbcandidat:'12',
        scormax:'80%',
        scormin:'25%'
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
                        <p>languages: {selectedTitle.languages}</p>
                    </div>
                )}
            </Modal>
        </>
    );
}

export default Entreprise;
