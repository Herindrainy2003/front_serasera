import React from 'react';

const SinglePage = ({ filteredTasks }) => {
  return (
    <div>
     
      {filteredTasks.map((task) => (
        <div key={task.id}>
          <p>Nom: {task.nomSera}</p>
          <p>Description: {task.descriptionSera}</p>
          <p>Prix: {task.prix}</p>
         
        </div>
      ))}
    </div>
  );
};

export default SinglePage;
