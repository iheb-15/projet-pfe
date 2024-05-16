import React, { useState,useEffect } from 'react';
import { Table, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
function Entreprise() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSecondModalVisible, setSecondModalVisible] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [modalVisible, setModalVisible] = useState(false); // état pour gérer la visibilité du modal
    const [selectedTitle, setSelectedTitle] = useState(null); // état pour stocker le titre sélectionné

    const handleTitleClick = (title) => {
        setSelectedTitle(title);
        setModalVisible(true); // Afficher le modal lorsque le titre est cliqué
    };

    useEffect(() => {
        // Fonction pour charger les noms des entreprises depuis le backend
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





    const showModal = (record) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };

    
    const handleOk = () => {
        setIsModalVisible(false);
    };

    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showSecondModal = () => {
        setSecondModalVisible(true);
    };

    const handleSecondModalOk = () => {
        setSecondModalVisible(false);
    };

    const handleSecondModalCancel = () => {
        setSecondModalVisible(false);
    };
   
    const titlesStyle = {
        margin: '5px 0',
        fontSize: '1.2em', 
    };

    const h3Style = {
        textAlign: 'center',
        color: 'red', 
    }

    const expandedRowRender = (record) => (
        <div>
            <ul>
                <h3 style={h3Style}>Cliquer sur le nom de test pour afficher leur contenu</h3>
                {record.titles.map((title, index) => (
                    <li key={index} style={titlesStyle} onClick={() => handleTitleClick(title)}>
                        {title}
                    </li>
                ))}
            </ul>
            {/* Modal */}
            <Modal
                title={selectedTitle}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={800}
            >
                Contenu du modal pour {selectedTitle}
            </Modal>
        </div>
    );
    const rowExpandable = (record) => record.name !== 'Not Expandable';
    const columns = [
        {
          key: '2',
          title: 'nom entreprise',
          dataIndex: 'nomentreprise',
        },
        {
          key: '3',
          title: 'nombre test',
          dataIndex: 'nombretest',
        },
        {
          key: '4',
          title: 'nombre candidat',
          dataIndex: 'nombrecandidat',
        },
    //     {
    //       key: '6',
    //       title: 'role',
    //       dataIndex: 'role',
    //     },
    //     {
    //       key: '7',
    //       title: 'Actions',
    //       render: (_, record) => (
    //         <EyeOutlined
    //         onClick={() => showModal(record)}
    //         style={{ color: 'blue', cursor: 'pointer' }}
    //     />
    // ),
    //     },
    ]    
    const data = companies.map((company, indx) => ({ 
        key: indx.toString(),
        nomentreprise: company.name,
        titles:company.titles ,
        nombretest: company.titles.length
      }));
      
 
    return(
        <>
        <h1>Gestion D'entreprise</h1>
    
             <Table
                dataSource={data}
                
                columns={columns} 
                expandable={{
                    expandedRowRender: expandedRowRender,
                    rowExpandable: rowExpandable,
                   
                }}
                
            />
            
  </>
   );
};
export default Entreprise; 