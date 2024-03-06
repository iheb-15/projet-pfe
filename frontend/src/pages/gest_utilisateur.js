<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
=======
import React, { useState } from 'react';
import {  Table, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './gest.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

>>>>>>> e148b99a8f4d14599360c44a4142faca187086ed


function Gest() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUtilisateur, setEditingUtilisateur] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
<<<<<<< HEAD
  const [newUtilisateur, setNewUtilisateur] = useState({ name: '', lastname: '', password: '', email: '', role: '' });
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  const fetchUtilisateurs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/affichage');

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
      await axios.delete(`http://localhost:3001/api/delete/${id}`);
    } catch (error) {
      console.error("Failed to delete utilisateur", error);
      alert('Failed to delete utilisateur');
      throw error;
    }
=======
  const [newUtilisateur, setNewUtilisateur] = useState({ name: '', lastname: '', email: '', role: '' });
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'iheb',
      lastname: 'lastname1',
      email: 'iheb@gmail.com',
      role: 'super admin',
    },
    {
      id: 2,
      name: 'iyed',
      lastname: 'lastname2',
      email: 'iyed@gmail.com',
      role: 'simple admin',
    },
  ]);

  const handleChange = (value) => {
    setEditingUtilisateur((prev) => ({ ...prev, role: value }));
  };

  const addUtilisateur = () => {
    if (!newUtilisateur.name || !newUtilisateur.lastname || !newUtilisateur.email || !newUtilisateur.role) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (!newUtilisateur.email.includes('@')) {
      alert('L\'adresse e-mail doit contenir "@gmail.com" par exemple');
      return;
    }

    const newId = dataSource.length > 0 ? dataSource[dataSource.length - 1].id + 1 : 1;
    const utilisateurToAdd = { ...newUtilisateur, id: newId };
    setDataSource((prevDataSource) => [...prevDataSource, utilisateurToAdd]);
    setIsAdding(false);
    setNewUtilisateur({ name: '', lastname: '', email: '', role: '' });
>>>>>>> e148b99a8f4d14599360c44a4142faca187086ed
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
    console.log(utilisateur);
    try {
      await axios.put(`http://localhost:3001/api/update/${utilisateur.id}`, utilisateur);
    } catch (error) {
      console.error("Failed to update utilisateur", error);
      alert('Failed to update utilisateur');
      throw error;
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateUtilisateurToBackend(editingUtilisateur);
      setDataSource(dataSource.map((user) => {
        if (user.id === editingUtilisateur.id) {
          return editingUtilisateur;
        }
        return user;
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save edit", error);
      alert('Failed to save edit');
    }
  };

  const addUtilisateurToBackend = async (utilisateur) => {
    try {
      const response = await axios.post('http://localhost:3001/api/add', utilisateur);
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
<<<<<<< HEAD
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
=======
      title: 'Lastname',
      dataIndex: 'lastname',
    },
    {
      key: '4',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: '5',
      title: 'Role',
      dataIndex: 'role',
    },
    {
      key: '6',
>>>>>>> e148b99a8f4d14599360c44a4142faca187086ed
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

  return (
    <div className="gestion">
      <header className="gestion-header">
      <h1>Liste des Responsables</h1>
      <Link to="/ajouter-utilisateur" onClick={(e) => { e.preventDefault(); onAddUtilisateur(); }} className="ajouter-link">
  Ajouter Utilisateur
</Link>

        <Table columns={columns} dataSource={dataSource} className="responsive-table"></Table>

        <Modal
          title="Edit Utilisateur"
          visible={isEditing}
          okText="Save"
          onCancel={resetEditing}
          onOk={handleSaveEdit}
        >
          <div className="input-container">
          <input
            placeholder=" Enter Name"
            className="input-field"
            value={editingUtilisateur?.name}
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
           <label htmlFor="input-field" className="input-label">
                    Enter Name
                  </label>
                  <span className="input-highlight"></span>
                </div>
          <div className="input-container">
          <input
            placeholder="Lastname"
            className="input-field"
            value={editingUtilisateur?.lastname}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, lastname: e.target.value }))}
          />
          <label htmlFor="input-field" className="input-label">
                    Enter lastname
                  </label>
                  <span className="input-highlight"></span>
                </div>
           <div className="input-container">
          <input
            placeholder="Email"
            className="input-field"
            value={editingUtilisateur?.email}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, email: e.target.value }))}
          />
          <Input
            value={editingUtilisateur?.password}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, password: e.target.value }))}
          />
