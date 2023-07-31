// ProductList.js
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';

function ProductList({ tasks }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}>
      {Array.isArray(tasks) &&
        tasks.map((task) => (
          <Card key={task.id} style={{ margin: '16px', width: '300px' }}>
            <CardMedia component="img" height="280" image={`http://localhost:5000/images/${task.photo}`} alt={task.nomsera} />
            <CardContent>
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
              <Button size="small" color="primary">
                Seraina
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
}

export default ProductList;
