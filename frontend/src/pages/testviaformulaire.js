import React, { useState } from 'react';
import { Steps, Button, message } from 'antd';
import { Input, Select ,Pagination, InputNumber} from 'antd';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import {     Dialog, DialogContent, 
    DialogTitle, TextField, DialogActions, MenuItem,  
    FormControl, InputLabel, IconButton , Switch} from '@mui/material';
    import { TimePicker } from 'antd';
    import useMediaQuery from '@mui/material/useMediaQuery';
    import { useTheme } from '@mui/material/styles';
    import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
const { TextArea } = Input;
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
  }));


const TestFormulaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [language, setLanguage] = useState('');
  const [experience, setExperience] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');;
  const [formData, setFormData] = useState({});
  const [current, setCurrent] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
    const [dateDialogOpen, setDateDialogOpen] = useState(false); 
    const classes = useStyles();
    const history = useHistory();
    const [question, setQuestion] = useState('');
    const [reponses, setReponses] = useState([{ text: '', isCorrect: false }]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [level, setLevel] = useState('');
    const[competence,setCompetence]=useState('');
    const [selectedCompetence, setSelectedCompetence] = useState(null);
    const [formulaires, setFormulaires] = useState([[1]]);
    const [currentPage, setCurrentPage] = useState(0); 
    const [selectedResponseType, setSelectedResponseType] = useState('Texte');
    
      

    const handleQuestionChanges = (e) => {
        const { value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [selectedLanguage === 'Francais' ? 'question_en' : 'question_fr']: value
        }));
      };

      const ajouterReponses = () => {
        setFormData(prevState => ({
          ...prevState,
          answers: [
            ...prevState.answers,
            { answer_en: '', answer_fr: '', isCorrect: false }
          ]
        }));
      };

      const handleReponseChangess = (index, e) => {
        const { value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          answers: prevState.answers.map((answer, i) => {
            if (i === index) {
              return {
                ...answer,
                answer: value,
                answer_en: selectedLanguage === 'Francais' ? value : answer.answer_en,
                answer_fr: selectedLanguage === 'Anglais' ? value : answer.answer_fr,
              };
            }
            return answer;
          })
        }));
      };

    const ajouterFormulaire = () => {
      const nouvellePage = [...formulaires[currentPage], formulaires[currentPage].length + 1];
      const nouvellesFormulaires = [...formulaires];
      nouvellesFormulaires[currentPage] = nouvellePage;
      setFormulaires(nouvellesFormulaires);
      console.log(setFormulaires)
  };
   
  const onChanges = (time, timeString) => {
    console.log(time, timeString);
  };
    const [selectedType, setSelectedType] = useState('');
    const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleQuestionChange = (e) => setQuestion(e.target.value);
  const handleReponseChange = (index, e) => {
    const newReponses = [...reponses];
    newReponses[index].text = e.target.value;
    setReponses(newReponses);
  };
  const handleCorrectChange = (index) => {
    const newReponses = [...reponses];
    newReponses[index].isCorrect = !newReponses[index].isCorrect;
    setReponses(newReponses);
  };
  const onChange = (value) => {
    setSelectedType(value);
  };
  const supprimerReponse = (index) => {
    const newReponses = [...reponses];
    newReponses.splice(index, 1);
    setReponses(newReponses);
  };
  const handleAjouterReponse = () => {
    const newReponses = [...reponses, { text: '', isCorrect: false }];
    setReponses(newReponses);
  };

  
  

