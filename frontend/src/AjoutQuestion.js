import React, { useState} from 'react';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { Select as AntdSelect , Space, InputNumber, TimePicker,Input} from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd'; 
import { Container, Typography, Button, FormControl, Grid, IconButton, Paper, Switch } from '@material-ui/core';
import { Select } from 'antd';
import moment from 'moment'; 
import { toast } from 'react-toastify';

const { Option } = Select;
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
  const [errors, setErrors] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const classes = useStyles();
  const [selectedResponseType, setSelectedResponseType] = useState('Texte'); 
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    class: '',
    skill: '',
    question_en: '',
    question_fr: '',
    level: '',
    points: '',
    time: '',
    answers: [{ answer_en: '', answer_fr: '', isCorrect: false },
              { answer_en: '', answer_fr: '', isCorrect: false }]  
  });

  
  // ******** Les controles pour les champs vides****************
 
  const validateFields = () => {
    let fieldErrors = {};
    if (!formData.skill) fieldErrors.skill = "Le champ Compétence est obligatoire";
    if (!formData.points) fieldErrors.points = "Le champ Points est obligatoire";
    if (!formData.time) fieldErrors.time = "Le champ Temps est obligatoire";
    if (!formData.question) fieldErrors.question = "Le champ Question est obligatoire";
    if (formData.answers.some(answer => !answer.answer_fr && !answer.answer_en)) {
      fieldErrors.answers = "Tous les champs de réponse sont obligatoires";
    }
    if (!formData.answers.some(answer => answer.isCorrect)) {
      fieldErrors.answers = "Veuillez sélectionner au moins une réponse correcte.";
    }
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // **************Fin des controlles************
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
    const updatedFormData = {
      ...formData,
      question_en: selectedLanguage === 'Anglais' ? formData.question : formData.question_en,
      question_fr: selectedLanguage === 'Francais' ? formData.question : formData.question_fr,
      answers: formData.answers.map(answer => ({
        answer_en: selectedLanguage === 'Anglais' ? answer.answer_en : answer.answer_en,
        answer_fr: selectedLanguage === 'Francais' ? answer.answer_fr : answer.answer_fr,
        isCorrect: answer.isCorrect
      }))
    };
  
    try {
      const response = await axios.post('http://localhost:3002/api/transferCode', updatedFormData);
      console.log(response.data);
      const questionId = response.data._id;
      handleAjouterQuestion(questionId);
      
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  }
  };

 

  // Gestionnaire pour le changement du type de réponse
  const handleQuestionTypeChange = (value) => {
    setSelectedResponseType(value);
  };
 
  const handleCorrectChange = (index) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    setFormData({
      ...formData,
      answers: updatedAnswers
    });
  };
  
 
  const supprimerReponse = (index) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers.splice(index, 1);
    setFormData({
      ...formData,
      answers: updatedAnswers
    });
  };
  const handleAjouterReponse = () => {
    setFormData({
      ...formData,
      answers: [
        ...formData.answers,
        { answer_en: '', answer_fr: '', isCorrect: false } 
      ]
    });
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
  const handleAjouterQuestion = (questionId) => {
    console.log('Question ajoutée avec succès !');
    toast.success('Question ajoutée avec succès !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, 
    });

    // Attendre que le toast disparaisse avant de rafraîchir la page
    // setTimeout(() => {
    //     window.location.reload();
        
    // }, 3000); // Temps d'attente pour 'autoClose'
};
const onChange = (value) => {
  console.log(`Selected: ${value}`);
};
  const handleDomaineChange = (event) => {
    setFormData({
      ...formData,
      class: event.target.value
    });
  };
  const handleCompetenceChange = (event) => {
    setFormData({
      ...formData,
      skill: event.target.value
    });
  };
  const handleSelectChange = (value) => {
    setSelectedLanguage(value);
  };
 

  const handleSelectChanges = (value) => {
    
    setFormData({
      ...formData,
      level: value
    });
  };

  const handleQuestionChange = (e) => {
    setFormData({
      ...formData,
      question: e.target.value
    });
  };
  const handleQuestionChanges = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [selectedLanguage === 'Francais' ? 'question_en' : 'question_fr']: value
    }));
  };
  
  const handleReponseChange = (index, e) => {
    const updatedAnswers = formData.answers.map((answer, idx) => {
      if (idx === index) {
        return selectedLanguage === 'Anglais'
          ? { ...answer, answer_en: e.target.value }
          : { ...answer, answer_fr: e.target.value };
      }
      return answer;
    });
  
    setFormData({ ...formData, answers: updatedAnswers });
  };
  //***pour traduction  */
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

