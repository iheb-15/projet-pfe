import { Button,  Steps,Table  } from 'antd';
import React, { useState,useEffect } from 'react';
import './CreateTest.css';
import { Input, Select,Modal } from 'antd';
import 'antd/dist/antd.css'; 
import axios from 'axios';
import { Typography,  Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {   Select as AntdSelect  } from 'antd';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
const { Step } = Steps;
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
  
function CréerTest() {
  const classes = useStyles();
  const [language, setLanguage] = useState('');
  const [experience, setExperience] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [current, setCurrent] = useState(0);
  const [competences, setCompetences] = useState([]);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [domaines, setDomaines] = useState([]);
  const [classifiedData, setClassifiedData] = useState({});
  const [selectedDomaine, setSelectedDomaine] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [firstContent, setFirstContent] = useState('');
  const [secondContent, setSecondContent] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isQuizStarted,setIsQuizStarted]=useState(false);
  const [idFromUrl, setIdFromUrl] = useState(null);
  const {id}=useParams();
  const [response, setResponse] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questionAll,setQuestionAll]=useState([]);
  const[recupQuestion,setRecupQuestion]=useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
 
  //******pour snacker */
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  
  //*****fin sancker*********** */
 
  // *********** relation axios*********
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const questionIds = getSelectedQuestions();

    try {
        const response = await axios.post('http://localhost:3002/api/company',{

       
            title: title,
            description: description,
            languages: [language],
            level: experience === "beginner" ? 0 : experience === "intermediate" ? 1 : experience === "advanced" ? 2 : 3,
            idQuestions: questionIds
            
        });
        handleOpenSnackbar();
        console.log('Company created:', response.data);
        
    } catch (error) {
        console.error('Error creating company:', error);
       
    }
};


  // *************fin axios***************
  
 
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
    setIdFromUrl(id);
  }, [id]);

  // *************Début quiz****************
  useEffect(() => {
    let interval = null;

    if (isQuizStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      alert('Time is up!');
    }

    return () => clearInterval(interval);
  }, [isQuizStarted, timeLeft]);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    setTimeLeft(300); 
    setIsModalVisible(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStopQuiz = () => {
    setIsQuizStarted(false); 
    setTimeLeft(300);  
    
  };

  ///////////********Fin quiz************* */
  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  // Fonction pour récupérer les questions sélectionnées
  
  const getSelectedQuestions = () => {
    // Filtrer les questions en fonction des clés des lignes sélectionnées
    const selectedQuestions = questions.filter(question =>
      selectedRowKeys.includes(question.id)
    );
    
    console.log(selectedQuestions)
    
    // Vérifier la langue sélectionnée et récupérer le texte approprié de la question
    const selectedQuestionsText = selectedQuestions.map(question => ({
      id: question.id,
      text: language === 'fr' ? question.question.fr : question.question.en
      
    }));
    console.log(selectedQuestionsText)
    
    return selectedQuestionsText;
  };
 

  const onChangeFirstContent = (e) => {
    setFirstContent(e.target.value);
  };

  const onChangeSecondContent = (e) => {
    setSecondContent(e.target.value);
  };
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
                                                             
// local storege pour domaine et compétence
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
      //******************récupération du question**************** */   
  
      // Fonction pour récupérer la question  

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
        return response.data.map(q => ({
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
    const questionsFromAPI = response.data.map(q => ({
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
    
      
      const questionRep = await Promise.all(questionsFromAPI.map(async(item) => {
        try {
          const response = await axios.get(`http://localhost:3002/api/reponse/${item.id}`);
         let responseData=response.data
          return { question: item, responseData };
        } catch (error) {
          
          console.error(`Error fetching response for question ${item.id}:`, error);
          return { question: item, response: null };
        }
    }));
    setQuestionAll(questionRep)
    console.log('R2ponse',questionRep);
    localStorage.setItem('questions', JSON.stringify(questionsFromAPI));
    console.log("Questions set and stored in local storage.");
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};
console.log(fetchQuestions);




useEffect(() => {
  fetchQuestions();
}, []);


  const onSearch = (value) => {
    console.log('search:', value);
  };

  const handleCompetenceChange =  async(value) => {
    setSelectedCompetence(value);
    console.log(value);
  };
  
  const handleCancelSelections = () => {
    setSelectedCompetence(null); 
  };
  const handleLangueChange = async (value) => {
    setSelectedLanguage(value);  };
    //  filterOption function
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

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
// ************affichage de tableau**************************
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
    
  ];
  
  const start = () => {
    setLoading(true);
    
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  //*****************paramètre du tableau************* */
  const renderStep1 = () => (
<>
    
<div>
    <Input
      placeholder="Titre du test"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{ marginBottom: '1rem' }}
    />
    <Input.TextArea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      autoSize={{ minRows: 4 }}
      style={{ marginBottom: '1rem' }}
    />
    <Select
      placeholder="Langue"
      value={language}
      onChange={(value) => setLanguage(value)}
      style={{ width: '100%', marginBottom: '1rem' }}
    >
      <Select.Option value="francais">Français</Select.Option>
      <Select.Option value="anglais">Anglais</Select.Option>
      <Select.Option value="arabe"disabled>Arabe</Select.Option>
    </Select>
    <Select
      placeholder="Expérience"
      value={experience}
      onChange={(value) => setExperience(value)}
      style={{ width: '100%', marginBottom: '1rem' }}
    >
      <Select.Option value="beginner">Débutant</Select.Option>
      <Select.Option value="intermediate">Intermédiaire</Select.Option>
      <Select.Option value="advanced">Avancé</Select.Option>
    </Select>
  </div>
    
    
        </>
  );
  const renderStep2=()=>(
    <div> 
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
  <Typography variant="h8" className={`${classes.label}`} >Compétence<span className={classes.redAsterisk}>*</span></Typography>
   <Select
       showSearch
       style={{ width: "250px" }}
       placeholder="Choisir Compétence"
       optionFilterProp="children"
       onChange={handleCompetenceChange}
       onSearch={onSearch}
       filterOption={(input, option) =>
       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
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
  <div
  style={{
  marginBottom: 16,
  marginTop: 16,
  }}
  >
  <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
  Reload
  </Button>
  <span
  style={{
  marginLeft: 8,
  }}
  >
  {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
  </span>
  </div>
  <Table rowSelection={rowSelection}rowKey="id" columns={columns} dataSource={questions} />
  </div>

  );

  const previewContent = () => (
    <div>
 <p>Language: {language}</p>
  <p>Experience: {experience}</p>
  <p>Title: {title}</p>
  <p>Description: {description}</p>

  <ol>
    {getSelectedQuestions().map((question, index) => {
      console.log("Question ID:", question.id);
      console.log("Question Text:", question.text);
      const questionTrouver = questionAll.find(item => item.question.id === question.id);
      console.log(questionTrouver);

      return (
        <li key={question.id}>
          <h3>{index + 1}. {question.text}</h3>
          {questionTrouver && (
            <ul>
              {questionTrouver.responseData.map(item => {
                return (
                  <li key={item.id} style={{ backgroundColor: item.isCorrect ? 'green' : 'inherit' }}>
                    {selectedLanguage === "fr" ? item.answer_fr : item.answer_en}
                  </li>
                );
              })}
            </ul>
          )}

          <ul>
            {response.filter(res => res.idQuestion === question.id).map(answer => {
              console.log("Filtered Answer ID:", answer.id);
              console.log("Filtered Answer Text:", answer.text);
              return (
                <li key={answer.id} style={{ backgroundColor: answer.isCorrect ? 'green' : 'inherit' }}>
                  {selectedLanguage === "fr" ? answer.answer_fr : answer.answer_en}
                </li>
              );
            })}
          </ul>
        </li>
      );
    })}
  </ol>
          
      <Button type="primary" 
      onClick={handleStartQuiz} 
      disabled={isQuizStarted}
      style={{ position: 'absolute', top: '20%', right: 50 }}>
        Start Quiz
      </Button>
      <Modal
        title="Quiz Preview"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>, 
        ]}
        width={1500} 
        height={600} 
      >
      {isQuizStarted && (
        <div>
          
          <h3>Timer: {formatTime()}</h3>
          <p>Title: {title}</p>
          <p>Description: {description}</p>
          <p>Language: {language}</p>
          <p>Experience: {experience}</p>
          <h3>Quiz Questions:</h3>
            <ol>
              {getSelectedQuestions().map((question, index) => {
                console.log("Question ID:", question.id);
                console.log("Question Text:", question.text);
                const questionTrouver = questionAll.find(item => item.question.id === question.id);
                console.log(questionTrouver);

                return (
                  <li key={question.id}>
                    <h3>{index + 1}. {question.text}</h3>
                    {questionTrouver && (
                      <ul>
                        {questionTrouver.responseData.map(item => {
                          return (
                            <li key={item.id} style={{ backgroundColor: item.isCorrect ? 'green' : 'inherit' }}>
                              {selectedLanguage === "fr" ? item.answer_fr : item.answer_en}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    <ul>
                      {response.filter(res => res.idQuestion === question.id).map(answer => {
                        console.log("Filtered Answer ID:", answer.id);
                        console.log("Filtered Answer Text:", answer.text);
                        return (
                          <li key={answer.id} style={{ backgroundColor: answer.isCorrect ? 'green' : 'inherit' }}>
                            {selectedLanguage === "fr" ? answer.answer_fr : answer.answer_en}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
          
          <Button type="danger" onClick={handleStopQuiz}>
            Stop Quiz
          </Button>
        </div>
      )}
      </Modal>

     
    </div>
    
  );
  
  const steps = [
    {title: 'Paramètre du test', content: renderStep1()},
    {title: 'Ajouter test', content: renderStep2()},
    {
      title: 'apreçu_test',
      content: ( previewContent()),
    },
    
  ];
  const next = () => {
    setRecupQuestion(true)
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  

  return (
    <>
     <div>
  <Steps current={current}>
    {steps.map(item => (
      <Step key={item.title} title={item.title} />
    ))}
  </Steps>
  <div className="steps-content">{steps[current].content}</div>
  <div className="steps-action">
    {current < steps.length - 1 && (
      <Button type="primary" onClick={() => next()}>
        Next
      </Button>
    )}
    {current > 0 && (
      <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
        Previous
      </Button>
    )}
    {current === steps.length - 1 && (
        <div>
      <Button type="primary"
      style={{ position: 'relative', top: '90%', right: '-80%' }}
      onClick={handleSubmit}
      >
        Enregistrer
      </Button>
      <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'centre' }}
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      message="Test enregistrer avec succès!"
    />
     </div>
    )}
  </div>
</div>
    </>
  );
}

export default CréerTest;
