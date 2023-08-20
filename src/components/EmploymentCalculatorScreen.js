import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import EmploymentCalculatorInput from './EmploymentCalculatorInput';
import EmploymentCalculatorResults from './EmploymentCalculatorResults';

const EmploymentCalculatorScreen = () => {
  const [history, setHistory] = useState([]);
  return (
    <div>
      <Grid container spacing={2} sx={{mt:2}}>
        <Grid item xs={6}>
          <EmploymentCalculatorInput history={history} setHistory={setHistory}/>
        </Grid>
        <Grid item xs={6}>
        <EmploymentCalculatorResults history={history} setHistory={setHistory}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmploymentCalculatorScreen;  