// EmploymentCalculator.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   field: {
//     marginBottom: theme.spacing(2),
//   },
// }));

const EmploymentCalculator = () => {
  // const classes = useStyles();

  const [gross, setGross] = useState('');
  const [net, setNet] = useState('');
  const [transportationMeals, setTransportationMeals] = useState(0);
  const [dependentChildren, setDependentChildren] = useState(0);
  const [dependentFamilyMembers, setDependentFamilyMembers] = useState(0);
  
  const [calculatedField, setCalculatedField] = useState(null); // Track which field was calculated

  
  const handleInputChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleBlur = (value, setter) => {
    if (value === '') {
      setter(0);
    }
  };

  const calculate = () => {
    if (gross === '') {
      // Calculate gross based on net and deductions
      // Replace this placeholder logic with your actual calculation
      const calculatedGross = parseFloat(net) + parseFloat(transportationMeals);
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
      <TextField
        label="Gross"
        type="number"
        value={gross}
        onChange={(e) => handleInputChange(e, setGross)}
        onBlur={() => handleBlur(gross, setGross)}
        variant="outlined"
        fullWidth
        // className={classes.field}
      />
      <TextField
        label="Net"
        type="number"
        value={net}
        onChange={(e) => handleInputChange(e, setNet)}
        onBlur={() => handleBlur(net, setNet)}
        variant="outlined"
        fullWidth
        // className={classes.field}
      />
      <TextField
        label="Transportation and Meals"
        type="number"
        value={transportationMeals}
        onChange={(e) => handleInputChange(e, setTransportationMeals)}
        onBlur={() => handleBlur(transportationMeals, setTransportationMeals)}
        variant="outlined"
        fullWidth
        // className={classes.field}
      />
      <TextField
        label="Number of Dependent Children"
        type="number"
        value={dependentChildren}
        onChange={(e) => handleInputChange(e, setDependentChildren)}
        onBlur={() => handleBlur(dependentChildren, setDependentChildren)}
        variant="outlined"
        fullWidth
        // className={classes.field}
      />
      <TextField
        label="Number of Dependent Family Members"
        type="number"
        value={dependentFamilyMembers}
        onChange={(e) => handleInputChange(e, setDependentFamilyMembers)}
        onBlur={() => handleBlur(dependentFamilyMembers, setDependentFamilyMembers)}
        variant="outlined"
        fullWidth
        // className={classes.field}
      />
      <Button onClick={calculate} variant="contained" color="primary">
        Calculate
      </Button>
    </div>
  );
};

export default EmploymentCalculator;