<<<<<<< HEAD
          <Select
            style={{ width: '100%' }}
            value={editingUtilisateur?.role}
            onChange={handleChange}
          >
            <Option value="0">super admin</Option>
            <Option value="1">simple admin</Option>
          </Select>
=======
          <label htmlFor="input-field" className="input-label">
                    Enter Email
                  </label>
                  <span className="input-highlight"></span>
          </div>
          <div class="mydict">
          <div defaultValue={editingUtilisateur?.role}
            onChange={handleChange}>
            <label>
              <input type="radio" name="radio"  value="0" />
              <span>Super Admin</span>
            </label>
            <label>
              <input type="radio" name="radio" value="1"/>
              <span>Simple Admin</span>
            </label>
          </div>
        </div>
>>>>>>> e148b99a8f4d14599360c44a4142faca187086ed
        </Modal>
        <Modal
          title="Ajouter Nouvelle Utilisateur"
          visible={isAdding}
          okText="Ajouter"
          onCancel={() => setIsAdding(false)}
          onOk={addUtilisateur}
        >
          <div className="input-container">
          <input
            placeholder=" Enter Name"
            value={newUtilisateur.name}
            className="input-field"
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, name: e.target.value })}
          />
<<<<<<< HEAD
          <Input
            placeholder="Lastname"
=======
          <label htmlFor="input-field" className="input-label">
                    Enter Name
                  </label>
                  <span className="input-highlight"></span>
                </div>
         <div className="input-container">
          <input
            placeholder=" Entre Lastname"
>>>>>>> e148b99a8f4d14599360c44a4142faca187086ed
            value={newUtilisateur.lastname}
            className="input-field"
           
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, lastname: e.target.value })}
          />
          <label htmlFor="input-field" className="input-label">
                    Enter Lastname
                  </label>
                  <span className="input-highlight"></span>
                </div>
          <div className="input-container">
          <input
            placeholder=" Enter Email"
            className="input-field"
            value={newUtilisateur.email}
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, email: e.target.value })}
          />
<<<<<<< HEAD
          <Input
            placeholder="password"
            value={newUtilisateur.password}
            style={{ marginTop: 10 }}
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, password: e.target.value })}
          />
          <Select
            style={{ width: '100%', marginTop: 10 }}
            placeholder="Role"
            value={newUtilisateur.role}
            onChange={(value) => setNewUtilisateur({ ...newUtilisateur, role: value })}
          >
            <Option value="0">super admin</Option>
            <Option value="1">simple admin</Option>
          </Select>
=======
          <label htmlFor="input-field" className="input-label">
                    Enter Email
                  </label>
                  <span className="input-highlight"></span>
                </div>
                < label  className="label-role">Choisir Role:</label>             
          <div className="mydict">
            <div>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="0"
                  checked={newUtilisateur.role === '0'}
                  onChange={() => setNewUtilisateur({ ...newUtilisateur, role: '0' })}
                />
                <span>Super Admin</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value="1"
                  checked={newUtilisateur.role === '1'}
                  onChange={() => setNewUtilisateur({ ...newUtilisateur, role: '1' })}
                />
                <span>Simple Admin</span>
              </label>
            </div>
          </div>
>>>>>>> e148b99a8f4d14599360c44a4142faca187086ed
        </Modal>
      </header>
    </div>
  );
}

export default Gest;
