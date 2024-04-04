import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AjoutQuestion.css';
import { Table, Space, Modal, Select as AntdSelect  } from 'antd';
import { EditOutlined, DeleteOutlined, SnippetsOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'; // Importez également l'icône de MinusCircleOutlined
import {  useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Paper , Button} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 200,
    
    
  },
  responseContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  responseCard: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.1)',
  },
  addButton: {
    marginTop: theme.spacing(2),
    color:"#3987ee",
  },
  label: {
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
  },
  spacing: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    
  },
  redAsterisk: {
    color: 'red',
  },
  section: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid `,
    color:"#3987ee",
    borderRadius: theme.spacing(2),
  },
  expandedTextField: {
    marginBottom: theme.spacing(2),
    color:"#3987ee",
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.1)',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    background: 'rgba(0, 0, 0, 0.05)',
  },
}));

function ListeQuest() {
  const classes = useStyles();
  const history = useHistory();

  const [questions, setQuestions] = useState([
    { id: 1, question: "Qu'est-ce que React?", reponse: "React est une bibliothèque JavaScript pour la construction d'interfaces utilisateur.", code: "console.log('Hello, React!');" },
    { id: 2, question: "Qu'est-ce que Bootstrap?", reponse: "Bootstrap est un framework CSS pour le développement web.", code: "<button class='btn btn-primary'>Click me</button>" },
    { id: 3, question: "Qu'est-ce que JavaScript?", reponse: ["JavaScript est un langage de programmation côté client pour le web.", "JavaScript est également utilisé côté serveur avec Node.js."], code: "alert('Hello, JavaScript!');" }
  ]);

  const [expandedRows, setExpandedRows] = useState([]);

  const handleEditClick = () => {
    history.push('/ModifierQuestion');
  };

  const handleFiltrerClick = () => {
    history.push('/filtrer_Question');
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir supprimer la question: "${record.question}" ?`,
      onOk() {
        const filteredQuestions = questions.filter((q) => q.id !== record.id);
        setQuestions(filteredQuestions);
      },
      onCancel() {
        console.log('Annuler');
      },
    });
  };

  const handleToggleRow = (record) => {
    if (expandedRows.includes(record.id)) {
      setExpandedRows(expandedRows.filter((id) => id !== record.id));
    } else {
      setExpandedRows([...expandedRows, record.id]);
    }
  };

  const handleAjouterQuestion = () => {
    history.push("/ajouter_question");
  };
  const onChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  
  // Define onSearch function
  const onSearch = (value) => {
    console.log('Searched:', value);
  };
  
  // Define filterOption function
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '40%',
    },
    {
      title: 'Reponse',
      dataIndex: 'reponse',
      key: 'reponse',
      width: '40%',
      render: (text, record) => (
        <>
          {Array.isArray(text) && text.length > 1 ? (
            <Space>
              <PlusCircleOutlined style={{ color: 'green' }} onClick={() => handleToggleRow(record)} />
              {expandedRows.includes(record.id) ? (
                <MinusCircleOutlined style={{ color: 'red' }} onClick={() => handleToggleRow(record)} />
              ) : null}
            </Space>
          ) : null}
          {expandedRows.includes(record.id) ? (
            <ul>
              {text.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : Array.isArray(text) ? text[0] : text}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined style={{ color: 'blue' }} onClick={handleEditClick} />
          <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(record)} />
          <SnippetsOutlined style={{ color: 'gray' }} onClick={handleFiltrerClick} />
        </Space>
      ),
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h6" style={{ color: "#3987ee" }} align="center" gutterBottom>Liste de Question</Typography>
      <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`}>
        <Typography variant="h7" className={`${classes.label}`} style={{ color: "#3987ee" }} gutterBottom>Paramètres de la Question<span className={classes.redAsterisk}>*</span></Typography>
        <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
          
          <Grid container spacing={2} className={`${classes.spacing}`}>
            {/* En-tête pour les paramètres */}
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Langue<span className={classes.redAsterisk}>*</span></Typography>
                <AntdSelect
                placeholder="Choisir une Langue"
                optionFilterProp="children"
                onChange={onChange}
                
                filterOption={filterOption}
                style={{width:"250px"}}
                options={[
                  {
                    value: 'Francais',
                    label: 'Francais',
                  },
                  {
                    value: 'Anglais',
                    label: 'Anglais',
                  },
                  {
                    value: 'Arabe',
                    label: 'Arabe',
                  },
                ]}
              />

                </Grid>
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Domaine<span className={classes.redAsterisk}>*</span></Typography>
                <AntdSelect
                showSearch
                placeholder="Choisir Domaine"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                style={{width:"250px"}}
                options={[
                  {
                    value: 'Programmation',
                    label: 'Programmation',
                  },
                  {
                    value: 'Design',
                    label: 'Design',
                  },
                  {
                    value: 'Gestion Projet',
                    label: 'Gestion Projet',
                  },
                ]}
              />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Compétence<span className={classes.redAsterisk}>*</span></Typography>
                <AntdSelect
                showSearch
                placeholder="Choisir Compétence"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                style={{width:"250px"}}
                options={[
                  {
                    value: 'Java',
                    label: 'Java',
                  },
                  {
                    value: 'Python ',
                    label: 'Python ',
                  },
                  {
                    value: 'Agile',
                    label: 'Agile',
                  },
                ]}
              />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.tableContainer} style={{marginTop:"40px"}}>
          <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', marginBottom: '15px', float:"right" }}
            onClick={handleAjouterQuestion}
          >
            Ajouter
          </Button>
          <Table columns={columns} dataSource={questions} bordered />
        </div>
      </Paper>
    </Container>
  );
}

export default ListeQuest;