const onSearch = (value) => {
  console.log('Searched:', value);
};
const filterOption = (input, option) => {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
 



  ////******paramètres de affichage content************ */
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
            <Option value="fr">Français</Option>
            <Option value="en">Anglais</Option>
            <Option value="es">Espagnol</Option>
          </Select>
          <Select
            placeholder="Expérience"
            value={experience}
            onChange={(value) => setExperience(value)}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <Option value="beginner">Débutant</Option>
            <Option value="intermediate">Intermédiaire</Option>
            <Option value="advanced">Avancé</Option>
          </Select>
        </div>
            </>
      );
      const renderStep2 = () => (
        <Container maxWidth="xl">
        {formulaires[currentPage].map((num, index) => (
            <div key={index}>
                <h2>Formulaire numéro {num}</h2>
                <Typography variant="h6" style={{ color: "#3987ee" }} align="center" gutterBottom>Ajouter une Question</Typography>
                <Paper elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <Typography variant="subtitle1">Niveau</Typography>
                                <Select
                                    value={level}
                                    onChange={(e) => setLevel(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="beginner">Débutant</MenuItem>
                                    <MenuItem value="intermediate">Intermédiaire</MenuItem>
                                    <MenuItem value="advanced">Avancé</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <Typography variant="subtitle1">Points</Typography>
                                <InputNumber 
                                    min={1} max={100000}
                                    defaultValue={1} 
                                    onChange={onChange}  
                                    style={{width:200}}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <Typography variant="subtitle1">Temps</Typography>
                                <TimePicker 
                                    onChange={onChanges}
                                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                                    format='HH:mm:ss'
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="h8" className={`${classes.label}`} >Compétence<span className={classes.redAsterisk}>*</span></Typography>
                            <Select
                              showSearch
                              style={{ width: "250px" }}
                              placeholder="Choisir Compétence"
                              optionFilterProp="children"
                              onChange={""}
                              onSearch={""}
                              filterOption={(input, option) => (option?.label ?? "").includes(input)}
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                              }
                            >
                              </Select>
                        </Grid>
                        
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
                            </Grid>
                        </Grid>
                        {/* Zone de saisie de la question
                            <Grid item xs={12}>
                            <Typography variant="subtitle1" className={`${classes.label}`} >Question<span className={classes.redAsterisk}>*</span></Typography>
                            <TextArea rows={3} 
                                placeholder="Question"
                                
                                value={selectedLanguage === 'Francais' ? formData.question_en : formData.question_fr}
                                onChange={handleQuestionChanges}
                                aria-label="Question"
                                />
                            </Grid>
                            <div className={classes.responseContainer}>
                            <TextArea
                            rows={2}
                            multiline
                            variant="outlined"
                            placeholder={`Réponse ${index + 1}*`} 
                            fullWidth
                            value={selectedLanguage === 'Francais' ? answers.answer_en : answer.answer_fr}
                            onChange={(e) => handleReponseChangess(index, e)}
                            className={`${classes.formControl} ${classes.spacing}`}
                            aria-label={`Réponse ${index + 1}`}
                            style={{ display: selectedResponseType === 'Image' ? 'none' : 'block', width: "100%" }} 
                            />
                        <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`}>
                            <CloseIcon />
                            </IconButton>
                        </div>
                        {formData.answers.every(answer => !answer.isCorrect) && (
                            <Typography variant="subtitle1" className={`${classes.label}`} style={{ color: 'red' }}>
                            Veuillez sélectionner au moins une réponse correcte.
                            </Typography>
                        )}
                        
                        
                        <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee',width:180  }} 
                        className={classes.addButton} aria-label="Ajouter réponse" onClick={ajouterReponses} >Ajouter Réponse
                        </Button> */}
                </Paper>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        style={{ color: '#fff', backgroundColor: '#3987ee', width: 200 }}
                    >
                        Nouvelle Question 
                    </Button>
                </div>
            </div>
        ))}
        <Pagination count={formulaires.length} page={currentPage + 1} onChange={(event, value) => setCurrentPage(value - 1)} />
        <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '10px', width: 100 }}
            onClick={ajouterFormulaire}
        >
            Ajouter
        </Button>
    </Container>
    );
    
  const steps = [
    { title: 'Paramètre du test', content: renderStep1() },
    { title: 'Ajouter test', content: renderStep2() },
    {
      title: 'Aperçu Test',
      content: (""
        // <div>
        //   
        //   <p>Contenu de l'étape 1: {steps[0].content}</p>
        //   <p>Contenu de l'étape 2: {steps[1].content}</p>
        // </div>
      ),
    }
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = () => {
    message.success('Formulaire soumis avec succès!');
  };

  return (
    <div>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Suivant
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleFormSubmit}>
            Soumettre
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
            Précédent
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestFormulaire;
