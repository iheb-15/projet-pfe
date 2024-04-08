import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AjoutQuestion.css';
import { Table, Space, Modal, Select as AntdSelect  } from 'antd';
import { EditOutlined, DeleteOutlined, SnippetsOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'; // Importez également l'icône de MinusCircleOutlined
import {  useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Paper , Button} from '@material-ui/core';
import axios from 'axios';

import { Select } from 'antd';
const { Option } = Select;
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
  const [questions, setQuestions] = useState([]);
  const [domaines, setDomaines] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [selectedDomaine, setSelectedDomaine] = useState(null);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [langue, setLangue] = useState('');
  useEffect(() => {
    
    fetchQuestions();
  }, []);

  useEffect(() => {
    // pour récuprer les domaines depuis stockage local
    const domainesStorage = localStorage.getItem('domaines');
    if (domainesStorage) {
      setDomaines(JSON.parse(domainesStorage));
    } else {
      axios.get('http://localhost:3002/api/domaines')
        .then(response => {
          setDomaines(response.data);
          
          localStorage.setItem('domaines', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des domaines :', error);
        });
    }

    // Récupérer les compétences depuis le stockage local
    const competencesStorage = localStorage.getItem('competences');
    if (competencesStorage) {
      setCompetences(JSON.parse(competencesStorage));
    } else {
      axios.get('http://localhost:3002/api/competences')
        .then(response => {
          setCompetences(response.data);
          // Stocker les compétences dans le stockage local
          localStorage.setItem('competences', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des compétences :', error);
        });
    }
  }, []);

  const fetchQuestions = async (lang) => {
    try {
      const response = await axios.get(`http://localhost:3002/api/questions?lang=${lang}`);
      const questionsFromAPI = response.data.map(q => ({
        id: q.id,
        question: `${q.question_fr} <br>- ${q.question_en}`,
        reponseId: q.reponse_id,
        class: q.domaine, 
        skill:q.competence ? q.competence.code : '',
      }));
      setQuestions(questionsFromAPI);
      //  pour Sauvegarde des questions dans le localStorage
      localStorage.setItem('questions', JSON.stringify(questionsFromAPI));
    } catch (error) {
      console.error('Erreur lors de la récupération des questions :', error);
    }
  };

  useEffect(() => {
    // Récupération des questions du localStorage lors du chargement initial de la page
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);
  
  const handleLangueChange = (value) => {
    setLangue(value);
  };
  const handleDomaineChange = (value) => {
    setSelectedDomaine(value);
  };

  const handleCompetenceChange = (value) => {
    setSelectedCompetence(value);
  };

  const filteredQuestions = questions.filter((question) => {
    if (selectedDomaine && selectedCompetence) {
      return question.class === selectedDomaine && question.skill === selectedCompetence;
    } else if (selectedDomaine) {
      return question.class === selectedDomaine;
    } else if (selectedCompetence) {
      return question.skill === selectedCompetence;
    }
    return true;
  });

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
                showSearch
                placeholder="Choisir une Langue"
                optionFilterProp="children"
                onChange={handleLangueChange}
                onSearch={onSearch}
                filterOption={filterOption}
                style={{width:"250px"}}
                // options={domaines.map(domaine => ({ value: domaine, label: domaine }))}
                >
                  <Option value="fr">Français</Option>
                   <Option value="en">Anglais</Option>
                </AntdSelect>

              
                </Grid>
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Domaine<span className={classes.redAsterisk}>*</span></Typography>
                <AntdSelect
                showSearch
                placeholder="Choisir Domaine"
                optionFilterProp="children"
                onChange={handleDomaineChange}
                onSearch={onSearch}
                filterOption={filterOption}
                style={{width:"250px"}}
                options={domaines.map(domaine => ({ value: domaine, label: domaine }))}

                />
               
                  
                </Grid>
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Compétence<span className={classes.redAsterisk}>*</span></Typography>
                <AntdSelect
                showSearch
                placeholder="Choisir Compétence"
                optionFilterProp="children"
                onChange={handleCompetenceChange}
                onSearch={onSearch}
                filterOption={filterOption}
                style={{width:"250px"}}
                options={competences.map(competences => ({ value: competences, label: competences }))}

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
          <Table columns={columns} dataSource={filteredQuestions} />
        </div>
      </Paper>
    </Container>
  );
}

export default ListeQuest;
