import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

function Gest() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUtilisateur, setEditingUtilisateur] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
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

  return (
    <div className="gestion">
      <header className="gestion-header">
        <Button onClick={onAddUtilisateur}>Ajouter Utilisateur</Button>
        <Table columns={columns} dataSource={dataSource} className="responsive-table"></Table>

        <Modal
          title="Edit Utilisateur"
          visible={isEditing}
          okText="Save"
          onCancel={resetEditing}
          onOk={handleSaveEdit}
        >
          <Input
            value={editingUtilisateur?.name}
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <Input
            value={editingUtilisateur?.lastname}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, lastname: e.target.value }))}
          />
          <Input
            value={editingUtilisateur?.email}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, email: e.target.value }))}
          />
          <Input
            value={editingUtilisateur?.password}
            onChange={(e) => setEditingUtilisateur(prev => ({ ...prev, password: e.target.value }))}
          />
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
          <Input
            placeholder="Name"
            value={newUtilisateur.name}
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, name: e.target.value })}
          />
          <Input
            placeholder="Lastname"
            value={newUtilisateur.lastname}
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, lastname: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newUtilisateur.email}
            style={{ marginTop: 10 }}
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, email: e.target.value })}
          />
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
        </Modal>
      </header>
    </div>
  );
}

export default Gest;