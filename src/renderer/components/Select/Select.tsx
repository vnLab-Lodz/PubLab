import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputBase, Menu, styled } from '@mui/material';
import * as theme from '../../theme';
import StateManager from 'react-select';
import { red } from '@mui/material/colors';

interface Props {
  disabled?: boolean;
  height: string,
  placeholder: string;
  options: string[]; 
  onChange: (...args: any[]) => void; 
}

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({ 
 color: '#111111',
}));

const StyledSelect = styled(Select)(({ theme }) => ({ 
backgroundColor: theme.palette.black.main,
borderRadius: '0', 
borderColor: theme.palette.lightGray.main,
borderStyle: 'solid',
borderWidth: '1px',
fontWeight: 'normal',
fontStyle: 'normal',
color: theme.palette.lightGray.main,
'& .MuiSelect-icon':{
  fill: theme.palette.lightGray.main
},
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
      onChange={(event) => handleChange(event)}>
     <CustomMenuItem disabled value="">{props.placeholder}</CustomMenuItem>
     {props.options.map((option) => { 
       return (<MenuItem value={option}>{option}</MenuItem>);
     })}
   </StyledSelect>
  </div>
);
}

export default OurSelect; 