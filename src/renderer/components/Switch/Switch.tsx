import * as React from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material';
interface Props {
    disabled?: boolean;
    onChange: (...args: any[]) => void; 
}

const StyledSwitch = styled(Switch)(({ theme }) => ({
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
      onChange={(event) => handleChange(event)}
      ></StyledSwitch>
    </div>
  );
}

export default OurSwitch;