import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AjoutQuestion.css';
import { Table, Space, Modal, Select as AntdSelect  } from 'antd';
import { EditOutlined, DeleteOutlined, SnippetsOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {  useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Grid, Paper , Button} from '@material-ui/core';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link,Redirect } from 'react-router-dom';
import { Select} from 'antd';
import {  message } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
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
  const [classifiedData, setClassifiedData] = useState({});
  const classes = useStyles();
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [domaines, setDomaines] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [selectedDomaine, setSelectedDomaine] = useState(null);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  


  useEffect(() => {
    
    fetchQuestions();
  }, [selectedDomaine, selectedCompetence,selectedLanguage]);
  // pour data classified 
  useEffect(() => {
    // Fonction pour récupérer les données depuis l'API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/features');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Classer les données récupérées par nom
        const classified = {};
        data.forEach(item => {
          if (!classified[item.class]) {
            classified[item.class] = [item.code];
          } else {
            classified[item.class].push(item.code);
          }
        });
        console.log('Data classified:', classified);
        // Mettre à jour l'état avec les données classées
        setClassifiedData(classified);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Appeler la fonction pour récupérer les données
    fetchData();
  }, []);
                                                             

  useEffect(() => {
    // pour récuprer les domaines depuis stockage local
    const domainesStorage = localStorage.getItem('domaines');

if (domainesStorage) {
  setDomaines(JSON.parse(domainesStorage));
} else {
  axios.get('http://localhost:3002/api/features')
    .then(response => {
      // Récupération des données de l'API
      const domainesData = response.data;

      // Extraction des propriétés _id et class de chaque domaine
      const domainesProcessed = domainesData.map(domaine => ({
        _id: domaine._id,
        class: domaine.class,
        code:domaine.code,
        similar_skill:domaine.similar_skill

        
      }));

      // Mise à jour de l'état avec les domaines traités
      setDomaines(domainesProcessed);

      // Stockage des domaines traités dans localStorage
      localStorage.setItem('domaines', JSON.stringify(domainesProcessed));
      setSelectedDomaine(null);
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
      axios.get('http://localhost:3002/api/features')
        .then(response => {
          const competencesData=response.data;
          const competencesProcessed= competencesData.map(competence=>({
            _id:competence._id,
            skill:competence.skill,
            code:competence.code,
            similar_skill:competence.similar_skill
          }));
          setCompetences(competencesProcessed);
          // Stocker les compétences dans le stockage local
          localStorage.setItem('competences', JSON.stringify(competencesProcessed));
          setSelectedCompetence(null);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des compétences :', error);
        });
    }
  }, []);
  console.log(domaines);

  const filteredObjects = domaines.filter((obj, index, self) =>
      index === self.findIndex((o) => (
        o.class === obj.class
      ))
    );
    console.log(filteredObjects);

    const fetchQuestions = async () => {
      try {
        let endpoint = `http://localhost:3002/api/questions`;
        console.log("Endpoint:", endpoint);
        
        if (selectedDomaine === null) {
          endpoint += `?skill=${selectedCompetence}`;
          console.log("Selected Domaine is null. Updated endpoint:", endpoint);
        } else {
          const selectedItems = classifiedData[selectedDomaine];
          console.log("Selected items:", selectedItems);
          
          const responses = await Promise.all(selectedItems.map(async (item) => {
            const response = await axios.get(`${endpoint}?skill=${item}`);
            console.log("Response for item", item, ":", response);
            return response.data
              .filter(q => !q.isArchived) // Filter out archived questions
              .map(q => ({
                //recupération de données d'après domaines
                id: q._id,
                question: {
                  fr: q.question_fr,
                  en: q.question_en
                },
                reponseId: q.reponse_id,
                class: q.domaine, 
                skill: q.competence ? q.competence.code : '',
              }));
          }));
          
          console.log(" responses:", responses);
          const questionsFromAPI = responses.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
          console.log("Questions from API:", questionsFromAPI);
          setQuestions(questionsFromAPI);
          localStorage.setItem('questions', JSON.stringify(questionsFromAPI));
          console.log("Questions set and stored in local storage.");
          return;
        }
        
        const response = await axios.get(endpoint);
        console.log("Response from API:", response);
        
        const questionsFromAPI = response.data
          .filter(q => !q.isArchived) // Filter out archived questions
          .map(q => ({
            //recupération de données d'après compétence
            id: q._id,
            question: {
              fr: q.question_fr,
              en: q.question_en
            },
            reponseId: q.id,
            class: q.domaine, 
            skill: q.competence ? q.competence.code : '',
          }));
        
        console.log("Questions from API:", questionsFromAPI);
        setQuestions(questionsFromAPI);
        localStorage.setItem('questions', JSON.stringify(questionsFromAPI));
        console.log("Questions set and stored in local storage.");
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

  useEffect(() => {
    // Récupération des questions du localStorage lors du chargement initial de la page
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  
  const handleCancelSelection = () => {
    setSelectedDomaine(null); // Réinitialise la sélection
  };
  const handleCancelSelections = () => {
    setSelectedCompetence(null); // Réinitialise la sélection
  };
  
  const handleLangueChange = async (value) => {
    setSelectedLanguage(value);  };

  const handleDomaineChange = (value) => {
    setSelectedDomaine(value);
    console.log(value);
  };

  const handleCompetenceChange =  async(value) => {
    setSelectedCompetence(value);
    console.log(value);
  };

  
  //  onSearch function
  const onSearch = (value) => {
    console.log('Searched:', value);
  };
  
  //  filterOption function
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

 
  const handleAjouterQuestion = () => {
    history.push("/ajouter_question");
  };
  const handleEditClick = (record) => {
    console.log('Edit',record)
    history.push(`/ModifierQuestion/${record.id}`);
  };

  const handleFiltrerClick = () => {
    history.push('/filtrer_Question');
  };

  // ************************partie archived question axios*******************
 
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir archiver la question: "${record.id}" ?`,
      onOk: async () => {
        try {
          await axios.patch(`http://localhost:3002/api/${record.id}`, { isArchived: true });
  
          // Ajouter un console.log pour indiquer que la question a été archivée
          console.log(`La question avec l'ID ${record.id} a été archivée.`);
  
          // Mettre à jour l'état local après l'archivage réussi
          const updatedQuestions = questions.filter((q) => q.id !== record.id);
          setQuestions(updatedQuestions);
        } catch (error) {
          console.error('Failed to archive the question:', error);
          Modal.error({
            title: 'Erreur',
            content: 'L\'archivage de la question a échoué. Veuillez réessayer plus tard.',
          });
        }
      },
      onCancel() {
        console.log('Annulation de l\'archivage.');
      },
    });
  };
 
  // **************************partie désarchived question axios******************

  useEffect(() => {
    if (isModalOpen) {
      fetchArchivedQuestions();
    }
  }, [isModalOpen]);




const fetchArchivedQuestions = async () => {
  try {
      const response = await axios.get('http://localhost:3002/api/archive/question');

      const formattedQuestions = response.data.map(question => ({
          id: question._id,
          question: {
              en: question.question_en,
              fr: question.question_fr,
          },
          isArchived: question.isArchived
      }));

      setQuestions(formattedQuestions);
      console.log('Questions set:', formattedQuestions);
  } catch (error) {
      console.error('Failed to fetch archived questions', error);
      setError('Failed to fetch archived questions');
  }
};

const handleUnarchive = async (questionId, onSuccess) => {
  try {
      const response = await axios.patch(`http://localhost:3002/api/unarchiveQuestion/${questionId}`);
      onSuccess(response.data); 
      message.success('Questions désarchivé avec succès', {
        duration: 4, 
        style: {
          marginTop: '20px', 
        },
      });
      setTimeout(() => {
        window.location.reload(); 
      }, 4000);
      } catch (error) {
      console.error('Failed to unarchive question', error);
      
  }
};


//unique pour domaines
  const uniqueClasses = new Set(domaines.map(domaine => domaine.class));
// Créer des options à partir des noms de classe uniques
const classOptions = Array.from(uniqueClasses).map(className => ({ 
  value: className,
  label: className
}));
console.log(classOptions);

//unique pour compétence
const uniqueskill = new Set(competences.map(competence => competence.skill));
const skillOptions = Array.from(uniqueskill).map(skillName => {
  const competence = competences.find(competence => competence.skill === skillName);
  return {
    value: competence.code,
    label: ` ${skillName}` 
  };
});
console.log(skillOptions);

const columns2 = [
  {
    title: 'Question',
    dataIndex: 'question',
    key: 'question',
    render: text => <span dangerouslySetInnerHTML={{ __html: text }} />,
    render: (text, record) => {
      return selectedLanguage === 'en' ? <span>{record.question.en}</span> : <span>{record.question.fr}</span>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button
        type="primary"
        onClick={() => handleUnarchive(record.id, (data) => {
          console.log('Success:', data);
        })}
      >
        Unarchive
      </Button>
    ),
  },
];



  const columns = [
    
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      render: text => <span dangerouslySetInnerHTML={{ __html: text }} />,
      render: (text, record) => {
        return selectedLanguage === 'en' ? <span>{record.question.en}</span> : <span>{record.question.fr}</span>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
         <Link to={`/ModifierQuestion/${record.id}`}> <EditOutlined style={{ color: 'blue' }}/> </Link>
          <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(record)} />
          
        </Space>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" style={{ color: "#3987ee" }} align="center" gutterBottom>Liste de Question</Typography>
      <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`}>
        <Typography variant="h7" className={`${classes.label}`} style={{ color: "#3987ee" }} gutterBottom>Paramètres de la Question<span className={classes.redAsterisk}>*</span></Typography>    
        <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
          <Grid container spacing={2} className={`${classes.spacing}`}>
            <Grid item xs={12}>
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
               
                >
                  <Option value="fr">Français</Option>
                   <Option value="en">Anglais</Option>
                </AntdSelect>
                </Grid>
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Domaine<span className={classes.redAsterisk}>*</span></Typography>
                <Select
                    showSearch
                    style={{ width: "250px" }}
                    placeholder="Choisir Domaine"
                    optionFilterProp="children"
                    onChange={handleDomaineChange}
                    onSearch={onSearch}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                    <Option key="null" value={null} onSelect={handleCancelSelection}>
                      Aucun domaines
                    </Option>
                    
                    {Object.keys(classifiedData).map(name => (
                      <Option key={name} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                 </Grid>
                 
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Compétence<span className={classes.redAsterisk}>*</span></Typography>
                <Select
                  showSearch
                  style={{ width: "250px" }}
                  placeholder="Choisir Compétence"
                  optionFilterProp="children"
                  onChange={handleCompetenceChange}
                  onSearch={onSearch}
                  filterOption={(input, option) => (option?.label ?? "").includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                >
                  <Option key="null" value={null} onClick={handleCancelSelections}>
                    Aucune compétence 
                  </Option>
                  {skillOptions.map(option => (
                    <Option key={option.value} value={option.value} label={option.label}>
                      {option.label}
                    </Option>
                  ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid> 
        </Paper>
        <div className={classes.tableContainer} style={{marginTop:"40px"}}>
        {/* ***********pour archived question********** */}
        <div>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openModal}
                  style={{ width: 250, marginLeft: 20,background:'#3987EE',left:'75%' }}
                >
                    Les Questions Archivées
                </Button>
                <Modal
                  title="Questions Archivées"
                  visible={isModalOpen}
                  onCancel={closeModal}
                  footer={[
                    <Button key="back" onClick={closeModal}>
                      Fermer
                    </Button>,
                  ]}
                  width={800}
                >
                  <Table
                    dataSource={questions}
                    columns={columns2}
                    rowKey="id"
                    onRow={(record, rowIndex) => ({
                      onClick: () => setSelectedQuestion(record),
                    })}
                  />
                </Modal>
              </div>   
        {/* *************fin archived question***********       */}
          <Table
            dataSource={questions}
            columns={columns}
            rowKey="id"
            style={{marginTop:"30px"}}
          />
         </div>
      </Paper>
    </Container>
  );
}

export default ListeQuest;
