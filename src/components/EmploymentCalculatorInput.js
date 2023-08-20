import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';

const employerWelfareRatio=0.161
const employeeWelfareRatio=0.221
const taxTable = [[729.58, 2145.83, 4291.67, 6180.00, Infinity],[0.16, 0.26, 0.33, 0.39, 0.5]]
const calculateTax = (taxBase) => {
  var totalTax = 0
  for (let i = 0; i < taxTable[0].length; i++) {
    if (taxBase < taxTable[0][i]){
      if (i > 0){
        taxBase = taxBase - taxTable[0][i - 1];
      }
      totalTax += taxBase * taxTable[1][i];
      break;
    }else{
      var bracketValue = 0;
      if (i > 0){
        bracketValue = taxTable[0][i] - taxTable[0][i - 1]
      }else{
        bracketValue = taxTable[0][i]
      }
      totalTax += bracketValue * taxTable[1][i]
    }
  }
  return totalTax
}
const taxExemption = (gross) => {
  if (gross > 1333.33) return 416.67
  return 416.67 + (1563,45  - 1,17259 *gross)
}
const dependentChildrenTable = [224.83, 244.42, 407.67, 570.92, 734.17, 163.25]
const childDependentTaxExemption = (n_children) => {
  var total_exemption = 0
  var current_exemption = 0
  for (let i = 0; i < n_children; i++) {
    if (i < dependentChildrenTable.length - 1){
      current_exemption = dependentChildrenTable[i]
    }else{
      current_exemption += dependentChildrenTable[-1]
    }
    total_exemption += current_exemption
  }
  return total_exemption
}
const dependentAdultTaxExemption = 224.83
const calculationOrder = ["grossGross",  "employerWelfare",  "gross",  "employeeWelfare",  "tax",  "net",  "payedOut"]
const sourceOptions = ["grossGross", "gross", "net", "payedOut"]

