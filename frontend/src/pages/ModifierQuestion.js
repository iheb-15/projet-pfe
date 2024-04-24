import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AjoutQuestion.css';
import {  useHistory } from 'react-router-dom';
import { Container, Typography, TextField, Button, MenuItem, FormControl, Grid, IconButton, Paper, Switch } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Select } from 'antd';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2), 
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 200,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%', 
    },
  
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
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
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
  select: {
    height: '40px',
  },
  section: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
  },
  expandedTextField: {
    marginBottom: theme.spacing(2),
  },
  '@media (min-width: 300px)': {
    paper: {
      padding: theme.spacing(2),
    },
  },
  subtitle: {
    fontSize: theme.typography.pxToRem(14), 
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12), 
    },
  },
}));

function Modifier(props) {
  const [idFromUrl, setIdFromUrl] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  const [selectedSkill, setSelectedSkill] = useState('');
  const [question, setQuestion] = useState('');
  const [reponses, setReponses] = useState([{ text: '', isCorrect: false }]);
  const [selectedType, setSelectedType] = useState('');
  const [points, setPoints] = useState('');
  const [temps, setTemps] = useState({ minutes: '', secondes: '' });
  const [niveau, setNiveau] = useState('');;
  const handleSkillChange = (e) => setSelectedSkill(e.target.value);
  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const [selectedResponseType, setSelectedResponseType] = useState(""); 
  const questionExists = question !== undefined && question !== null;
  const { location } = props;
  const [selectedDomaine, setSelectedDomaine] = useState(null);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [classifiedData, setClassifiedData] = useState({});
  const [domaines, setDomaines] = useState([]);
  const [reponse, setReponse] = useState('');
  const[questions,setQuestions]=useState('');
  const { Option } = Select;
  const [competences, setCompetences] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [question_fr, setQuestionFr] = useState('');
  const [minutes, setMinutes]=useState(0);
  const[secondes,setSecondes]=useState(0);
  const [level, setLevel] = useState('');
  const {id}=useParams();
  console.log('id',id)
  console.log("ID from URL:", idFromUrl);
  console.log("Question exists:", questionExists);
  useEffect(() => {
    setIdFromUrl(id);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/questions/${id}`);
        const { level, points, time } = response.data;
        const minutes = Math.floor(time / 60);
        const secondes = time % 60;
        
      
        setNiveau(level);
        setPoints(points);
        setTemps({ minutes, secondes });
        setMinutes(minutes);
        setSecondes(secondes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  



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

  
  fetchData();
}, []);
                                                           
// pour récuprer les domaines depuis stockage local
useEffect(() => {
  
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
}, [selectedDomaine, selectedCompetence,]);
console.log(domaines);

const filteredObjects = domaines.filter((obj, index, self) =>
    index === self.findIndex((o) => (
      o.class === obj.class
    ))
  );
  console.log(filteredObjects);

  const handleCompetenceChange =  async(value) => {
    setSelectedCompetence(value);
    console.log(value);
  };
  const handleCancelSelections = () => {
    setSelectedCompetence(null); // Réinitialise la sélection
  };
// Fonction pour récupérer la question
  useEffect(() => {
    
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/questions/${id}`);
        console.log(response);
        setQuestion(response.data);
        console.log('Level:', response.data.level);
        console.log('Point:', response.data.points);
        console.log('Time:', response.data.time);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestion();
  }, [id]);
  console.log('id util',id)

   // Récupération des réponses liées à la question
   useEffect(() => {
    const fetchResponses = async () => {
      try {
        const reponse = await axios.get(`http://localhost:3002/api/reponse/${id}`);
        console.log('answr',reponse);
        setReponse(reponse.data);
        console.log('set',setReponse)
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses:', error);
      }
    };

    if (id) {
      fetchResponses();
    }
  }, [id]);

  console.log('idRep',id);

  const handleChanges = (field, value) => {
    setQuestion(prevQuestion => ({
        ...prevQuestion,
        [field]: value
    }));
};


  const handleChange = (index, field, value) => {
    const updatedResponses = reponse.map((response, idx) => {
      if (idx === index) {
        return { ...response, [field]: value };
      }
      return response;
    });
    setReponse(updatedResponses);
  };
 
