import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, CardHeader, Typography, Container, TextField, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    nomPisera: '',
    nomSera: '',
    descriptionSera: '',
    prix: '',
    contact: '',
    photo: null,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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
      });
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

  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SERASERA</Typography>
          <Button color="inherit">Accueil</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      {/* Contenu */}
      <Container>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Nom Pisera"
            fullWidth
            margin="normal"
            name="nomPisera"
            value={formData.nomPisera}
            onChange={handleChange}
          />
          <TextField
            label="Nom Sera"
            fullWidth
            margin="normal"
            name="nomSera"
            value={formData.nomSera}
            onChange={handleChange}
          />
          <TextField
            label="Description Sera"
            fullWidth
            margin="normal"
            name="descriptionSera"
            value={formData.descriptionSera}
            onChange={handleChange}
          />
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

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}>
     
        {Array.isArray(tasks) &&
  tasks.map((task) => (
   
   <Card key={task.id} style={{ margin: '16px', width: '300px' }}>
      <CardMedia
        component="img"
        height="280"
        image={`http://localhost:5000/images/${task.photo}`} // Assurez-vous que le chemin d'accès est correct
        alt={task.nomSera}
      />
      <CardHeader title={task.nomsera} /> {/* Affiche le nomSera dans le titre de la carte */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         <h10> Contact: </h10> {task.contact}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {task.descriptionsera}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prix: {task.prix}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Seraina
        </Button>
      </CardActions>
    </Card>
  ))}
        </div>
      </Container>
    </div>
  );
}

export default App;
