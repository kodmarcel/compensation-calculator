import './App.css';
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './Header';
import EmploymentTypeSelector from './EmploymentTypeSelector';
import SelfEmployedCalculatorScreen from './components/SelfEmployedCalculatorScreen';
import EmploymentCalculatorScreen from './components/EmploymentCalculatorScreen';
import CompareCalculatorScreen from './components/CompareCalculatorScreen';

function App() {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };


  return (
    <div className="App">
      <CssBaseline />
      <Container>
        <Header />
        <EmploymentTypeSelector onSelectType={handleTypeSelection} />
        {selectedType === 'selfEmployed' && <SelfEmployedCalculatorScreen />}
        {selectedType === 'employed' && <EmploymentCalculatorScreen />}
        {selectedType === 'compare' && <CompareCalculatorScreen />}
      </Container>
    </div>
  );
}

export default App;