// pour update answer 
   
  const handleUpdate = async () => {
    try {
        await Promise.all(
            reponse.map(async (response) => {
                
                const updatedResponse = {
                    ...response,
                    isCorrect: response.isCorrect 
                };
               
                // Envoyer une requête PUT pour mettre à jour la réponse
                await axios.put(`http://localhost:3002/api/Reponseupdate/${response._id}`, updatedResponse);
              })
            );
            console.log(minutes,secondes)
            const tim = Number(minutes) * 60+ Number(secondes);
            
            console.log(tim)
            setQuestion(prevState => ({
              ...prevState,
              time: tim
          }));
          
            
                      
            await axios.put(`http://localhost:3002/api/questionsupdate/${id}`, question);
            console.log(question);
    } catch (error) {
        console.error('Erreur lors de la mise à jour des réponses:', error);
    }
};


 
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; 
    console.log('Image uploaded:', file);
  };
  
  const handleResponseTypeChange = (event) => { 
    setSelectedResponseType(event.target.value);
  };
  const handleModifierQuestion = () => {
    
    window.confirm('Question modifiée avec succès !')
  
     };

  const handleReponseChange = (index, e) => {
    const newReponses = [...reponses];
    newReponses[index].text = e.target.value;
    setReponses(newReponses);
  };
  
 
  const handleCorrectChange = (index) => {
    setReponse(prevReponse => {
      const updatedReponse = [...prevReponse];
      updatedReponse[index] = {
        ...updatedReponse[index],
        isCorrect: !updatedReponse[index].isCorrect
      };
      return updatedReponse;
    });
  };
 

  const handleTypeChange = (e) => setSelectedType(e.target.value);
  

  //  onSearch function
