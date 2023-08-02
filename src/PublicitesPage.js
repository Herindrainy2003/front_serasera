import React from 'react';
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import pub1Image from './images/bnp1.jpg';
import pub2Image from './images/bnp2.jpg';
import pub3Image from './images/bnp3.jpg';
// Importez d'autres images de publicités si nécessaire

const PublicitesPage = () => {
  const publicites = [
    { image: pub1Image, title: 'Publicité 1' },
    { image: pub2Image, title: 'Publicité 2' },
    { image: pub3Image, title: 'Publicité 3' },
    // Ajoutez d'autres publicités
  ];

  return (
    <Grid container spacing={3}>
      {publicites.map((pub, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardMedia component="img" height="240" image={pub.image} alt={pub.title} />
            <CardContent>
              <Typography variant="body2">{pub.title}</Typography>
              {/* Ajoutez d'autres détails sur la publicité si nécessaire */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PublicitesPage;