export default class EmploymentCalculatorInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sourceField: "",
      data: {
        gross: 0,
        net: 0,
        grossGross: 0,
        payedOut: 0,
        transportationMeals: 0,
        dependentChildren: 0,
        dependentFamilyMembers:0,
        employeeWelfare:0,
        employerWelfare:0,
        tax:0,
        taxBase:0
      }
    };
  };
  
  handleChange = (field, value) => {
    let dataCopy = { ...this.state.data};
    dataCopy[field] = value
    this.setState({data: dataCopy})
  };

  handleBlur = (field) => {
    if (this.state.data[field] === '') {
      this.handleChange(field, 0);
    }
  };

  handleFocus = (field) => {
    if (this.state.data[field] === 0) {
      this.handleChange(field,'');
    }
    if (sourceOptions.includes(field)){
      this.setState({sourceField: field});
      console.log("selected ", field , " as souceField")
    }
  };

  calculateAll = () => {
    const data = this.state.data;
    console.log("Source Field: ", this.state.sourceField);
    console.log("Start data", data)
    const sourceFieldIndex = calculationOrder.indexOf(this.state.sourceField);
    for (let i = sourceFieldIndex-1; i >= 0; i--) {
      const value = calculationOrder[i];
      console.log("Calculating: ", value);
      this.calculate(value, data, false);
    }
    for (let i = sourceFieldIndex+1; i < calculationOrder.length; i++) {
      const value = calculationOrder[i];
      console.log("Calculating: ", value)
      this.calculate(value, data);
    }
    this.setState({data: data})
    console.log("End data", this.data)
    this.updateHistory();
  }

  updateHistory = () => {
    this.props.setHistory([
      ...this.props.history,
      this.state.data
    ]);
  }

  calculate = (value, data, forward=true) => { 
    if (value === "grossGross") {
      // brutobruto = bruto + prispevki_delodajalca
      // prispevki_delodajalca = bruto * 16.1%
      // brutobruto = bruto * (1.161)
      data["grossGross"] = data["gross"] * (1+ employerWelfareRatio) + data.transportationMeals;
    } else if (value === "employerWelfare") {
      if (forward){
        // prispevki_delodajalca = bruto * 0.161
        // brutobruto = bruto + prispevki_delodajalca
        // prispevki_delodajalca = brutobruto - bruto
        // brutobruto = bruto * (1.161) => bruto = brutobruto/1.161
        //prispevki_delodajalca = brutobruto * (1 - 1/1.161)
        data["employerWelfare"] = data.grossGross * (1 - 1 / (1 + employerWelfareRatio));
      }else{
        // prispevki_delodajalca = bruto * 0.161
        data["employerWelfare"] = data.gross * employerWelfareRatio;
      }
    } else if (value === "gross") {
      if (forward){
        // bruto = brutobruto/1.161
        data["gross"] = data.grossGross / (1 + employerWelfareRatio);
      }else{
        // bruto = neto + tax + prispevki
        data["gross"] = data.net + data.tax + data.employeeWelfare;
      }
    } else if (value === "employeeWelfare") {
      if (forward){
        //prispevki =  bruto * 0.221
        data["employeeWelfare"] =  data.gross * employeeWelfareRatio
      }else{
        //bruto =  neto + tax + prispevki
        //bruto = prispevki / 0.221
        // prispevki = (neto + tax) * (1/0.221 - 1)
        data["employeeWelfare"] = (data.net + data.tax) * (1/employeeWelfareRatio - 1);
      }
    } else if (value === "tax") {
      if (forward){
        data["taxBase"]  = Math.max(data.gross - data.employeeWelfare - taxExemption(data.gross) - childDependentTaxExemption(data.dependentChildren) - data.dependentFamilyMembers * dependentAdultTaxExemption,0)
        data["tax"] = calculateTax(data.taxBase)
      }else{
        // this.setdata({ tax: data.net + data.tax + data.employeeWelfare });
      }
    } else if (value === "net") {
      if (forward){
        data["net"] = data.gross - data.tax - data.employeeWelfare;
      }else{
        data["net"] = data.payedOut - data.transportationMeals;
      }
    } else if (value === "payedOut") {
      data["payedOut"] = data.net + data.transportationMeals
    }
  }
        
  clearCalculated = () => {
    let dataCopy = { ...this.state.data};
    sourceOptions.forEach(key => {
      if (key !== this.state.sourceField) {
        dataCopy[key] = 0
      }
    });
    this.setState({data: dataCopy})
  }

  render () {
    return (<div>
      <Grid container spacing={2} sx={{mt:2}}>
        <Grid item xs={6}>
          <TextField
            label="Gross"
            type="number"
            value={this.state.data.gross}
            onChange={(e) => this.handleChange("gross", e.target.valueAsNumber)}
            onBlur={() => this.handleBlur("gross")}
            onFocus={() => this.handleFocus("gross")}
            sx={{
              bgcolor: this.state.sourceField === "gross" ? "#D3D3D3": "white",
            }}
            fullWidth
            style={{ marginBottom: '16px' }}
            InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Net"
            type="number"
            value={this.state.data.net}
            onChange={(e) => this.handleChange("net", e.target.valueAsNumber)}
            onBlur={() => this.handleBlur("net")}
            onFocus={() => this.handleFocus("net")}
            sx={{
              bgcolor: this.state.sourceField === "net" ? "#D3D3D3": "white",
            }}
            fullWidth
            style={{ marginBottom: '16px' }}
            InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Gross Gross"
            type="number"
            value={this.state.data.grossGross}
            onChange={(e) => this.handleChange("grossGross", e.target.valueAsNumber)}
            onBlur={() => this.handleBlur("grossGross")}
            onFocus={() => this.handleFocus("grossGross")}
            sx={{
              bgcolor: this.state.sourceField === "grossGross" ? "#D3D3D3": "white",
            }}
            fullWidth
            style={{ marginBottom: '16px' }}
            InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="PayedOut"
            type="number"
            value={this.state.data.payedOut}
            onChange={(e) => this.handleChange("payedOut", e.target.valueAsNumber)}
            onBlur={() => this.handleBlur("payedOut")}
            onFocus={() => this.handleFocus("payedOut")}
            sx={{
              bgcolor: this.state.sourceField === "payedOut" ? "#D3D3D3": "white",
            }}
            fullWidth
            style={{ marginBottom: '16px' }}
            InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Transportation and Meals"
            type="number"
            value={this.state.data.transportationMeals}
            onChange={(e) => this.handleChange("transportationMeals", e.target.valueAsNumber)}
            onBlur={() => this.handleBlur("transportationMeals")}
            onFocus={() => this.handleFocus("transportationMeals")}
            fullWidth
            style={{ marginBottom: '16px' }}
            InputProps={{startAdornment: <InputAdornment position="start">€</InputAdornment>}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Number of Dependent Children"
            type="number"
            value={this.state.data.dependentChildren}
            onChange={(e) => this.handleChange("dependentChildren", e.target.valueAsNumber)}
            onBlur={() => this.handleBlur("dependentChildren")}
            onFocus={() => this.handleFocus("dependentChildren")}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Number of Dependent Family Members"
            type="number"
            value={this.state.data.dependentFamilyMembers}
            onChange={(e) => this.handleChange("dependentFamilyMembers", e.target.valueAsNumber)}
            onBlur={() => this.handleBlur("dependentFamilyMembers")}
            onFocus={() => this.handleFocus("dependentFamilyMembers")}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </Grid>
      </Grid>
      <Button onClick={this.calculateAll} variant="contained" color="primary">
        Calculate
      </Button>
      <Button sx={{ml:2}} onClick={this.clearCalculated} color="primary">
        Clear Calculated
      </Button>
    </div>
    );
  };
};