import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AjoutQuestion.css';

import {  useHistory } from 'react-router-dom';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, Grid, IconButton, Paper, Switch } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

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

function Modifier() {


  const handleImageUpload = (event) => {
    const file = event.target.files[0]; 
    console.log('Image uploaded:', file);
  };

  const classes = useStyles();
  const history = useHistory();
  const [selectedDomaine, setSelectedDomaine] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [question, setQuestion] = useState('');
  const [reponses, setReponses] = useState([{ text: '', isCorrect: false }]);
  const [selectedType, setSelectedType] = useState('');
  const [points, setPoints] = useState(0);
  const [temps, setTemps] = useState({ minutes: 0, secondes: 0 });
  const [niveau, setNiveau] = useState('');;
  const handleDomaineChange = (e) => setSelectedDomaine(e.target.value);
  const handleSkillChange = (e) => setSelectedSkill(e.target.value);
  const handleQuestionChange = (e) => setQuestion(e.target.value);

  const handleModifierQuestion = () => {
    
    window.confirm('Question modifiée avec succès !')
  
     };

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
  const ajouterReponse = () => setReponses([...reponses, { text: '', isCorrect: false }]);
  const supprimerReponse = (index) => {
    const newReponses = [...reponses];
    newReponses.splice(index, 1);
    setReponses(newReponses);
  };
  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleNiveauChange = (e) => setNiveau(e.target.value);
  const handlePointsChange = (e) => setPoints(e.target.value);
  const handleMinutesChange = (e) => setTemps({ ...temps, minutes: e.target.value });
  const handleSecondesChange = (e) => setTemps({ ...temps, secondes: e.target.value });

  

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
        <Paper className={classes.section}>
          <Grid container spacing={2} className={`${classes.spacing}`}>
           
         
            <Grid item xs={4}>
              <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                <Typography variant="subtitle1" className={`${classes.label}`}>Domaine<span className={classes.redAsterisk}>*</span></Typography>
                <Select
                  value={selectedDomaine}
                  onChange={handleDomaineChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Domaine' }}
                >
                  <MenuItem value="" disabled>Choisissez un domaine</MenuItem>
                  <MenuItem value="programmation">Programmation</MenuItem>
                  <MenuItem value="design">Design</MenuItem>
                  <MenuItem value="gestion_projet">Gestion de projet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
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
                <Paper className={classes.section}>
        <Grid container spacing={2} className={`${classes.spacing}`}>
         
          <Grid item xs={12}>
            <FormControl className={`${classes.formControl} ${classes.expandedTextField}`} fullWidth>
              <Typography variant="subtitle1" className={`${classes.label}`}>Type de Question<span className={classes.redAsterisk}>*</span></Typography>
              <Select
                value={selectedType}
                onChange={handleTypeChange}
                displayEmpty
                style={{ width: "200px" }}
                inputProps={{ 'aria-label': 'Type de Question' }}
                className={classes.select}
              >
                <MenuItem value="" disabled>Choisissez un type</MenuItem>
                <MenuItem value="vrai-faux">Vrai/Faux</MenuItem>
                <MenuItem value="qcm">QCM</MenuItem>
                <MenuItem value="image">Image</MenuItem> 
              </Select>
            </FormControl>
          </Grid>
        
          {selectedType !== "image" ? (
            <Grid item xs={12}>
              <TextField
                label="Question*"
                multiline
                variant="outlined"
                fullWidth
                value={question}
                onChange={handleQuestionChange}
              
               
              />
            </Grid>
          ) : (
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
       
          <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
      <Typography variant="subtitle1" gutterBottom>Type de Réponse<span className={classes.redAsterisk}>*</span></Typography>
      <Select
        value={selectedType}
        onChange={handleTypeChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Type de Réponse' }}
        className={`${classes.select} ${classes.spacing}`}
      >
        <MenuItem value="" disabled>Choisissez un type</MenuItem>
        <MenuItem value="vrai-faux">Vrai/Faux</MenuItem>
        <MenuItem value="qcm">QCM</MenuItem>
        <MenuItem value="image">Image</MenuItem>
      </Select>
      {selectedType !== "image" && (
        <>
          {reponses.map((reponse, index) => (
            <div key={index} className={classes.responseContainer}>
              <TextField
                label={`Réponse ${index + 1}*`}
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                value={reponse.text}
                onChange={(e) => handleReponseChange(index, e)}
                className={`${classes.formControl} ${classes.spacing}`}
                aria-label={`Réponse ${index + 1}`}
              />
              <Switch
                checked={reponse.isCorrect}
                onChange={() => handleCorrectChange(index)}
                color="primary"
                inputProps={{ 'aria-label': `Réponse correcte ${index + 1}` }}
              />
              <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`}>
                <CloseIcon />
              </IconButton>
            </div>
          ))}
          {selectedType !== "image" && reponses.every(reponse => !reponse.isCorrect) && (
            <Typography variant="body2" style={{ color: 'red' }}>Au moins une réponse doit être correcte.</Typography>
          )}
          <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee' }} onClick={ajouterReponse} className={classes.addButton} aria-label="Ajouter réponse">Ajouter Réponse</Button>
        </>
      )}
      {selectedType === "image" && (
        <>
          {reponses.map((reponse, index) => (
            <div key={index} className={classes.responseContainer}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e)}
              />
              <Switch
                checked={reponse.isCorrect}
                onChange={() => handleCorrectChange(index)}
                color="primary"
                inputProps={{ 'aria-label': `Réponse correcte ${index + 1}` }}
              />
              <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`}>
                <CloseIcon />
              </IconButton>
            </div>
          ))}
          {selectedType === "image" && reponses.every(reponse => !reponse.isCorrect) && (
            <Typography variant="body2" style={{ color: 'red' }}>Au moins une réponse doit être correcte.</Typography>
          )}
          <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee' }} onClick={ajouterReponse} className={classes.addButton} aria-label="Ajouter réponse">Ajouter Image</Button>
        </>
      )}
    </Paper>
         
        
          <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '35px' }}
            onClick={handleModifierQuestion}
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
export default Modifier;
