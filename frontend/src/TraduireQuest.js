
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, Grid, IconButton, Paper, Switch , Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select as AntdSelect , Input} from 'antd';
const { TextArea } = Input;

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
function TraduireQuest() {
    const classes = useStyles();
    const [selectedDomaine, setSelectedDomaine] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [question, setQuestion] = useState('');
    const [reponses, setReponses] = useState([{ text: '', isCorrect: false }]);
    const [selectedType, setSelectedType] = useState('');
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
    const ajouterReponse = () => setReponses([...reponses, { text: '', isCorrect: false }]);
    const supprimerReponse = (index) => {
      const newReponses = [...reponses];
      newReponses.splice(index, 1);
      setReponses(newReponses);
    };
    const handleAjouterReponse = () => {
      const newReponses = [...reponses, { text: '', isCorrect: false }];
      setReponses(newReponses);
    };
    const handleTraduireClick = () => {
      // Simulation de traduction réussie
      toast.success('Traduction réussie!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Fermer automatiquement après 3 secondes
      });
    };
    // Define onChange function
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
    return  (
        <Container maxWidth="md">
          <Typography variant="h6" style={{ color: "#3987ee" }} align="center" gutterBottom>Ajouter une Question</Typography>
          <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`}>
            <Typography variant="h7" className={`${classes.label}`} style={{ color: "#3987ee" }} gutterBottom>Traduire Question<span className={classes.redAsterisk}>*</span></Typography>
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
        <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
          <Grid container spacing={2} className={`${classes.spacing}`}>
            {/* Sélection du type de question */}
            <Grid item xs={12}>
             
                <Typography variant="subtitle1" className={`${classes.label}`} >Type de Question<span className={classes.redAsterisk}>*</span></Typography>
                <AntdSelect
                
                placeholder="Choisir Type"
                optionFilterProp="children"
                onChange={onChange}
                style={{width:"250px"}}
                options={[
                  {
                    value: 'QCM',
                    label: 'QCM',
                  },
                  {
                    value: 'Vrai/Faux',
                    label: 'Vrai/Faux',
                  },
                  {
                    value: 'Texte',
                    label: 'Texte',
                  },
                  {
                    value: 'Code',
                    label: 'Code',
                  },
                  {
                    value: 'Image',
                    label: 'Image',
                  },
                ]}
              />
            </Grid>
            {/* Zone de saisie de la question */}
            <Grid item xs={12}>
            <Typography variant="subtitle1" className={`${classes.label}`} >Question<span className={classes.redAsterisk}>*</span></Typography>
            <TextArea rows={3} 
            
            placeholder="Question"
                value={question}
                onChange={handleQuestionChange}
                aria-label="Question"
                />
            </Grid>
          </Grid>
        </Paper>
       
        {reponses.map((reponse, index) => (
  <Paper key={index} elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
     <Typography variant="subtitle1" className={`${classes.label}`} >
       Réponse {index + 1}
    </Typography>
    <Typography variant="subtitle1" className={`${classes.label}`} >
      Type de  Réponse <span className={classes.redAsterisk}>*</span>
    </Typography>
    <AntdSelect
      placeholder="Choisir Type"
      optionFilterProp="children"
      onChange={onChange}
      style={{width:"250px"}}
      options={[
        { value: 'QCM', label: 'QCM' },
        { value: 'Vrai/Faux', label: 'Vrai/Faux' },
        { value: 'Texte', label: 'Texte' },
        { value: 'Code', label: 'Code' },
        { value: 'Image', label: 'Image' },
      ]}
    />   
    <div className={classes.responseContainer}>
      <TextArea
        rows={2}
        multiline
        variant="outlined"
        placeholder={`Réponse ${index + 1}*`} 
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
  </Paper>
))}
                  <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee' }}  className={classes.addButton} aria-label="Ajouter réponse" onClick={handleAjouterReponse}>Ajouter Réponse</Button>
              </Paper> 
              <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '35px' }}
            onClick={handleTraduireClick}
          >
            Traduire
          </Button>
             
                

              </Container>

 );  
}

export default TraduireQuest;