const onSearch = (value) => {
  console.log('Searched:', value);
};

  
  const ajouterReponse = () => {
    setReponse(prevReponse => [
      ...prevReponse,
      {
        answer_fr: '',
        answer_en: '',
        isCorrect: false // Initialiser avec isCorrect à false
      }
    ]);
  };
  const supprimerReponse = (index) => {
    setReponse(prevReponse => prevReponse.filter((_, i) => i !== index));
};
  const handleDomaineChange = (value) => {
    setSelectedDomaine(value);
    console.log(value);
  };

  const handleCancelSelection = () => {
    setSelectedDomaine(null); // Réinitialise la sélection
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

const handleLevelChange = (event) => {
  setLevel(event.target.value); // Mettre à jour le niveau avec la nouvelle valeur sélectionnée
};
  return (
    <Container maxWidth="md">
      <Typography variant="h6" style={{ color: "#3987ee" }} align="center" gutterBottom>Modifier Question</Typography>
      <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`}>
        <Typography variant="h7" className={`${classes.label}`} style={{ color: "#3987ee" }} gutterBottom>Paramètres de la Question<span className={classes.redAsterisk}>*</span></Typography>
        
         <Paper className={classes.section}>
            <Grid container spacing={2} className={`${classes.spacing}`}>
             
              <Grid item xs={4}>
                <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                  <Typography variant="subtitle1" className={`${classes.label}`}>Niveau<span className={classes.redAsterisk}>*</span></Typography>
                  
                  <Select

                    // value={level} 
                    onChange={ (e)=> {
                      console.log(e)
                      setQuestion(prevQuestion => ({
                        ...prevQuestion,
                        level: e
                      }))
                    } }
                    value={question.level}
                    
                    
                    displayEmpty
                    inputProps={{ 'aria-label': 'Niveau' }}
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>Choisissez un niveau</MenuItem>
                    <MenuItem value={0}>Junior</MenuItem>
                    <MenuItem value={1}>Intermédiaire</MenuItem>
                    <MenuItem value={2}>Senior</MenuItem>
                    <MenuItem value={3}>Expert</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
             
              <Grid item xs={4}>
                <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                  <Typography variant="subtitle1" className={`${classes.label}`}>Points<span className={classes.redAsterisk}>*</span></Typography>
                  <TextField
                    type="number"
                    value={question.points}
                    
                    onChange={(event) => handleChanges('points', event.target.value)}

                    variant="outlined"
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </FormControl>
              </Grid>
              {/* Saisie du temps */}
              
              <Grid item xs={4}>
                <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                  <Typography variant="subtitle1" className={`${classes.label}`}>Temps<span className={classes.redAsterisk}>*</span></Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                    {console.log(minutes,secondes) }
                      <TextField
                        type="number"
                        label="Min"
                        value={minutes}
                        
                        

                        onChange= {(event) =>{
                          console.log(event)
                          setMinutes(event.target.value)}
                        } 
                         

                       
                        
                        variant="outlined"
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        label="Sec"
                        value={secondes}
                        
                        onChange={(event) =>{
                          console.log(event)
                          setSecondes(event.target.value)}
                        }
                          
                        variant="outlined"
                        inputProps={{ min: 0, max: 59 }}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
          </Paper>
          {/* Sélection du domaine */}
        <Paper className={classes.section}>
          <Grid container spacing={2} className={`${classes.spacing}`}>
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
                    <Option key="null" value={null} onClick={handleCancelSelection}>
                      Aucun domaines
                    </Option>
                    
                                {Object.keys(classifiedData).map(name => (
                                    <div key={name}>
                                      <strong>{name}</strong>
                                      
                                    </div>
                                    
                                  ))}
                  </Select>
                 </Grid>
            {/* Sélection de la compétence */}
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
          </Paper>
          {/* Type de Question */}
          <Paper className={classes.section}>
            <Grid container spacing={2} className={classes.spacing}>
                <Grid item xs={12}>
                    <FormControl className={`${classes.formControl} ${classes.expandedTextField}`} fullWidth>
                        <Typography variant="subtitle1" className={classes.label}>
                            Type de Question<span className={classes.redAsterisk}>*</span>
                        </Typography>
                        <Select
                            value={selectedType}
                            onChange={handleTypeChange}
                            displayEmpty
                            style={{ width: "200px" }}
                            inputProps={{ 'aria-label': 'Type de Question' }}
                            className={`${classes.select} ${classes.spacing}`}
                        >
                            <MenuItem value="" disabled>Choisissez un type</MenuItem>
                            <MenuItem value="vrai-faux">Vrai/Faux</MenuItem>
                            <MenuItem value="qcm">QCM</MenuItem>
                            <MenuItem value="image">Image</MenuItem> 
                            <MenuItem value="text">Texte</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {selectedType !== "image" && (
                    <>
                       
                    <Grid item xs={12}>
                        <TextField
                            label={`Question en français*`}
                            multiline
                            rows={2}
                            variant="outlined"
                            fullWidth
                            value={question.question_fr}
                            
                            onChange={(event) => handleChanges('question_fr', event.target.value)}
                            className={`${classes.formControl} ${classes.spacing} `}
                            aria-label="Question en français"
                        />
                    </Grid>
                    
                        {/* question_en */}
                        <Grid item xs={12}>
                            <TextField
                                label="Question en anglais*"
                                multiline
                                rows={2}
                                variant="outlined"
                                fullWidth
                                value={question.question_en}
                                // onChange={(event) => handleQuestionChange(event, 'question')}
                                onChange={(event) => handleChanges('question_en', event.target.value)}
                                className={`${classes.formControl} ${classes.spacing}`}
                                aria-label="Question en anglais"
                            />
                        </Grid>
                    </>
                )}
                {selectedType === "image" && (
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </Grid>
                )}
            </Grid>
        </Paper>
              {/* Section pour les réponses */}
              <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
              <Typography variant="subtitle1" gutterBottom>Type de Réponse</Typography>
              <Select
                value={selectedResponseType} 
                onChange={handleResponseTypeChange} 
                displayEmpty
                inputProps={{ 'aria-label': 'Type de Réponse' }}
                className={`${classes.select} ${classes.spacing}`}
              >
                <MenuItem value="" disabled>Choisissez un type</MenuItem>
                <MenuItem value="vrai-faux">Vrai/Faux</MenuItem>
                <MenuItem value="qcm">QCM</MenuItem>
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="text">text</MenuItem>
              </Select>
               {/* Afficher les champs de réponse en fonction du type sélectionné */}
               {reponse && selectedResponseType !== "image" && (
                              <>
                              {reponse.map((reponseItem, index) => (
                                      <div key={reponseItem}>
                                        <div className={classes.responseContainer}>
                                          <TextField
                                            label={`réponse ${index + 1} (français)*`}
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            fullWidth
                                            value={reponseItem.answer_fr}
                                            
                                            onChange={(e) => handleChange(index, 'answer_fr', e.target.value)}
                                            className={`${classes.formControl} ${classes.spacing}`}
                                            aria-label={`réponse ${index + 1}`}
                                          />
                                          <Switch
                                            checked={reponseItem.isCorrect}
                                            onChange={() => handleCorrectChange(index)}
                                            color="primary"
                                            inputProps={{ 'aria-label': `Réponse correcte ${index + 1}` }}
                                          />
                                          <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`}>
                                            <CloseIcon />
                                          </IconButton>
                                        </div>
                                        <br/>
                                        <div className={classes.responseContainer}>
                                          <TextField
                                            label={`réponse ${index + 1} (anglais)*`}
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            fullWidth
                                            value={reponseItem.answer_en}
                                            
                                            onChange={(e) => handleChange(index, 'answer_en', e.target.value)}
                                            className={`${classes.formControl} ${classes.spacing}`}
                                            aria-label={`réponse ${index + 1}`}
                                          />
                                          <Switch
                                            checked={reponseItem.isCorrect}
                                            onChange={() => handleCorrectChange(index)}
                                            color="primary"
                                            inputProps={{ 'aria-label': `Réponse correcte ${index + 1}` }}
                                          />
                                          <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`}>
                                            <CloseIcon />
                                          </IconButton>
                                        </div>
                                      </div>
                                    ))}
                                {reponse.every(reponseItem => !reponseItem.isCorrect) && (
                                  <Typography variant="body2" style={{ color: 'red' }}>Au moins une réponse doit être correcte.</Typography>
                                )}
                                <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee' }} onClick={ajouterReponse} className={classes.addButton} aria-label="Ajouter réponse">Ajouter Réponse</Button>
                              </>
                            )}
                            {reponse && selectedResponseType === "image" && (
                              <>
                                {reponse.map((reponseItem, index) => (
                                  <div key={index} className={classes.responseContainer}>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(index, e)} // Pass index to identify which image is being uploaded
                                    />
                                    <Switch
                                      checked={reponseItem.isCorrect}
                                      onChange={() => handleCorrectChange(index)}
                                      color="primary"
                                      inputProps={{ 'aria-label': `Réponse correcte ${index + 1}` }}
                                    />
                                    <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`}>
                                      <CloseIcon />
                                    </IconButton>
                                  </div>
                                ))}
                                {reponse.every(reponseItem => !reponseItem.isCorrect) && (
                                  <Typography variant="body2" style={{ color: 'red' }}>Au moins une réponse doit être correcte.</Typography>
                                )}
                                <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee' }} onClick={ajouterReponse} className={classes.addButton} aria-label="Ajouter réponse">Ajouter Image</Button>
                              </>
                            )}
             


            </Paper>
         
        
          <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '35px' }}
            // onClick={handleModifierQuestion}
            onClick={handleUpdate}
          >
            Modifier
          </Button>
          
            <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginRight: '10px', marginTop: '35px' }}
            onClick={() => history.goBack()}
          >
            Retour
          </Button>
      </Container>
    );
  }
export default Modifier
