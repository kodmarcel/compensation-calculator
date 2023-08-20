
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const EmploymentCalculatorResults = ({history, setHistory}) => {
  return (
    <div>
      <TableContainer sx={{mt:4}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Gross Gross</TableCell>
              <TableCell>Employer Welfare</TableCell>
              <TableCell>Gross</TableCell>
              <TableCell>Employee Welfare</TableCell>
              <TableCell>Tax Base</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Net</TableCell>
              <TableCell>Transpotation and meals</TableCell>
              <TableCell>Payout</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row) => (
              <TableRow>
                <TableCell>{row.grossGross} </TableCell>
                <TableCell>{row.employerWelfare}</TableCell>
                <TableCell>{row.gross}</TableCell>
                <TableCell>{row.employeeWelfare}</TableCell>
                <TableCell>{row.taxBase}</TableCell>
                <TableCell>{row.tax}</TableCell>
                <TableCell>{row.net}</TableCell>
                <TableCell>{row.transportationMeals}</TableCell>
                <TableCell>{row.payedOut}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={(() => setHistory([]))}>Clear</Button>
    </div>
  );
};

export default EmploymentCalculatorResults;