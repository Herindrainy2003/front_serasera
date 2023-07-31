import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import carouselImage1 from './images/sary.jpg';
import carouselImage2 from './images/pic.jpg';
import carouselImage3 from './images/Lame.jpg';
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
  CardActions,
  Select,
  Tooltip,
} from '@mui/material';
// Importez également le composant SinglePage
import SinglePage from './SinglePage'; // Assurez-vous de remplacer le chemin d'accès approprié si nécessaire

function App() {
  const [categories, setCategories] = useState([]);
    // Ajoutez ici d'autres catégories prédéfinies si nécessaire
    const [selectedCategoryHeader, setSelectedCategoryHeader] = useState('');
    
  const [allCategories, setAllCategories] = useState([]);
  // Avant le retour de la fonction App()
const [formHovered, setFormHovered] = useState(false);


  const [categoryIdCounter, setCategoryIdCounter] = useState(3); // Compteur pour l'ID de la prochaine catégorie
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
    setSelectedCategoryHeader(selectedValue);
    
    console.log('ID de la catégorie sélectionnée dans le header:', selectedValue);
  
    if (selectedValue !== '') {
      fetchFilteredTasks(parseInt(selectedValue));
      setShowForm(false); // Masquer le formulaire lorsque la catégorie est sélectionnée
     
    } else {
      setShowForm(true); // Afficher le formulaire lorsque "Toutes les catégories" est sélectionné
      setFilteredTasks([]); // Réinitialiser la liste des produits affichés
      fetchTasks(); // Charger toutes les tâches lorsque "Toutes les catégories" est sélectionné
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

  const handleHiseraButtonClick = (taskId) => {
  if (!formHovered) {
    setShowForm((prevShowForm) => !prevShowForm); // Afficher ou masquer le formulaire lorsqu'on clique sur "Seraina"
  }
  setShowTooltip(taskId); // Afficher la tooltip pour indiquer quel élément a été cliqué
};

  
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
      const response = await fetch(`http://localhost:5000/tasks?category=${categoryId}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching filtered tasks:', error);
    }
  };
  

  // Fonction pour ajouter une nouvelle catégorie
  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('name', formData.newCategory);

      const response = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        body: formDataWithImage,
      });

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setCategoryIdCounter(categoryIdCounter + 1);
      setFormData({ ...formData, categories: newCategory.id, newCategory: '' });
    } catch (error) {
      console.error('Error inserting category:', error);
    }
  };
  const formClass = showForm ? '' : 'hidden';

  return (
    
      <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SERA2</Typography>
          <Button color="inherit">Accueil</Button>
          <Button color="inherit">Contact</Button>
          <Select
  value={selectedCategoryHeader}
  onChange={handleCategoryHeaderChange} // Utilisation de la nouvelle fonction pour gérer le changement de catégorie
  displayEmpty
  variant="outlined"
  margin="dense"
  name="categories"
>
  <MenuItem value="">Toutes les catégories</MenuItem>
  {allCategories.map((category) => (
    <MenuItem key={category.id} value={category.id}>
      {category.name}
    </MenuItem>
  ))}
</Select>

        </Toolbar>
      </AppBar>
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
          <TextField
            label="Anarana Pisera"
            fullWidth
            margin="normal"
            name="nomPisera"
            value={formData.nomPisera}
            onChange={handleChange}
          />
          <TextField
            label="Anaran'ny Sera"
            fullWidth
            margin="normal"
            name="nomSera"
            value={formData.nomSera}
            onChange={handleChange}
            // Définir la largeur ici (50% de la largeur du conteneur ou une valeur fixe)
           
         />
          <TextField
            label="Mombamoban'ny  Sera"
            fullWidth
            margin="normal"
            name="descriptionSera"
            value={formData.descriptionSera}
            onChange={handleChange}
        
          />
       <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
            variant="outlined"
            margin="dense"
            name="categories"
          >
            <MenuItem value="">Toutes les catégories</MenuItem>
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
          />
          <TextField
            label="Contact"
            fullWidth
            margin="normal"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })} />
          <Button variant="contained" color="primary" type="submit">
            Asera
          </Button>
        </form>  
         
        ): (
          <SinglePage filteredTasks={filteredTasks} /> // Pass the filteredTasks state as a prop
          
          )}
         
          <div>
            
          <h1>Produits de la catégorie sélectionnée</h1>
          {filteredTasks.map((task) => (
            <div key={task.id}>
              <p>Nom: {task.nomSera}</p>
              <p>Description: {task.descriptionSera}</p>
              {/* Affichez d'autres informations sur la tâche ici */}
            </div>
          ))}
        </div>
    
          
    
               {/* Conteneur pour afficher les tâches */}
               <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}/>

               <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}>
  {Array.isArray(tasks) &&
    tasks.map((task) => (
              <Tooltip
                key={task.id}
                title={
                  <div style={{ maxWidth: '300px', padding: '10px' }}>
                    <form onSubmit={handleHiseraButtonClick}>
                    <TextField
                        label="Nom"
                        fullWidth
                        margin="normal"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Contact"
                        fullWidth
                        margin="normal"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                      />
                      <Button variant="contained" color="primary" type="submit">
                        Hisera
                      </Button>
                    </form>
                  </div>
                }
                open={showTooltip && task.id === showTooltip}
                onClose={() => setShowTooltip(false)}
                placement="right"
                arrow
              >
                <Card key={task.id} style={{ margin: '16px', width: '300px' }}>
                  <CardMedia
                    component="img"
                    height="280"
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
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => setShowTooltip(task.id)}>
                      Seraina
                    </Button>
                  </CardActions>
                </Card>
              </Tooltip>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default App;

