import React, { useState, useEffect } from 'react';
import { Table, Modal, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './gest.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from './Dashboard';

const { Option } = Select;

function Gest() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUtilisateur, setEditingUtilisateur] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUtilisateur, setNewUtilisateur] = useState({ name: '', lastname: '', password: '', email: '', role: '' });
  const [dataSource, setDataSource] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  useEffect(() => {
    // Redirect if not authorized
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

      const utilisateurs = response.data.map((utilisateur) => ({
        id: utilisateur._id,
        name: utilisateur.name,
        lastname: utilisateur.lastname,
        email: utilisateur.email,
        password: utilisateur.encry_password,
        role: utilisateur.role
      }));
      setDataSource(utilisateurs);
    } catch (error) {
      console.error("Failed to fetch users", error);
      // Gérer l'erreur si nécessaire
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
      title: 'Êtes-vous sûr de vouloir supprimer cet enregistrement utilisateur ?',
      okText: 'Yes',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteUtilisateurFromBackend(record.id);
          setDataSource(prevDataSource => prevDataSource.filter((utilisateur) => utilisateur.id !== record.id));
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
      return response.data; // Retourne les données mises à jour de l'utilisateur
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
      key: '5',
      title: 'password',
      dataIndex: 'password',
    },
    {
      key: '6',
      title: 'role',
      dataIndex: 'role',
    },
    {
      key: '7',
      title: 'Actions',
      render: (record) => (
        <>
          <EditOutlined
            onClick={() => {
              onEditUtilisateur(record);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteUtilisateur(record);
            }}
            style={{ color: 'red', marginLeft: 12 }}
          />
        </>
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
        <Link to="/ajouter-utilisateur" onClick={(e) => { e.preventDefault(); onAddUtilisateur(); }} className="ajouter-link" >
          Ajouter Utilisateur
        </Link>

        <Table columns={columns} dataSource={filteredDataSource} className="responsive-table"></Table>

        <Modal
          title="Edit Utilisateur"
          visible={isEditing}
          okText="Save"
          onCancel={resetEditing}
          onOk={handleSaveEdit} // Utilisation de la fonction handleSaveEdit
        >
          <h5>name</h5>
          <Input
            value={editingUtilisateur?.name}
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <h5>lastname</h5>
          <Input
            value={editingUtilisateur?.lastname}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, lastname: e.target.value }))}
          />
          <h5>email</h5>
          <Input
            value={editingUtilisateur?.email}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, email: e.target.value }))}
          />
          <h5>password</h5>
          <Input
            value={editingUtilisateur?.password}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, password: e.target.value }))}
          />
          <h5>role</h5>
          <Select
            style={{ width: '100%' }}
            value={editingUtilisateur?.role}
            onChange={handleChange}
          >
            <Option value="0">super admin</Option>
            <Option value="1">simple admin</Option>
          </Select>
        </Modal>
        <Modal
          title="Ajouter nouvelle Utilisateur"
          visible={isAdding}
          okText="Ajouter"
          onCancel={() => setIsAdding(false)}
          onOk={addUtilisateur}
        >
          <div style={{ marginBottom: 10 }}>
          <h5>name</h5>
            <Input
              placeholder="Name"
              value={newUtilisateur.name}
              onChange={(e) => setNewUtilisateur({ ...newUtilisateur, name: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
          <h5>lastname</h5>
            <Input
              placeholder="Lastname"
              value={newUtilisateur.lastname}
              onChange={(e) => setNewUtilisateur({ ...newUtilisateur, lastname: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
          <h5>email</h5>
            <Input
              placeholder="Email"
              value={newUtilisateur.email}
              onChange={(e) => setNewUtilisateur({ ...newUtilisateur, email: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
          <h5>password</h5>
            <Input
              placeholder="password"
              value={newUtilisateur.password}
              onChange={(e) => setNewUtilisateur({ ...newUtilisateur, password: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
          <h5>role</h5>
            <Select
              style={{ width: '100%' }}
              placeholder="Role"
              value={newUtilisateur.role}
              onChange={(value) => setNewUtilisateur({ ...newUtilisateur, role: value })}
            >
              <Option value="0">super admin</Option>
              <Option value="1">simple admin</Option>
            </Select>
          </div>
        </Modal>
      </header>
    </div>
  );
}

export default Gest;