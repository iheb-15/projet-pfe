import React, { useState } from 'react';
import { Button, Table, Modal, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

function Gest() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUtilisateur, setEditingUtilisateur] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUtilisateur, setNewUtilisateur] = useState({ name: '', email: '', role: '' });
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'iheb',
      email: 'iheb@gmail.com',
      role: 'super admin',
    },
    {
      id: 2,
      name: 'iyed',
      email: 'iyed@gmail.com',
      role: 'simple admin',
    },
  
  ]);

  const handleChange = (value) => {
    console.log(value);
    setEditingUtilisateur(prev => ({ ...prev, role: value }));
  };

  const addUtilisateur = () => {
    if (!newUtilisateur.name || !newUtilisateur.email || !newUtilisateur.role) {
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
    setNewUtilisateur({ name: '', email: '', role: '' });
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
      key:'3',
      title:'lastname',
      dataIndex:'lastname'
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: '4',
      title: 'Role',
      dataIndex: 'role',
    },
    {
      key: '5',
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
          <Input
            value={editingUtilisateur?.name}
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <Input
            value={editingUtilisateur?.lastname}
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, lastname: e.target.value }));
            }}
          />
          <Input
            value={editingUtilisateur?.email}
            onChange={(e) => {
              setEditingUtilisateur((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <Select
            style={{ width: '100%' }}
            defaultValue={editingUtilisateur?.role}
            onChange={handleChange}
          >
            <Option value="0"> super admin</Option>
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
            placeholder="lastname"
            value={newUtilisateur.lastname}
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, lastname: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newUtilisateur.email}
            style={{ marginTop: 10 }}
            onChange={(e) => setNewUtilisateur({ ...newUtilisateur, email: e.target.value })}
          />
          <Select
            style={{ width: '100%', marginTop: 10 }}
            placeholder="role"
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