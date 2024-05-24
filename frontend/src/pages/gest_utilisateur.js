import React, { useState, useEffect } from 'react';
import { Table, Modal, Input, Select,Tag, Button,message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined  } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './gest.css';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import Dashboard from './Dashboard';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
// const ArchiveIcon = () => <span>Archive</span>; 
function Gest() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUtilisateur, setEditingUtilisateur] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUtilisateur, setNewUtilisateur] = useState({ name: '', lastname: '', password: '', email: '', role: '' });
  const [dataSource, setDataSource] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // const [users, setUsers] = useState([]);
  // const [archiveVisible, setArchiveVisible] = useState(false);
  // const [visible, setVisible] = useState(false);
  // const [users, setUsers] = useState([]);
  // const [selectedUserId, setSelectedUserId] = useState(null);
  const history = useHistory();

 

  const [modalVisible, setModalVisible] = useState(false);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [selectedUtilisateur, setSelectedUtilisateur] = useState(null);

  useEffect(() => {
    fetchArchiver();
  }, []);

  const fetchArchiver = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/affichage');

      const utilisateursData = response.data
        .filter(utilisateur => utilisateur.isArchived) // Filtrer les utilisateurs archivés
        .map((utilisateur) => ({
          id: utilisateur._id,
          name: utilisateur.name,
          lastname: utilisateur.lastname,
          email: utilisateur.email,
          password: utilisateur.encry_password,
          role: utilisateur.role == 0 ? "Super Admin" : utilisateur.role == 1 ? "Simple Admin" : "inconnu"
        }));
      setUtilisateurs(utilisateursData);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const onDesarchiver = async (userId) => {
    try {
      await axios.put(`http://localhost:3002/api/unarchive/${userId}`);
      fetchArchiver();
      setSelectedUtilisateur(null);
      message.success('Utilisateur désarchivé avec succès', {
        duration: 3, 
        style: {
          marginTop: '20px', 
        },
      });
      setTimeout(() => {
        window.location.reload(); 
      }, 3000);
    } catch (error) {
      console.error("Failed to unarchive user", error);
      // Gérer l'erreur si nécessaire
    }
  };


  useEffect(() => { 
    const userRole = localStorage.getItem('userRole');
    if (userRole === '1') { // Vérifie si le rôle de l'utilisateur n'est pas '0' (super admin)
      alert("Vous n'avez pas les autorisations nécessaires pour accéder à cette page.");
      // Rediriger vers une autre page
      history.push('/Dashboard');
    } else {
      fetchUtilisateurs();
    }
  }, [history]);

  const fetchUtilisateurs = async () => {
    try {
        const response = await axios.get('http://localhost:3002/api/affichage');

        const utilisateurs = response.data
            .filter(utilisateur => !utilisateur.isArchived) 
            .map((utilisateur) => ({
                id: utilisateur._id,
                name: utilisateur.name,
                lastname: utilisateur.lastname,
                email: utilisateur.email,
                password: utilisateur.encry_password,
                role: utilisateur.role == 0 ? "Super Admin" : utilisateur.role ==1 ? "Simple Admin" : "inconnu"
            }));
        setDataSource(utilisateurs);
    } catch (error) {
        console.error("Failed to fetch users", error);
    }
}

  const deleteUtilisateurFromBackend = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/delete/${id}`);
    } catch (error) {
      console.error("Failed to delete utilisateur", error);
      alert('Failed to delete utilisateur');
      throw error;
    }
  };

  const onDeleteUtilisateur = (record) => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir d"archiver cet enregistrement utilisateur ?',
      okText: 'OUI',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteUtilisateurFromBackend(record.id);
          setDataSource(prevDataSource => prevDataSource.filter((utilisateur) => utilisateur.id !== record.id));
          toast.success('Utilisateur Archiver avec succès!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000); 
        
        } catch (error) {
          console.error("Failed to delete utilisateur", error);
        }
      },
    });
  };

  const onEditUtilisateur = (record) => {
    setIsEditing(true);
    setEditingUtilisateur({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingUtilisateur(null);
  };

  const handleChange = (value) => {
    console.log(value);
    setEditingUtilisateur(prev => ({ ...prev, role: value }));
  };

  const updateUtilisateurToBackend = async (utilisateur) => {
    try {
      const response = await axios.put(`http://localhost:3002/api/update/${utilisateur.id}`, utilisateur);
      return response.data; 
    } catch (error) {
      console.error("Failed to update utilisateur", error);
      throw error;
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedUser = await updateUtilisateurToBackend(editingUtilisateur);

      // Mettre à jour seulement l'utilisateur modifié dans le dataSource
      const updatedDataSource = dataSource.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });

      setDataSource(updatedDataSource);
      setIsEditing(false);
      toast.success('Utilisateur Modifier avec succès!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        window.location.reload();
      }, 5000); 
    } catch (error) {
      console.error("Failed to save edit", error);
      alert('Failed to save edit');
    }
  };

  const addUtilisateurToBackend = async (utilisateur) => {
    try {
      const response = await axios.post('http://localhost:3002/api/add', utilisateur);
      return response.data;
    } catch (error) {
      console.error("Failed to add utilisateur", error);
      alert('Failed to add utilisateur');
      throw error;
    }
  };

  const addUtilisateur = async () => {
    if (!newUtilisateur.name || !newUtilisateur.lastname || !newUtilisateur.email || !newUtilisateur.password || !newUtilisateur.role) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (!newUtilisateur.email.includes('@')) {
      alert('L\'adresse e-mail doit contenir "@gmail.com" par exemple');
      return;
    }

    try {
      const addedUtilisateur = await addUtilisateurToBackend(newUtilisateur);
      const newId = dataSource.length > 0 ? dataSource[dataSource.length - 1].id + 1 : 1;
      const utilisateurToAdd = { ...newUtilisateur, id: newId };
      setDataSource((prevDataSource) => [...prevDataSource, utilisateurToAdd]);
      setIsAdding(false);
      setNewUtilisateur({ name: '', lastname: '', password: '', email: '', role: '' });
      toast.success('Utilisateur ajouter avec succès!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
      // Rafraîchir la page après un court délai
      setTimeout(() => {
        window.location.reload();
      }, 5000); 
    } catch (error) {
      // Handle the error if needed
    }
  };

  const columns = [
    {
      key: '2',
      title: 'name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'lastname',
      dataIndex: 'lastname',
    },
    {
      key: '4',
      title: 'email',
      dataIndex: 'email',
    },
    {
      key: '6',
      title: 'role',
      dataIndex: 'role',
      render: (text, record) => (
        <span style={{ 
            backgroundColor: 'transparent', 
            padding: '5px 10px', 
            borderRadius: '4px', 
            color: record.role === 'Simple Admin' ? 'blue' : 'green',
            boxShadow: record.role === 'Simple Admin' ? '2px 2px 5px #888888' : record.role === 'Super Admin' ? '2px 2px 5px #888888' : 'none' }}>
            {record.role === 'Simple Admin' ? record.role : text}
        </span>
    ),
    },
    {
      key: '7',
      title: 'Actions',
      render: (record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              onEditUtilisateur(record);
            }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => {
              onDeleteUtilisateur(record);
            }}
            style={{ marginLeft: 8 }}
          >
            Archiver
          </Button>
        
        </>
      ),
    },
  
    
  ];
 
  const columns2 = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Prénom',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => onDesarchiver(record.id)}>Désarchiver</Button>
      ),
    },
  ];
 


  const onAddUtilisateur = () => {
    setIsAdding(true);
   
  };

  const filteredDataSource = dataSource.filter(user => {
    return user.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  
  return (
    <div className="gestion">
      <header className="gestion-header">
        <h1>Liste des Responsables</h1>
        <div style={{ float: 'right', marginBottom: '10px' }}>
        <h5 style={{color:'#007bff',margin:'5px'}}>Rechercher utilisateur </h5>
          <Input
            placeholder="Rechercher par nom"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            size="small"
            style={{ width: '200px' }}
          />
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddUtilisateur}
          style={{ width: 200, marginRight: 20 }} 
        >
          Ajouter Utilisateur
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{ width: 200, marginLeft: 20 }} 
        >
          Utilisateurs Archivés
        </Button>
      <Modal
        title="Utilisateurs Archivés"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Fermer
          </Button>,
        ]}
        width={800}
      >
        <Table
          dataSource={utilisateurs}
          columns={columns2}
          rowKey="id"
          onRow={(record, rowIndex) => ({
            onClick: () => setSelectedUtilisateur(record),
          })}
        />
        {selectedUtilisateur && (
          <Button type="primary" onClick={onDesarchiver}>
            Désarchiver {selectedUtilisateur.name} {selectedUtilisateur.lastname}
          </Button>
        )}
      </Modal>
    
        <Table columns={columns} dataSource={filteredDataSource} className="responsive-table"></Table>
        <Modal
          title="Modifier Utilisateur"
          visible={isEditing}
          okText="Enregistrer"
          onCancel={resetEditing}
          onOk={handleSaveEdit}
        >
          <div className="modal-content">
            <div className="modal-item">
              <h5>Nom</h5>
              <Input
                value={editingUtilisateur?.name}
                onChange={(e) => {
                  setEditingUtilisateur((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </div>
            <div className="modal-item">
              <h5>Prénom</h5>
              <Input
                value={editingUtilisateur?.lastname}
                onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, lastname: e.target.value }))}
              />
            </div>
            <div className="modal-item">
              <h5>Email</h5>
              <Input
                value={editingUtilisateur?.email}
                onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="modal-item">
              <h5>Mot de passe</h5>
              <Input
                value={editingUtilisateur?.password}
                onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div className="modal-item">
              <h5>Rôle</h5>
              <Select
                style={{ width: '100%' }}
                value={editingUtilisateur?.role}
                onChange={handleChange}
              >
                <Option value="0">Super Admin</Option>
                <Option value="1">Simple Admin</Option>
              </Select>
            </div>
          </div>
        </Modal>
        <Modal
          title="Ajouter Nouvel Utilisateur"
          visible={isAdding}
          okText="Ajouter"
          onCancel={() => setIsAdding(false)}
          onOk={addUtilisateur}
        >
          <div className="modal-content">
            <div className="modal-item">
              <h5>Nom</h5>
              <Input
                placeholder="Nom"
                value={newUtilisateur.name}
                onChange={(e) => setNewUtilisateur({ ...newUtilisateur, name: e.target.value })}
              />
            </div>
            <div className="modal-item">
              <h5>Prénom</h5>
              <Input
                placeholder="Prénom"
                value={newUtilisateur.lastname}
                onChange={(e) => setNewUtilisateur({ ...newUtilisateur, lastname: e.target.value })}
              />
            </div>
            <div className="modal-item">
              <h5>Email</h5>
              <Input
                placeholder="Email"
                value={newUtilisateur.email}
                onChange={(e) => setNewUtilisateur({ ...newUtilisateur, email: e.target.value })}
              />
            </div>
            <div className="modal-item">
              <h5>Mot de passe</h5>
              <Input
                placeholder="Mot de passe"
                value={newUtilisateur.password}
                onChange={(e) => setNewUtilisateur({ ...newUtilisateur, password: e.target.value })}
              />
            </div>
            <div className="modal-item">
              <h5>Rôle</h5>
              <Select
                style={{ width: '100%' }}
                placeholder="Rôle"
                value={newUtilisateur.role}
                onChange={(value) => setNewUtilisateur({ ...newUtilisateur, role: value })}
              >
                <Option value="0">Super Admin</Option>
                <Option value="1">Simple Admin</Option>
              </Select>
            </div>
          </div>
        </Modal>
   
      </header>
    
    </div>
  );
}

export default Gest;
