import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material';

interface Props {
  disabled?: boolean;
  height: string,
  placeholder: string;
  options: string[]; 
  onChange: (...args: any[]) => void; 
}

const StyledSelect = styled(Select)(({ theme }) => ({ 
borderRadius: "0", 
border: "1px grey",
fontWeight: 'normal',
fontStyle: 'normal',
}));

const OurSelect: React.FC<Props> = (props) => {

const [value, setValue] = React.useState<string>(""); 

const handleChange = (event: any) => {
  setValue(event.target.value); 
  props.onChange(); 
};


return (
  <div>
  <StyledSelect
   value={value}
   displayEmpty
   onChange={(event) => handleChange(event)} 
   >
     <MenuItem disabled value="">{props.placeholder}</MenuItem>
     {props.options.map((option) => { 
       return (<MenuItem value={option}>{option}</MenuItem>);
     })}
   </StyledSelect>
  </div>
);
}

export default OurSelect; 