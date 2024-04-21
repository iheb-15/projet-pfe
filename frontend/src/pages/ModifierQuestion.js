import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AjoutQuestion.css';
import {  useHistory } from 'react-router-dom';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, Grid, IconButton, Paper, Switch } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2), // Réduire le padding pour les écrans plus petits
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 200,
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%', // Pour rendre les Select pleine largeur sur les petits écrans
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
    fontSize: theme.typography.pxToRem(14), // Réduire la taille de la police pour les sous-titres
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12), // Réduire la taille de la police pour les écrans plus petits
    },
  },
}));

function Modifier(props) {
  const [idFromUrl, setIdFromUrl] = useState(null);
  const classes = useStyles();
  const history = useHistory();
  // const [selectedDomaine, setSelectedDomaine] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [question, setQuestion] = useState('');
  const [reponses, setReponses] = useState([{ text: '', isCorrect: false }]);
  const [selectedType, setSelectedType] = useState('');
  const [points, setPoints] = useState(0);
  const [temps, setTemps] = useState({ minutes: 0, secondes: 0 });
  const [niveau, setNiveau] = useState('');;
  // const handleDomaineChange = (e) => setSelectedDomaine(e.target.value);
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
  const { Option } = Select;
  



  const {id}=useParams();
  console.log('id',id)
  console.log("ID from URL:", idFromUrl);
  console.log("Question exists:", questionExists);
  useEffect(() => {
    setIdFromUrl(id);
  }, [id]);


  useEffect(() => {
    // Fonction pour récupérer la question
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/questions/${id}`);
        console.log(response);
        setQuestion(response.data);
        
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
  


 
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; 
    
    console.log('Image uploaded:', file);
  };
  
  const handleResponseTypeChange = (event) => { 
    setSelectedResponseType(event.target.value);
  };
  const handleModifierQuestion = () => {
    
    window.confirm('Question modifiée avec succès !')
    // Afficher la boîte de dialogue
     };

  const handleReponseChange = (index, e) => {
    const newReponses = [...reponses];
    newReponses[index].text = e.target.value;
    setReponses(newReponses);
  };
  
  // const handleCorrectChange = (index) => {
  //   const newReponses = [...reponse];
  //   // Vérifier si la réponse à cet index existe avant de changer la valeur de isCorrect
  //   if (newReponses[index]) {
  //     newReponses[index].isCorrect = !newReponses[index].isCorrect;
  //     setReponse(newReponses);
  //   }
  // };

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
  const handleNiveauChange = (e) => setNiveau(e.target.value);
  const handlePointsChange = (e) => setPoints(e.target.value);
  const handleMinutesChange = (e) => setTemps({ ...temps, minutes: e.target.value });
  const handleSecondesChange = (e) => setTemps({ ...temps, secondes: e.target.value });

  
  
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
  
//  onSearch function
const onSearch = (value) => {
  console.log('Searched:', value);
};


  return (
    <Container maxWidth="md">
      <Typography variant="h6" style={{ color: "#3987ee" }} align="center" gutterBottom>Modifier Question</Typography>
      <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`}>
        <Typography variant="h7" className={`${classes.label}`} style={{ color: "#3987ee" }} gutterBottom>Paramètres de la Question<span className={classes.redAsterisk}>*</span></Typography>
         {/* Section pour les niveaux, points et temps */}
         <Paper className={classes.section}>
            <Grid container spacing={2} className={`${classes.spacing}`}>
              {/* Sélection du niveau */}
              <Grid item xs={4}>
                <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                  <Typography variant="subtitle1" className={`${classes.label}`}>Niveau<span className={classes.redAsterisk}>*</span></Typography>
                  <Select
                    value={niveau}
                    onChange={handleNiveauChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Niveau' }}
                    variant="outlined"
                  >
                    <MenuItem value="" disabled>Choisissez un niveau</MenuItem>
                    <MenuItem value="débutant">Débutant</MenuItem>
                    <MenuItem value="intermédiaire">Intermédiaire</MenuItem>
                    <MenuItem value="avancé">Avancé</MenuItem>
                    <MenuItem value="expert">Expert</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Saisie des points */}
              <Grid item xs={4}>
                <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                  <Typography variant="subtitle1" className={`${classes.label}`}>Points<span className={classes.redAsterisk}>*</span></Typography>
                  <TextField
                    type="number"
                    value={points}
                    onChange={handlePointsChange}
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
                      <TextField
                        type="number"
                        label="Min"
                        value={temps.minutes}
                        onChange={handleMinutesChange}
                        variant="outlined"
                        inputProps={{ min: 0 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        label="Sec"
                        value={temps.secondes}
                        onChange={handleSecondesChange}
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
            <Grid item xs={4}>
              <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                <Typography variant="subtitle1" className={`${classes.label}`}>Compétence<span className={classes.redAredAsterisk}>*</span></Typography>
                <Select
                  value={selectedSkill}
                  onChange={handleSkillChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Compétences' }}
                  >
                    <MenuItem value="" disabled>Choisissez une Compétence</MenuItem>
                    <MenuItem value="communication">Communication</MenuItem>
                    <MenuItem value="analyse">Analyse</MenuItem>
                  </Select>
                </FormControl>
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
                                label="Question en français*"
                                multiline
                                rows={2}
                                variant="outlined"
                                fullWidth
                                value={question.question_fr}
                                onChange={(event) => handleQuestionChange(event, 'question')}
                                className={`${classes.formControl} ${classes.spacing} `}
                                aria-label="Question en français"
                            />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Question en anglais*"
                                multiline
                                rows={2}
                                variant="outlined"
                                fullWidth
                                value={question.question_en}
                                onChange={(event) => handleQuestionChange(event, 'question')}
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
                value={selectedResponseType} // Utiliser une variable distincte pour le type de réponse
                onChange={handleResponseTypeChange} // Gérer le changement de type de réponse
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
                <div key={index}>
                  <div className={classes.responseContainer}>
                    <TextField
                      label={`réponse ${index + 1} (français)*`}
                      multiline
                      rows={2}
                      variant="outlined"
                      fullWidth
                      value={reponseItem.answer_fr}
                      onChange={(e) => handleReponseChange(e, 'reponse_fr', index)}
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
                      onChange={(e) => handleReponseChange(e, 'reponse_en', index)}
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
         
          {/* Bouton pour Modier la question */}
          <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '35px' }}
            onClick={handleModifierQuestion}
          >
            Modifier
          </Button>
            {/* Bouton pour retourner */}
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
