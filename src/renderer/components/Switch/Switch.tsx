import * as React from 'react';
import Switch from '@mui/material/Switch';
import { styled, Theme } from '@mui/material';
interface Props {
    disabled?: boolean;
    onChange: (...args: any[]) => void;
    height: string;
    width: string;
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 40,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    height: '100%',
    marginLeft: '10%',
    transitionDuration: '300ms',
    borderColor: '#DDDDDD',
    '&.Mui-checked': {
      transform: 'translateX(160%)',
      '& + .MuiSwitch-track': {
        backgroundColor: "#01D39F",
        opacity: 1,
      },
    },
  },

  '& .MuiSwitch-thumb': {
    width: 25,
    height: 25,
    color: '#DDDDDD',
  },

  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: '#111111',
    opacity: 1,
    border: "1px solid #DDDDDD",
  },
}));

const OurSwitch: React.FC<Props> = (props) => {

  const [checked, setChecked] = React.useState<boolean>(); 

  const handleChange = (event: any) => {
    setChecked(event.target.value);
    props.onChange(); 
  };


  return (
    <div>
      <StyledSwitch
      disabled = {props.disabled}
      onChange={(event) => handleChange(event)}
      ></StyledSwitch>
    </div>
  );
}

export default OurSwitch;