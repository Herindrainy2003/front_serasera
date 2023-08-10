import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Contact() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Contactez-nous
      </Typography>
      <Typography paragraph>
        Pour toute question ou demande de renseignements, veuillez nous contacter :
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Téléphone : 034 62 963 41" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email : raiky601@gmail.com" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Adresse : Encenite Score Bazar BE Toliara" />
        </ListItem>
      </List>
    </div>
  );
}

export default Contact;
