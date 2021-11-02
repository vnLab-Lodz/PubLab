import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;

    variant: 'outlined' | 'filled';
}

const StyledTextField = styled(TextField)(({ theme }) => ({
}));


const OurTextField: React.FC<Props> = ({children, ...props}: Props) => {

  const [checked, setChecked] = React.useState<boolean>(); 

  return (
    <div>
      <TextField {...props}>{children}</TextField>
    </div>
  );
}

export default OurTextField;