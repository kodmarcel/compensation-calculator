
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SelfEmployedCalculatorScreen = () => {
  // State variables for input fields
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [netIncome, setNetIncome] = useState('');

  // Calculation logic
  const calculateNetIncome = () => {
    const calculatedNetIncome = parseFloat(income) - parseFloat(expenses);
    setNetIncome(calculatedNetIncome.toFixed(2));
  };

  return (
    <div>
      <TextField
        label="Income"
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Expenses"
        type="number"
        value={expenses}
        onChange={(e) => setExpenses(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button onClick={calculateNetIncome} variant="contained" color="primary">
        Calculate Net Income
      </Button>
      <div>Net Income: {netIncome}</div>
    </div>
  );
};

export default SelfEmployedCalculatorScreen;