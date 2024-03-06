import React, { useState } from 'react';
import {  Table, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './gest.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



function Gest() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUtilisateur, setEditingUtilisateur] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
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
  };

  const onDeleteUtilisateur = (record) => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir supprimer cet enregistrement utilisateur ?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSource((prevDataSource) => prevDataSource.filter((utilisateur) => utilisateur.id !== record.id));
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

  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
      responsive: ['sm'],
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: '3',
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
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((prevDataSource) => {
              return prevDataSource.map((utilisateur) => {
                if (utilisateur.id === editingUtilisateur.id) {
                  return editingUtilisateur;
                } else {
                  return utilisateur;
                }
              });
            });
            resetEditing();
          }}
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
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, lastname: e.target.value }));
            }}
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
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
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
          <label htmlFor="input-field" className="input-label">
                    Enter Name
                  </label>
                  <span className="input-highlight"></span>
                </div>
         <div className="input-container">
          <input
            placeholder=" Entre Lastname"
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
        </Modal>
      </header>
    </div>
  );
}

export default Gest;
