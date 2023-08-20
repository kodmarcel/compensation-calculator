import React, { useState } from 'react';
import Button from '@mui/material/Button';

const EmploymentTypeSelector = ({ onSelectType }) => {
  const [selectedType, setSelectedType] = useState(null);
  const handleTypeSelection = (type) => {
    setSelectedType(type);
    onSelectType(type);
  };

  return (
    <div>
      <Button onClick={() => handleTypeSelection('employed')} variant={selectedType === 'employed' ? 'contained' : 'outlined'} color="primary">
        Employed
      </Button>
      <Button onClick={() => handleTypeSelection('selfEmployed')} variant={selectedType === 'selfEmployed' ? 'contained' : 'outlined'} color="primary">
        Self-Employed
      </Button>
      <Button onClick={() => handleTypeSelection('compare')} variant={selectedType === 'compare' ? 'contained' : 'outlined'} color="primary">
        Compare
      </Button>
    </div>
  );
};

export default EmploymentTypeSelector;