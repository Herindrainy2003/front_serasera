// CategoryForm.js
import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

function CategoryForm({ categories, onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onCategoryChange(selectedValue);
  };

  return (
    <Select
      value={selectedCategory}
      onChange={handleCategoryChange}
      displayEmpty
      variant="outlined"
      margin="dense"
      name="categories"
    >
      <MenuItem value="">Toutes les catégories</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CategoryForm;