const onChangePoints = (value) => {
  setFormData({
    ...formData,
    points: value
  });
};
const handleChangeTime = (time, timeString) => {
  // Convertir le temps en secondes, y compris les secondes
  const timeParts = timeString.split(':');
  const hours = parseInt(timeParts[0], 10) || 0; 
  const minutes = parseInt(timeParts[1], 10) || 0; 
  const seconds = parseInt(timeParts[2], 10) || 0; 
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  // Mettre à jour le state avec le temps en secondes
  setFormData({ ...formData, time: totalSeconds });
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
    beforeUpload={() => false} 
    onChange={handleUpload}
    multiple={false} 
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
                  <Typography variant="h8" className={`${classes.label}`}>Langue<span className={classes.redAsterisk}>*</span></Typography>
                  <AntdSelect
                    placeholder="Choisir une Langue"
                    onChange={handleSelectChange}
                    style={{ width: "100%" }}
                  >
                    <Option value="Francais">Francais</Option>
                    <Option value="Anglais">Anglais</Option>
                    <Option value="Arabe" disabled>Arabe</Option>
                  </AntdSelect>
                  {errors.language && <Typography color="error">{errors.language}</Typography>}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h8" className={`${classes.label}`}>Domaine<span className={classes.redAsterisk}>*</span></Typography>
                  <Input 
                    placeholder="Choisir Domaine" 
                    style={{ width: "100%" }} 
                    value={formData.className} 
                    onChange={handleDomaineChange} 
                  />
                  {errors.className && <Typography color="error">{errors.className}</Typography>}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h8" className={`${classes.label}`}>Compétence<span className={classes.redAsterisk}>*</span></Typography>
                  <Input 
                    placeholder="Choisir Compétence" 
                    style={{ width: "100%" }} 
                    value={formData.skill} 
                    onChange={handleCompetenceChange} 
                  />
                  {errors.skill && <Typography color="error">{errors.skill}</Typography>}
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
                  onChange={handleSelectChanges}
                  style={{ width: "50%" }}
                >
                  <Option value={0}>Débutant</Option>
                  <Option value={1}>Intermédiaire</Option>
                  <Option value={2}>Avancé</Option>
                  <Option value={3}>Expert</Option>
                </AntdSelect>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                <Typography variant="subtitle1" className={`${classes.label}`}>Points<span className={classes.redAsterisk}>*</span></Typography>
                <Space wrap> 
                  <InputNumber 
                    min={1}
                    max={100000}
                    value={formData.points}
                    onChange={onChangePoints} 
                    style={{ width: "100%" }}
                  />
                  {errors.points && <Typography color="error">{errors.points}</Typography>}
                </Space>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl className={`${classes.formControl} ${classes.spacing}`} fullWidth>
                <Typography variant="subtitle1" className={`${classes.label}`}>Temps<span className={classes.redAsterisk}>*</span></Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TimePicker 
                      value={formData.time ? moment.utc(formData.time * 1000) : null}
                      onChange={handleChangeTime}
                      style={{ width: "100%" }}
                    />
                    {errors.time && <Typography color="error">{errors.time}</Typography>}
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
          <Grid container spacing={2} className={`${classes.spacing}`}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={`${classes.label}`}>Type de Question<span className={classes.redAsterisk}>*</span></Typography>
              <AntdSelect
                placeholder="Choisir Type"
                optionFilterProp="children"
                onChange={handleQuestionTypeChange}
                style={{ width: "30%" }}
                options={[
                  { value: 'Texte', label: 'Texte' },
                  { value: 'QCM', label: 'QCM', disabled: true },
                  { value: 'Vrai/Faux', label: 'Vrai/Faux', disabled: true },
                  { value: 'Image', label: 'Image', disabled: true },
                ]}
              />
            </Grid>
            {selectedResponseType === 'Image' && (
              <Paper elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
                <Typography variant="subtitle1" className={`${classes.label}`}>Télécharger une image<span className={classes.redAsterisk}>*</span></Typography>
                <CustomUpload />
              </Paper>
            )}
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
                value={formData.question}
                onChange={handleQuestionChange}
                aria-label="Question"
                style={{ display: 'block', width: "100%" }}
              />
              {errors.question && <Typography color="error">{errors.question}</Typography>}
            </Grid>
          </Grid>
          {formData.answers.map((answer, index) => (
            <Paper key={index} elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
              <Typography variant="subtitle1" className={`${classes.label}`}>Réponse {index + 1}</Typography>
              <Typography variant="subtitle1" className={`${classes.label}`}>Type de Réponse <span className={classes.redAsterisk}>*</span></Typography>
              <AntdSelect
                placeholder="Choisir Type"
                optionFilterProp="children"
                onChange={handleQuestionTypeChange}
                style={{ width: "30%" }}
                options={[
                  { value: 'Texte', label: 'Texte' },
                  { value: 'Image', label: 'Image', disabled:true },
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
                  value={selectedLanguage === 'Anglais' ? formData.answers[index].answer_en : formData.answers[index].answer_fr}
                  onChange={(e) => handleReponseChange(index, e)}
                  className={`${classes.formControl} ${classes.spacing}`}
                  aria-label={`Réponse ${index + 1}`}
                  style={{ display: selectedResponseType === 'Image' ? 'none' : 'block', width: "100%" }}
                />
                <Switch
                  checked={formData.answers[index].isCorrect}
                  onChange={() => handleCorrectChange(index)}
                  color="primary"
                  inputProps={{ 'aria-label': `Réponse correcte ${index + 1}` }}
                />
                <IconButton onClick={() => supprimerReponse(index)} aria-label={`Supprimer réponse ${index + 1}`}>
                  <CloseIcon />
                </IconButton>
              </div>
              {errors.answers && <Typography color="error">{errors.answers}</Typography>}
              {formData.answers.every(answer => !answer.isCorrect) && (
                <Typography variant="subtitle1" className={`${classes.label}`} style={{ color: 'red' }}>
                  Veuillez sélectionner au moins une réponse correcte.
                </Typography>
              )}
            </Paper>
          ))}
          <Button
            variant="contained"
            style={{ color: '#fff', backgroundColor: '#3987ee', width: 180 }}
            className={classes.addButton}
            aria-label="Ajouter réponse"
            onClick={handleAjouterReponse}
          >
            Ajouter Réponse
          </Button>
        </Paper>
      </Paper>
                                {/* ********** traduction question************** */}
      <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`} style={{marginTop:50}}>
            <Typography variant="h7" className={`${classes.label}`} style={{ color: "#3987ee" }} gutterBottom>Traduire Question<span className={classes.redAsterisk}>*</span></Typography>
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
                    value: 'Texte',
                    label: 'Texte',
                  },
                  {
                    value: 'Code',
                    label: 'Code',
                    disabled:true
                  },
                  {
                    value: 'Image',
                    label: 'Image',
                    disabled:true
                  },
                ]}
              />
            </Grid>
            {/* Zone de saisie de la question */}
            <Grid item xs={12}>
            <Typography variant="subtitle1" className={`${classes.label}`} >Question<span className={classes.redAsterisk}>*</span></Typography>
            <TextArea rows={3} 
                placeholder="Question"
                
                value={selectedLanguage === 'Francais' ? formData.question_en : formData.question_fr}
                onChange={handleQuestionChanges}
                aria-label="Question"
                />
            </Grid>
          </Grid>
        </Paper>
       
        {formData.answers.map((answer, index) => (
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
                      { value: 'Image', label: 'Image', disabled:true},
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
                  value={selectedLanguage === 'Francais' ? formData.answer_en : formData.answer_fr}
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
               </Button>
            </Paper>
        ))}
      </Paper>
      
      <Button
          variant="contained"
          style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '10px' , width:100 }}
            onClick={handleSubmit}
           >
          Ajouter
      </Button>
    </Container>
    
  );
}
export default AjoutQuestion;
