import * as React from 'react';
import Switch from '@mui/material/Switch';

interface Props {
    disabled?: boolean;
}

const OurSwitch: React.FC<Props> = ({disabled}) => {
  return (
    <div>
      <Switch disabled={disabled}/>
    </div>
  );
}

export default OurSwitch;