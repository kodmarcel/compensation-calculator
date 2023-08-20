import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const employerWelfare=0.161

const EmploymentCalculatorScreen = () => {
  const [gross, setGross] = useState('');
  const [net, setNet] = useState('');
  const [grossGross, setGrossGross] = useState('');
  const [payedOut, setPayedOut] = useState('');
  const [transportationMeals, setTransportationMeals] = useState(0);
  const [dependentChildren, setDependentChildren] = useState(0);
  const [dependentFamilyMembers, setDependentFamilyMembers] = useState(0);

  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleBlur = (value, setter) => {
    if (value === '') {
      setter(0);
    }
  };

  const handleFocus = (value, setter) => {
    if (value === 0) {
      setter('');
    }
  };

  const calculate = () => {
    if (grossGross) {
      const calculatedGross = parseFloat(grossGross) * (1 + employerWelfare);
    
      setGross(calculatedGross.toFixed(2));
    } else if (net === '') {
      // Calculate net based on gross and deductions
      // Replace this placeholder logic with your actual calculation
      const calculatedNet = parseFloat(gross) - parseFloat(transportationMeals);
      setNet(calculatedNet.toFixed(2));
    }
  };

  return (
    <div>
      <Grid container spacing={2} sx={{mt:2}}>
        <Grid item xs={6}>
          <TextField
            label="Gross"
            type="number"
            value={gross}
            onChange={(e) => handleInputChange(e, setGross)}
            onBlur={() => handleBlur(gross, setGross)}
            onFocus={() => handleFocus(gross, setGross)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Net"
            type="number"
            value={net}
            onChange={(e) => handleInputChange(e, setNet)}
            onBlur={() => handleBlur(net, setNet)}
            onFocus={() => handleFocus(net, setNet)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Gross Gross"
            type="number"
            value={grossGross}
            onChange={(e) => handleInputChange(e, setGrossGross)}
            onBlur={() => handleBlur(grossGross, setGrossGross)}
            onFocus={() => handleFocus(grossGross, setGrossGross)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="PayedOut"
            type="number"
            value={payedOut}
            onChange={(e) => handleInputChange(e, setPayedOut)}
            onBlur={() => handleBlur(payedOut, setPayedOut)}
            onFocus={() => handleFocus(payedOut, setPayedOut)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Transportation and Meals"
            type="number"
            value={transportationMeals}
            onChange={(e) => handleInputChange(e, setTransportationMeals)}
            onBlur={() => handleBlur(transportationMeals, setTransportationMeals)}
            onFocus={() => handleFocus(transportationMeals, setTransportationMeals)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Number of Dependent Children"
            type="number"
            value={dependentChildren}
            onChange={(e) => handleInputChange(e, setDependentChildren)}
            onBlur={() => handleBlur(dependentChildren, setDependentChildren)}
            onFocus={() => handleFocus(dependentChildren, setDependentChildren)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Number of Dependent Family Members"
            type="number"
            value={dependentFamilyMembers}
            onChange={(e) => handleInputChange(e, setDependentFamilyMembers)}
            onBlur={() => handleBlur(dependentFamilyMembers, setDependentFamilyMembers)}
            onFocus={() => handleFocus(dependentFamilyMembers, setDependentFamilyMembers)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
      </Grid>
      <Button onClick={calculate} variant="contained" color="primary">
        Calculate
      </Button>
    </div>
  );
};

export default EmploymentCalculatorScreen;