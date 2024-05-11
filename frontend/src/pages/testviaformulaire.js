import React, { useState,useEffect } from 'react';
import { Steps, Button, message } from 'antd';
import { Input, Select ,Pagination, InputNumber,Modal} from 'antd';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import {  MenuItem,  FormControl,  IconButton , Switch} from '@mui/material';
import { TimePicker } from 'antd';
import { toast } from 'react-toastify';  
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import { Select as AntdSelect, Space } from 'antd';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
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
    paper: {
      padding: theme.spacing(3),
      borderRadius: theme.spacing(2), 
    },
  }));


const TestFormulaire = () => {
    const [currentStep, setCurrentStep] = useState(0);
    // const [language, setLanguage] = useState('');
    const [experience, setExperience] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');;
    const [current, setCurrent] = React.useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    // const [dateDialogOpen, setDateDialogOpen] = useState(false); 
    const classes = useStyles();
    const history = useHistory();
    const [formulaires, setFormulaires] = useState([[1]]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); 
    const [selectedResponseType, setSelectedResponseType] = useState('Texte');
    const [timeLeft, setTimeLeft] = useState(300); 
    const [isQuizStarted,setIsQuizStarted]=useState(false);
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
   

  //   //***********paramètre de quiz************

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
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    ///*******fin paramètre quiz **************/


    //********relation avec axios***************/
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedFormData = {
      ...formData,
      question_en: selectedLanguage === 'Anglais' ? formData.question : formData.question_en,
      question_fr: selectedLanguage === 'Francais' ? formData.question : formData.question_fr,
      answers: formData.answers.map(answer => ({
        answer_en: selectedLanguage === 'Anglais' ? answer.answer : answer.answer_en,
        answer_fr: selectedLanguage === 'Francais' ? answer.answer : answer.answer_fr,
        isCorrect: answer.isCorrect
      }))
    };
  
    const companyData = {
      title: title,
      description: description,
      level: experience === "beginner" ? 0 : experience === "intermediate" ? 1 : experience === "advanced" ? 2 : 3,
    };
  
    try {
      const [featureResponse, companyResponse] = await Promise.all([
        axios.post('http://localhost:3002/api/companytest', updatedFormData),
        axios.post('http://localhost:3002/api/company', companyData)
      ]);
      toast.success('Enregistré avec succès!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    
      // Rafraîchir la page après un court délai
      setTimeout(() => {
        window.location.reload();
      }, 5000); 
      console.log('Feature Response:', featureResponse.data);
      console.log('Company Response:', companyResponse.data);
      
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error);
      
    }
  };

 ////************fin axios ***********/



    const handleSelectChanges = (value) => {
    
      setFormData({
        ...formData,
        level: value
      });
    };
 
    const onChangePoints = (value) => {
      setFormData({
        ...formData,
        points: value
      });
    };
    const handleChangeTime = (time, timeString) => {
      // Convertir le temps en secondes
      const timeParts = timeString.split(':');
      const seconds = parseInt(timeParts[0], 10) * 3600 + parseInt(timeParts[1], 10) * 60;
      // Mettre à jour le state avec le temps en secondes
      setFormData({ ...formData, time: seconds });
    };
    
    const handleCompetenceChange = (event) => {
      setFormData({
        ...formData,
        skill: event.target.value
      });
    };
    
    const handleQuestionTypeChange = (value) => {
      setSelectedResponseType(value);
    };
    
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
  const handleQuestionChange = (e) => {
    setFormData({
      ...formData,
      question: e.target.value
    });
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

  const handleCorrectChange = (index) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    setFormData({
      ...formData,
      answers: updatedAnswers
    });
  };

  const onChange = (value) => {
    setSelectedType(value);
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

const handleSelectChange = (value) => {
  setSelectedLanguage(value);
};
const supprimerQuestion = (index) => {
  
  const nouvellesQuestions = [...formulaires[currentPage]];
  nouvellesQuestions.splice(index, 1);
  const nouvellesFormulaires = [...formulaires];
  nouvellesFormulaires[currentPage] = nouvellesQuestions;
  setFormulaires(nouvellesFormulaires);
};

  ////******paramètres de affichage content************ */
  const renderStep1 = () => (
    <>
           <Container maxWidth="lg">
           
           <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`} style={{marginTop:80}}>
            
           <Typography variant="h8" className={`${classes.label}`} >Titre de test<span className={classes.redAsterisk}>*</span></Typography>
          <Input
            placeholder="Titre du test"
            label="titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
           <Typography variant="h8" className={`${classes.label}`} >Description<span className={classes.redAsterisk}>*</span></Typography>
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 4 }}
            style={{ marginBottom: '1rem' }}
          />
          <Typography variant="h8" className={`${classes.label}`} >Expérience<span className={classes.redAsterisk}>*</span></Typography>
          <Select
            placeholder="Expérience"
            value={experience}
            onChange={(value) => setExperience(value)}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <Option value="" disabled>Choisir  Expérience</Option>
            <Option value="beginner">Débutant</Option>
            <Option value="intermediate">Intermédiaire</Option>
            <Option value="advanced">Avancé</Option>
            <Option value="Expert">Expert</Option>
          </Select>
         </Paper>
        </Container>
            </>
      );
  const renderStep2 = () => (
    <Container maxWidth="lg">
    {formulaires[currentPage].map((num, index) => (
       <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`} style={{marginTop:80}}>
     
           <div key={index}>
               <h4 style={{textAlign:'center'}}>Question N°: {num}</h4>
               <IconButton onClick={() => supprimerQuestion(index)} style={{float: 'right', marginTop: '-40px',color: 'red'}}>
                 <DeleteIcon />
               </IconButton>
               <Grid container spacing={2}>
                 <Grid item xs={12} sm={4}>
                       <FormControl fullWidth>
                       <Typography variant="h8" className={`${classes.label}`} >Points<span className={classes.redAsterisk}>*</span></Typography>
                       <Space wrap> 
                           <InputNumber min={1}
                           max={100000}
                           value={formData.points}
                           onChange={onChangePoints} 
                           style={{width:"100%"}}/>
                           </Space>
                       </FormControl>
                   </Grid>
                   <Grid item xs={12} sm={4}>
                       <FormControl fullWidth>
                       <Typography variant="h8" className={`${classes.label}`} >Temps<span className={classes.redAsterisk}>*</span></Typography>
                             <TimePicker 
                             value={formData.time ? moment.utc(formData.time * 1000) : null} 
                             onChange={handleChangeTime} 
                             style={{width:"100%"}} />
                       </FormControl>
                   </Grid>
                    <Grid item xs={12} sm={4}>
                     <Typography variant="h8" className={`${classes.label}`} >Compétence<span className={classes.redAsterisk}>*</span></Typography>
                        <Input 
                           placeholder="Choisir Compétence" 
                           style={{ width: "100%" }} 
                           value={formData.skill} 
                           onChange={handleCompetenceChange} 
                         />
                     </Grid>
                   <Grid container spacing={2} className={classes.spacing}>
                   <Grid item xs={12} sm={4}>
                     <Typography variant="h8" className={`${classes.label}`} >Langue<span className={classes.redAsterisk}>*</span></Typography>
                     <AntdSelect
                         placeholder="Choisir une Langue"
                         onChange={handleSelectChange}
                         style={{ width: "100%" }}
                       >
                         <Option value="Francais">Francais</Option>
                         <Option value="Anglais">Anglais</Option>
                         <Option value="Arabe"disabled>Arabe</Option>
                       </AntdSelect>
                     </Grid>
                       <Grid item xs={12}>
                           <FormControl className={`${classes.formControl} ${classes.expandedTextField}`} fullWidth>
                               <Typography variant="subtitle1" className={classes.label}>
                                   Type de Question<span className={classes.redAsterisk}>*</span>
                               </Typography>
                               <Select
                                   value={selectedType}
                                   onChange={handleTypeChange}
                                   displayEmpty
                                   style={{ width: "250px" }}
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

                 <Paper elevation={5} className={`${classes.paper} ${classes.spacing}`} style={{marginTop:80}}>
                         <Grid container spacing={2} className={classes.spacing}>
                               {/* Zone de saisie de la question */}
                               <Grid item xs={12}>
                                   <Typography
                                     variant="subtitle1"
                                     className={`${classes.label}`}
                                     style={{ display: selectedResponseType === 'Image' ? 'none' : 'block' }}
                                   >
                                     Question<span className={classes.redAsterisk}>*</span>
                                   </Typography>
                                         <Input.TextArea
                                               rows={3}
                                               placeholder="Question"
                                               value={formData.question}
                                               onChange={handleQuestionChange}
                                               aria-label="Question"
                                               style={{ display: 'block', width: "100%" }}
                                         />
                               </Grid>
                           {/* **************Zone de saisir réponse***************** */}
                         {formData.answers.map((answer, index) => (
                           <Paper key={index} elevation={3} className={`${classes.responseCard} ${classes.spacing}`} style={{ width: '100%' }}>
                             
                               <Typography variant="subtitle1" className={`${classes.label}`}>
                                 Réponse {index + 1}
                               </Typography>
                               <Typography variant="subtitle1" className={`${classes.label}`}>
                                 Type de Réponse <span className={classes.redAsterisk}>*</span>
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
                                   checked={answer.isCorrect}
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

                           {formData.answers.every(answer => !answer.isCorrect) && (
                             <Typography variant="subtitle1" className={`${classes.label}`} style={{ color: 'red' }}>
                               Veuillez sélectionner au moins une réponse correcte.
                             </Typography>
                           )}

                           <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee', width: 180 }}
                             className={classes.addButton} aria-label="Ajouter réponse" onClick={handleAjouterReponse} >
                             Ajouter Réponse
                           </Button>
                     </Grid>
                 </Paper>
               </Grid>
               
               <div style={{ textAlign: 'center', marginTop: '20px' }}>
                   <Button
                       variant="contained"
                       style={{ color: '#fff', backgroundColor: '#3987ee', width: 200 }}
                       onClick={ajouterFormulaire}
                   >
                       Nouvelle Question 
                   </Button>
               </div>
             
           </div>
       </Paper>

    ))}

   {/* <Pagination count={formulaires.length} page={currentPage + 1} onChange={(event, value) => setCurrentPage(value - 1)} /> */}
   {/* <Button
       variant="contained"
       style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '10px', width: 100,textAlign: 'center' }}
       onClick={handleSubmit}
   >
       Ajouter
   </Button> */}

</Container>

    );  

    const previewContent = () => (
      
        <div>
                    <p style={{ marginBottom: '20px' }}>Title: {title}</p>
                    <p>Description: {description}</p>
                    <p>Experience: {experience}</p>
                    <p>Compétence: {formData.skill}</p>
            <div>
            
                <h3>Questions: {formData.question}</h3>
                <ul>
                  {formData.answers.map(answer => {
                    if (!answer) return null; 
                    return (
                      <li key={answer.id} style={{ backgroundColor: answer.isCorrect ? 'green' : 'inherit' }}>
                        {selectedLanguage === 'Anglais' ? answer.answer_en : answer.answer_fr}
                      </li>
                    );
                  })}
                </ul>
            
            </div>
                <Button type="primary" 
                onClick={handleStartQuiz} 
                disabled={isQuizStarted}
                style={{ position: 'absolute', top: '20%', right: 50 }}>
                  Start Quiz
                </Button>
           
            <div>
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
                        <h3>Quiz Questions:</h3>
                        <h3>Timer: {formatTime()}</h3>
                        <p>Title: {title}</p>
                        <p>Description: {description}</p>
                        <p>Experience: {experience}</p>
                        <p>Compétence: {formData.skill}</p>
                        <h3>Question: {formData.question}</h3>
                      <ul>
                          {formData.answers.map(answer => {
                            if (!answer) return null;
                            return (
                              <li key={answer.id} style={{ backgroundColor: answer.isCorrect ? 'green' : 'inherit' }}>
                                {selectedLanguage === 'Anglais' ? answer.answer_en : answer.answer_fr}
                              </li>
                            );
                          })}
                        </ul>
                        <button type="button" className="danger" onClick={handleStopQuiz}>
                          Stop Quiz
                        </button>
                      </div>
                    )}
                    </Modal>
            </div>
        
        </div>
        
    );
  const steps = [
    { title: 'Paramètre du test', content: renderStep1() },
    { title: 'Ajouter test', content: renderStep2() },
    {
      title: 'apreçu_test',
      content: ( previewContent()),
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  

  return (
    <Container maxWidth="lg">
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[currentStep].content}</div>
      <div className="steps-action">
       
        
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
            Précédent
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Soumettre
          </Button>
        )}
         {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext} >
            Suivant
          </Button>
        )}
      </div>
   </Container>
  );
};

export default TestFormulaire;
