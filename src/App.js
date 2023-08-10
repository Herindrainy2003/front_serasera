import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
// import firebase from "../firebase"; 
// import './install'; 
import Contact from './Contact';
import { Paper } from '@mui/material';
import carouselImage1 from './images/sary.jpg';
import carouselImage2 from './images/pic.jpg';
import carouselImage3 from './images/Lame.jpg';
import logoImage from './images/logo.png';
import MenuIcon from '@mui/icons-material/Menu'; // Importez l'icône MenuIcon depuis Material-UI


import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Card,
  CardMedia,
  CardHeader,
  MenuItem,
  CardContent,

  Select,
  Tooltip,
  Grid,
  Box,
  Drawer, 
  List,
  ListItem, 
 
  ListItemText,
  IconButton ,
} from '@mui/material';

// Importez également le composant SinglePage
import SinglePage from './SinglePage'; // Assurez-vous de remplacer le chemin d'accès approprié si nécessaire
// import Contact from './Contact'

import PublicitesPage from './PublicitesPage'; // Assurez-vous de fournir le bon chemin d'accès
function App() {
  const [categories, setCategories] = useState([]);
    // Ajoutez ici d'autres catégories prédéfinies si nécessaire
    const [selectedCategoryHeader, setSelectedCategoryHeader] = useState('');
    
    const handleAccueilClick = () => {
      setAfficherPublicites(false); // Masquer les publicités
      setAfficherContact(false);//masquer les formualaires
      setShowForm(true); // Afficher le formulaire
      setFilteredTasks([]); // Réinitialiser la liste des produits affichés
    };
   
   
    //responsve

  const [allCategories, setAllCategories] = useState([]);
  // Avant le retour de la fonction App()

const [isMobileView, setIsMobileView] = useState(false);
const [menuOpen, setMenuOpen] = useState(false); // Ajouter l'état pour contrôler l'ouverture/fermeture du menu

 
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    nomPisera: '',
    nomSera: '',
    descriptionSera: '',
    prix: '',
    contact: '',
    photo: null,
    categories: '',
  });
 
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState([]);
 //contact
  const [afficherContact, setAfficherContact] = useState(false); // Ajoutez l'état pour afficher les contact
  //espaces pubs 

const [afficherPublicites, setAfficherPublicites] = useState(false); // Ajoutez l'état pour afficher les publicités
// //photos 
// const handleTakePhoto = async () => {
//   try {
//     // Ouvrir l'appareil photo en utilisant l'API MediaDevices
//     const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

  
   

//     // Laisser l'utilisateur prendre une photo en cliquant sur le bouton dans la fenêtre contextuelle
//     const takePhotoButton = document.createElement('button');
//     takePhotoButton.innerText = 'Prendre une photo';
//     takePhotoButton.onclick = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = videoElement.videoWidth;
//       canvas.height = videoElement.videoHeight;
//       canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);

//       // Convertir la photo en URL de données
//       const photoUrl = canvas.toDataURL();
//       console.log('URL de la photo:', photoUrl);

//       // Fermer la fenêtre contextuelle après avoir pris la photo
//       popup.close();
//     };

//     popup.document.body.appendChild(takePhotoButton);
//   } catch (error) {
//     console.error('Erreur lors de l\'accès à l\'appareil photo:', error);
//   }
// };
  useEffect(() => {
    fetchTasks(); // Charger toutes les tâches au chargement initial de la page
    fetchCategories();
  }, []);
  
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/categories');
      const data = await response.json();
      setCategories(data);
      setAllCategories(data); // Définir les catégories dans le header
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
 
 
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  const handleCategoryHeaderChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'Contact') {
      setAfficherContact(true);
      setAfficherContact(!afficherContact); // Inversez l'état
    setAfficherPublicites(false); // Réinitialisez l'état d'affichage des publicités
      setShowForm(false);
      setSelectedCategoryHeader('');
      setSelectedCategory(null); // Réinitialiser la catégorie sélectionnée
      setFilteredTasks([]); // Réinitialiser la liste filtrée
    }
   else if (selectedValue === 'espacesPubs') {
      setAfficherPublicites(true);
      setShowForm(false);
      setSelectedCategoryHeader('');
      setSelectedCategory(null); // Réinitialiser la catégorie sélectionnée
      setFilteredTasks([]); // Réinitialiser la liste filtrée
      setAfficherPublicites(!afficherPublicites); // Inversez l'état
      setAfficherContact(false); // Réinitialisez l'état d'affichage du contact
    } else if (selectedValue === 'accueil') {
      setAfficherPublicites(false);
      setShowForm(true);
      setSelectedCategoryHeader('');
      setFilteredTasks([]); // Réinitialiser la liste filtrée
    } else if (selectedValue === 'categories') {
      setAfficherPublicites(false);
      setSelectedCategoryHeader(selectedValue);
      setSelectedCategory(null); // Réinitialiser la catégorie sélectionnée
      setShowForm(false);
      setFilteredTasks([]); // Réinitialiser la liste filtrée
    } else {
      setAfficherPublicites(false);
      setSelectedCategoryHeader(selectedValue);
      setSelectedCategory(selectedValue);
      fetchFilteredTasks(parseInt(selectedValue));
      setShowForm(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataWithImage = new FormData();
     
      formDataWithImage.append('nomPisera', formData.nomPisera);
      formDataWithImage.append('nomSera', formData.nomSera);
      formDataWithImage.append('descriptionSera', formData.descriptionSera);
      formDataWithImage.append('prix', formData.prix);
      formDataWithImage.append('contact', formData.contact);
      formDataWithImage.append('photo', formData.photo);
      formDataWithImage.append('categories', selectedCategory); // Utiliser l'ID de la catégorie sélectionnée
  
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        body: formDataWithImage,
      });
  
      const data = await response.json();
      setTasks([...tasks, data]);
      setFormData({
        nomPisera: '',
        nomSera: '',
        descriptionSera: '',
        prix: '',
        contact: '',
        photo: null,
        categories: '',
      });
      setShowTooltip(true);
    } catch (error) {
      console.error('Error inserting task:', error);
    }
  };
  

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };



