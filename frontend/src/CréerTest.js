import React, { useState,useEffect } from 'react';
import { Paper, Grid, Button, Typography, Dialog, DialogContent, DialogTitle, TextField, DialogActions, MenuItem, Select, FormControl, InputLabel, IconButton ,Container, Switch} from '@mui/material';
import { Steps, Button as AntButton } from 'antd';
import { Close } from '@mui/icons-material';
import StorageIcon from '@mui/icons-material/Storage';
import ArticleIcon from '@mui/icons-material/Article';
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker } from 'antd';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Select as AntdSelect , Space, InputNumber, Input,Pagination} from 'antd';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TimePicker } from 'antd';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import {  Table } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
const { Step } = Steps;
// const { RangePicker } = DatePicker;

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

  
function CréerTest() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
    const [value, setValue] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [current, setCurrent] = React.useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('');
    const [experience, setExperience] = useState('');
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
    const [createFromDB, setCreateFromDB] = useState(false);
    const { Option } = Select;
    const [selectedDomaine, setSelectedDomaine] = useState(null);
    const [competences, setCompetences] = useState([]);
    const [domaines, setDomaines] = useState([]);
    const [formData, setFormData] = useState({
      question: '',
      answers: [
        { answer_en: '', answer_fr: '', isCorrect: false }
      ]
    });
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

    const handleCompetenceChange =  async(value) => {
      setSelectedCompetence(value);
      console.log(value);
    };
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
      </Upload>);
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
    
  
    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
    };
  
    const handleQuestionChange = (event) => {
      setFormData({ ...formData, question: event.target.value });
    };
  
    const handleReponseChange = (index, event) => {
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        [selectedLanguage === 'Anglais' ? 'answer_en' : 'answer_fr']: event.target.value
      };
      setFormData({ ...formData, answers: updatedAnswers });
    };
  
    const handleCorrectChange = (index) => {
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        isCorrect: !updatedAnswers[index].isCorrect
      };
      setFormData({ ...formData, answers: updatedAnswers });
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
  
    const supprimerReponse = (index) => {
      const updatedAnswers = formData.answers.filter((_, i) => i !== index);
      setFormData({ ...formData, answers: updatedAnswers });
    };
    const handleQuestionTypeChange = (value) => {
      setSelectedResponseType(value);
    };
    const [selectedResponseType, setSelectedResponseType] = useState('Texte');
    
    const ajouterFormulaire = () => {
      const nouvellePage = [...formulaires[currentPage], formulaires[currentPage].length + 1];
      const nouvellesFormulaires = [...formulaires];
      nouvellesFormulaires[currentPage] = nouvellePage;
      setFormulaires(nouvellesFormulaires);
      console.log(setFormulaires)
  };
   
 
    const [selectedType, setSelectedType] = useState('');
  
  const onChange = (value) => {
    setSelectedType(value);
  };
  

