import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { Container, Typography,  Button,  FormControl, Grid, IconButton, Paper, Switch } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Select as AntdSelect , Space, InputNumber, TimePicker,Input,Pagination} from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd'; // Import message from Ant Design

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

function AjoutQuestion() {
  
  const classes = useStyles();
  const history = useHistory();
  const [question, setQuestion] = useState('');
  const [reponses, setReponses] = useState([{ text: '', isCorrect: false }]);
  const [domaines, setDomaines] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [selectedResponseType, setSelectedResponseType] = useState('Texte'); // État pour suivre le type de réponse sélectionné

  // Gestionnaire pour le changement du type de réponse
  const handleQuestionTypeChange = (value) => {
    setSelectedResponseType(value);
  };

  useEffect(() => {
    // Récupérer les domaines
    axios.get('http://localhost:3002/api/features/domaines')
      .then(response => {
        setDomaines(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des domaines :', error);
      });

    // Récupérer les compétences
    axios.get('http://localhost:3002/api/features/competences')
      .then(response => {
        setCompetences(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des compétences :', error);
      });
  }, []);
  const [formData, setFormData] = useState({
    className: '',
    skill: '',
    ref: '',
    question_en: '',
    question_fr: '',
    level: '',
    points: '',
    time: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/transferCode', formData);
      console.log(response.data);
      // Vous pouvez gérer la réponse ici, par exemple afficher un message de succès à l'utilisateur
    } catch (error) {
      console.error('Error:', error.response.data);
      // Vous pouvez gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
    }
  };
 
  const handleQuestionChange = (e) => {
    if (selectedResponseType !== 'Image') {
      setQuestion(e.target.value);
    }
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

  const supprimerReponse = (index) => {
    const newReponses = [...reponses];
    newReponses.splice(index, 1);
    setReponses(newReponses);
  };
  const handleAjouterReponse = () => {
    const newReponses = [...reponses, { text: '', isCorrect: false }];
    setReponses(newReponses);
  };

  const handleAjouterQuestion = () => {
    console.log('Question ajoutée avec succès !');
    const addAnotherLanguage = window.confirm("Voulez-vous ajouter une autre langue ?");
    history.push("/traduire_quest");
  };

const onChange = (value) => {
  console.log(`Selected: ${value}`);
};
const onSearch = (value) => {
  console.log('Searched:', value);
};
const filterOption = (input, options) => {
  return (
    options.children && options.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  );
};


const [value, setValue] = useState(null); // Initialize value state and its setter function

// Define onChange function for TimePicker
const onChangetime = (time) => {
  setValue(time);
};
const [current, setCurrent] = useState('');
const onChangePage= (page) => {
  console.log(page);
  setCurrent(page);
};
// Définir une fonction de traitement du téléchargement
const handleUpload = (info) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
}
const CustomUpload = () => (
  <Upload
    action="/upload.do"
    method="post"
    beforeUpload={() => false} // Empêche le téléchargement automatique
    onChange={handleUpload}
    multiple={false} // Permettre le téléchargement de plusieurs fichiers
    style={{justifyContent: 'center'}}
  >
    <Button icon={<UploadOutlined />}>Sélectionner un fichier</Button>
  </Upload>
);
  return (
    <Container maxWidth="lg">
      <Typography variant="h6" style={{ color: "#3987ee" }} align="center" gutterBottom>Ajouter une Question</Typography>
      <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`}>
        <Typography variant="h7" className={`${classes.label}`} style={{ color: "#3987ee" }} gutterBottom>Paramètres de la Question<span className={classes.redAsterisk}>*</span></Typography>
        <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
        <Grid container spacing={2} className={`${classes.spacing}`}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                <Typography variant="h8" className={`${classes.label}`} >Langue<span className={classes.redAsterisk}>*</span></Typography>
                  <AntdSelect
                    placeholder="Choisir une Langue"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    style={{width:"100%"}}
                    options={[
                      { value: 'Francais', label: 'Francais' },
                      { value: 'Anglais', label: 'Anglais' },
                      { value: 'Arabe', label: 'Arabe' },
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
                style={{width:"100%"}}
                options={domaines.map(domaine => ({ value: domaine, label: domaine }))}
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
                style={{width:"100%"}}
                options={competences.map(competence => ({ value: competence, label: competence }))}
                  />
              
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
          <Grid container spacing={2} className={`${classes.spacing}`}>
            <Grid item xs={12} sm={4}>
              <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                <Typography variant="subtitle1" className={`${classes.label}`}>Niveau<span className={classes.redAsterisk}>*</span></Typography>
                <AntdSelect
                placeholder="Choisissez un niveau"
                optionFilterProp="children"
                onChange={onChange}
                style={{width:"50%"}}
                options={[
                  {
                    value: 'débutant',
                    label: 'Débutant',
                  },
                 {
                  value:"intermédiaire",
                  label: 'Intermédiaire',
                 },
                 {
                   value:"avancé",
                  label:' Avancé',
                 },
                 {
                   value:"expert",
                   label:'Expert',
                 },
                ]}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                <Typography variant="subtitle1" className={`${classes.label}`}>Points<span className={classes.redAsterisk}>*</span></Typography>
                <Space wrap> 
                    <InputNumber min={1}
                     max={100000}
                     defaultValue={1}
                     onChange={onChange} 
                     style={{width:"100%"}}/>
                    </Space>
         </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                <Typography variant="subtitle1" className={`${classes.label}`}>Temps<span className={classes.redAsterisk}>*</span></Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                   <TimePicker value={value}
                    onChange={onChangetime} 
                    style={{width:"100%"}} />
                  </Grid>
                </Grid>
              </FormControl>
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
                onChange={handleQuestionTypeChange}
                style={{width:"30%"}} 
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
                    value: 'Image',
                    label: 'Image',
                  },
                ]}
              />
            </Grid>
              {/* Affichage du champ de téléchargement si "Image" est sélectionné comme type de question */}
{selectedResponseType === 'Image' && (
  <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
    <Typography variant="subtitle1" className={`${classes.label}`}>Télécharger une image<span className={classes.redAsterisk}>*</span></Typography>
    <CustomUpload />
  </Paper>
)}
            {/* Zone de saisie de la question */}
            <Grid item xs={12}>
            <Typography
  variant="subtitle1"
  className={`${classes.label}`}
  style={{ display: selectedResponseType === 'Image' ? 'none' : 'block' }}
>
  Question<span className={classes.redAsterisk}>*</span>
</Typography>
  <TextArea
    rows={3}
    placeholder="Question"
    value={question}
    onChange={handleQuestionChange}
    aria-label="Question"
    style={{ display: selectedResponseType === 'Image' ? 'none' : 'block' , width:"100%"}} // Condition pour masquer ou afficher la zone de texte
  />
</Grid>

          </Grid>
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
      onChange={handleQuestionTypeChange}
      style={{width:"30%"}} 
      options={[
        { value: 'Texte', label: 'Texte' },
        { value: 'Image', label: 'Image' },
      ]}
    />  
    {selectedResponseType === 'Image' && (
  <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
    <Typography variant="subtitle1" className={`${classes.label}`}>Télécharger une image<span className={classes.redAsterisk}>*</span></Typography>
    <CustomUpload />
  </Paper>
)}
 
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
         style={{ display: selectedResponseType === 'Image' ? 'none' : 'block',width:"100%" }} 
      />
      <Switch
        checked={reponse.isCorrect}
        onChange={() => handleCorrectChange(index)}
        color="primary"
        inputProps={{ 'aria-label': `Réponse correcte ${index + 1}` }}
      />
      <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`} >
        <CloseIcon />
      </IconButton>
    </div>
  </Paper>
))}
              <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee',width:180  }}  className={classes.addButton} aria-label="Ajouter réponse" onClick={handleAjouterReponse} >Ajouter Réponse</Button>
              </Paper> 
           
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          style={{ color: '#fff', backgroundColor: '#3987ee', width:200 }}
        >
         Nouvelle Question 
        </Button>
      </div>
      <Pagination current={current} onChange={onChangePage} total={50}  style={{textAlign: 'center',  marginTop: '20px' }}/>
      </Paper>
      <Button
          variant="contained"
          style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '10px' , width:100 }}
          onClick={handleAjouterQuestion}
        >
          Ajouter
        </Button>
    </Container>
  );
}
export default AjoutQuestion;