if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./front_serasera/src/service-worker.js')
      .then(registration => {
        console.log('Service Worker enregistré avec succès:', registration);
      })
      .catch(error => {
        console.log('Échec de l\'enregistrement du Service Worker:', error);
      });
  });
}
  const handleCategoryChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);

    if (selectedValue !== '') {
      fetchFilteredTasks(parseInt(selectedValue));
    } else {
      fetchTasks(); // Charger toutes les tâches lorsque "Toutes les catégories" est sélectionné
    }
  };
  

  const fetchFilteredTasks = async (categoryId) => {
    try {
      let response;
      if (categoryId === null) {
        response = await fetch('http://localhost:5000/tasks'); // Charger toutes les tâches sans filtre de catégorie
      } else {
        response = await fetch(`http://localhost:5000/tasks?category=${categoryId}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  // // Fonction pour ajouter une nouvelle catégorie
  // const handleNewCategorySubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formDataWithImage = new FormData();
  //     formDataWithImage.append('name', formData.newCategory);

  //     const response = await fetch('http://localhost:5000/categories', {
  //       method: 'POST',
  //       body: formDataWithImage,
  //     });

  //     const newCategory = await response.json();
  //     setCategories([...categories, newCategory]);
  //     setCategoryIdCounter(categoryIdCounter + 1);
  //     setFormData({ ...formData, categories: newCategory.id, newCategory: '' });
  //   } catch (error) {
  //     console.error('Error inserting category:', error);
  //   }
  // };
  const formClass = showForm ? '' : 'hidden';
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 600);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);


    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  return (
    
      <div>
     
     
        {/* Header */}
        <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <img src={logoImage} alt="Logo" style={{ height: '80px' }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobileView ? (
  // Affichez le bouton de menu
  <IconButton
    color="inherit"
    aria-label="Menu"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <MenuIcon />
  </IconButton>
            ) : (
             
              // Sinon, affichez les éléments directement
              <>
                <Button color="inherit" onClick={handleAccueilClick}>
                  Accueil
                </Button>
                <Button color="inherit"   
                  onClick={() =>
                    handleCategoryHeaderChange({
                      target: { value: 'Contact' }
                    })
                  }>Contact</Button>
                <Button
                  color="inherit"
                  onClick={() =>
                    handleCategoryHeaderChange({
                      target: { value: 'espacesPubs' }
                    })
                  }
                >
                  Espaces Pubs
                </Button>
                <Select
                  value={selectedCategoryHeader}
                  onChange={handleCategoryHeaderChange}
                  displayEmpty
                  variant="outlined"
                  margin="dense"
                  // value="Les categories"
                >
                
                  <MenuItem value="categories">Les catégories</MenuItem>
                  {allCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
       {/* Drawer pour le menu mobile */}
       <Drawer
  anchor="left"
  open={menuOpen}
  onClose={() => setMenuOpen(false)} // Fermez le Drawer lorsque l'utilisateur clique à l'extérieur
 
>
        <List>
        <ListItem button onClick={() => setMenuOpen(false)}>
          <ListItem button onClick={handleAccueilClick}>
            <ListItemText primary="Accueil" />
          </ListItem>
          </ListItem>
          <ListItem >
          <ListItem button onClick={() => setMenuOpen(false)}>
          <ListItem   color="inherit"
                  onClick={() =>
                    handleCategoryHeaderChange({
                      target: { value: 'Contact' }
                    })
                  } >
            <ListItemText primary="Contact" />
          </ListItem>
          </ListItem>
          </ListItem>
          <ListItem button onClick={() => setMenuOpen(false)}>
          <ListItem   color="inherit"
                  onClick={() =>
                    handleCategoryHeaderChange({
                      target: { value: 'espacesPubs' }
                    })
                  } >
            <ListItemText primary="Espaces pubs" />
          </ListItem>
          </ListItem>
          <ListItem button onClick={() => setMenuOpen(false)}>
          <ListItem >
           
          <Select
                  value={selectedCategoryHeader}
                  onChange={handleCategoryHeaderChange}
                  displayEmpty
                  variant="outlined"
                  margin="dense"
                  name="categories"
                >
                  <MenuItem value="">Les catégories</MenuItem>
                  {allCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
          </ListItem>
          </ListItem>
        </List>
      </Drawer>
      {/* Carousel */}
      <Carousel
        animation="slide"
        autoPlay={true}
        indicators={true}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{ style: { background: 'transparent' } }}
        timeout={500}
      >
        <Paper>
          <img src={carouselImage1} alt="Carousel 1" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          
        </Paper>
        <Paper>
          <img src={carouselImage2} alt="Carousel 2"style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        </Paper>
        <Paper>
          <img src={carouselImage3} alt="Carousel 3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        </Paper>
        {/* Add more Paper components for additional carousel images */}
      </Carousel>
      {/* Contenu */}
     

      <Container>
     
      {showForm ? (
        
        <form className={`form ${formClass}`} onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6}>
          <TextField
            label="Anarana Pisera"
            fullWidth
            margin="normal"
            name="nomPisera"
            value={formData.nomPisera}
            onChange={handleChange}
            style={{ Width: 400 }}
          />
          <TextField
            label="Anaran'ny Sera"
            fullWidth
            margin="normal"
            name="nomSera"
            value={formData.nomSera}
            onChange={handleChange}
            // Définir la largeur ici (50% de la largeur du conteneur ou une valeur fixe)
            style={{ Width: 400 }}
         />
          <TextField
            label="Mombamoban'ny  Sera"
            fullWidth
            margin="normal"
            name="descriptionSera"
            value={formData.descriptionSera}
            onChange={handleChange}
            style={{ Width: 400 }}
          />
       <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            variant="outlined"
            margin="dense"
            name="categories"
            style={{ Width: 400 }}
          >
            <MenuItem value="">Les catégories</MenuItem>
          
            {categories.map((categories) => (
              <MenuItem key={categories.id} value={categories.id}>
                {categories.name}
              </MenuItem>
              
            ))}
           
          </Select>

          <TextField
            label="Prix"
            fullWidth
            margin="normal"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            style={{Width: 400 }}
          />
          <TextField
            label="Contact"
            fullWidth
            margin="normal"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            style={{Width: 400 }}
          />
          <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })} />
        
          <Button variant="contained" color="primary" type="submit">
            Asera
          </Button>
          </Grid>
            </Grid>
        </form>  
   
        ): (
          <SinglePage filteredTasks={filteredTasks} /> // Pass the filteredTasks state as a prop
          
          )}
          <div>
            {filteredTasks.map((task) => (
            <div key={task.id}>
              <p>Nom: {task.nomSera}</p>
              <p>Description: {task.descriptionSera}</p>
              {/* Affichez d'autres informations sur la tâche ici */}
            </div>
          ))}
        </div>
               {/* Conteneur pour afficher les tâches */}
   <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}>
          {afficherContact ? (
        <Contact />
      ) :
          afficherPublicites ? (
            <PublicitesPage />
           
          ) : (
            Array.isArray(tasks) &&
            tasks.map((task) => (
              <Tooltip
                
                open={showTooltip && task.id === showTooltip}
                onClose={() => setShowTooltip(false)}
                placement="right"
                arrow
              >
                  <Card key={task.id} style={{ margin: '16px', width: '300px', boxShadow: 'rgba(0, 0, 0, 1) 0px 3px 10px' }}>
                
               
                  <CardMedia
                    component="img"
                    height="240"
                    image={`http://localhost:5000/images/${task.photo}`}
                    alt={task.nomsera}
                  />
                  <CardContent>
                  <CardHeader title={task.nomsera} />
                    <Typography variant="body2" color="text.secondary">
                      Contact: {task.contact}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {task.descriptionsera}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Prix: {task.prix}
                    </Typography>
                  </CardContent>
                 
               </Card>
               </Tooltip>
               ))
             )}
           </div>
         </Container>
       </div>
     );
   }
   


export default App;