const onSearch = (value) => {
  console.log('Searched:', value);
};
const filterOption = (input, option) => {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
 


const onChangetime = (time) => {
  setValue(time);
};


const onChangePage= (page) => {
  console.log(page);
  setCurrent(page);
};

// const handleCompetenceChange =  async(value) => {
//   setSelectedCompetence(value);
//   console.log(value);
// };
    const handleClickOpen = (createDB) => {
        setOpen(true);
        setCreateFromDB(createDB);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrent(0);
    };

    const handleDateDialogOpen = () => {
        setDateDialogOpen(true);
    };

    const handleDateDialogClose = () => {
        setDateDialogOpen(false);
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChanges = (time, timeString) => {
      console.log(time, timeString);
    };
    //paramétre de table dbSteps
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (value) => {
        setSelectedValue(value);
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;




    // Tableaux d'étapes pour les deux options

    const dbSteps = [
      {
        title: 'Paramètre du test',
        content: (
            <>
                <TextField
                    label="Titre du test"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="language-select-label">Langue</InputLabel>
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="fr">Français</MenuItem>
                        <MenuItem value="en">Anglais</MenuItem>
                        <MenuItem value="es">Espagnol</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="experience-label">Expérience</InputLabel>
                    <Select
                        labelId="experience-label"
                        id="experience-select"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    >
                        <MenuItem value="beginner">Débutant</MenuItem>
                        <MenuItem value="intermediate">Intermédiaire</MenuItem>
                        <MenuItem value="advanced">Avancé</MenuItem>
                    </Select>
                </FormControl>
               
               
            </>
            
            
        ),
      },
      {
          title: 'Ajout question',
          content: (
            
            <div>
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
                </Select>
                <div
        style={{
          marginBottom: 16,
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
          ),
      },
      // Ajoutez plus d'étapes au besoin
  ];
    
    const formSteps = [
        {
            

            title: 'Paramètre du test',
            content: (
                <>
                    <TextField
                        label="Titre du test"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="language-select-label">Langue</InputLabel>
                        <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="fr">Français</MenuItem>
                            <MenuItem value="en">Anglais</MenuItem>
                            <MenuItem value="es">Espagnol</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="experience-label">Expérience</InputLabel>
                        <Select
                            labelId="experience-label"
                            id="experience-select"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        >
                            <MenuItem value="beginner">Débutant</MenuItem>
                            <MenuItem value="intermediate">Intermédiaire</MenuItem>
                            <MenuItem value="advanced">Avancé</MenuItem>
                        </Select>
                    </FormControl>
                   
                   
                </>
                
                
            ),
        },
        {
            title: 'Ajout question',
            content: (
               <Container maxWidth="xl">
                    {formulaires[currentPage].map((num, index) => (
                        <div key={index}>
                            <h2>Questions N°: {num}</h2>
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
                                    
                                    {/* Zone de saisie de la question */}
                                  <Grid item xs={12}>
                                        <Typography
                                          variant="subtitle1"
                                          className={`${classes.label} ${classes.spacing}`}
                                          
                                        >
                                          Question<span className={classes.redAsterisk}>*</span>
                                        </Typography>
                                              <Input.TextArea
                                                    rows={3}
                                                    placeholder="Question"
                                                    value={question}
                                                    onChange={(e)=>setQuestion(e.target.value)}
                                                    aria-label="Question"
                                                    style={{ display: 'block', width: "100%" }}
                                          />
                                   </Grid>
                                   {/* Zone de saisie de la Réponse */}
                                   <Grid item xs={12}>
                                   {/* <Paper elevation={3} className={`${classes.paper} ${classes.spacing}`}> */}
                                        {formData.answers.map((answer, index) => (
                                      <Paper key={index} elevation={3} className={`${classes.responseCard} ${classes.spacing}`}>
                                          <Typography variant="subtitle1" className={`${classes.label}`} >
                                            Réponse {index + 1}
                                          </Typography>
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
                                        checked={formData.answers.isCorrect}
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
                                      {/* ****************ajouter réponse********************** */}
                                      <Button variant="contained" style={{ color: '#fff', backgroundColor: '#3987ee',width:180  }} 
                                      className={classes.addButton} aria-label="Ajouter réponse" onClick={handleAjouterReponse} >Ajouter Réponse
                                      </Button>
                                   {/* </Paper> */}
                                   </Grid>
                                </Grid>
                                
                            </Paper>
                            
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
                    ))}
                    
                    <Pagination count={formulaires.length} page={currentPage + 1} onChange={(event, value) => setCurrentPage(value - 1)} />
                    <Button
                        variant="contained"
                        style={{ color: '#fff', backgroundColor: '#3987ee', float: 'right', marginTop: '10px', width: 100 }}
                    >
                        Ajouter
                    </Button>
                </Container>
            ),
        },
        {
            title: 'Last',
            content: "",
        },
        
    ];
    let steps = createFromDB ? dbSteps : formSteps;
    return (
      <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
          AJOUTER VOTRE TEST DE COMPÉTENCE
      </Typography>
      <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <StorageIcon style={{ fontSize: '48px', color: '#1976d2' }} />
              <Button variant="contained" color="primary" fullWidth onClick={() => handleClickOpen(true)}>
                  CRÉER À PARTIR DE NOTRE BASE DE DONNÉES
              </Button>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <ArticleIcon style={{ fontSize: '48px', color: '#1976d2' }} />
              <Button variant="contained" color="primary" fullWidth onClick={() => handleClickOpen(false)}>
                  CRÉER À PARTIR D'UN FORMULAIRE
              </Button>
          </Grid>
      </Grid>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="xl"
          fullWidth={true}
      >
          <DialogTitle id="form-dialog-title">
              Paramètre du test
              <IconButton aria-label="close" style={{ position: 'absolute', right: 10, top: 10 }} onClick={handleClose}>
                  <CloseIcon />
              </IconButton>
          </DialogTitle>
          <DialogContent>
              <Steps current={current}>
                  {steps.map(item => (
                      <Step key={item.title} title={item.title} />
                  ))}
              </Steps>
              <div style={{ marginTop: 16 }}>
                  {steps[current] && steps[current].content}
              </div>
          </DialogContent>
          <DialogActions>
              <AntButton disabled={current === 0} onClick={prev}>
                  Précédent
              </AntButton>
              <AntButton onClick={next}>
                  {current === steps.length - 1 ? 'Terminé' : 'Suivant'}
              </AntButton>
          </DialogActions>
      </Dialog>
  </Paper>
    );
}

export default CréerTest;