import * as React from 'react';
import { TextField, InputBase, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import './TextField.scss';

interface Props {
    children: ReactNode;

    type?: string;
}



const StyledTextField = styled(TextField)(({ theme }) => ({
}));


const OurTextField: React.FC<Props> = ({type, ...props}: Props) => {

  if (type == 'light') {
    return (
        <div color='black'>
          <InputBase {...props} style={{backgroundColor: "#DDDDDD", border: "2px solid #111111", height: "15mm", padding: "15px", color: '#111111'}}></InputBase>
        </div>
      );
  } else if (type == 'dark') {
    return (
        <div> 
          <InputBase {...props} style={{backgroundColor: "#111111", border: "2px solid #DDDDDD", height: "15mm", padding: "15px", color: '#DDDDDD'}}></InputBase>
        </div>
      );
  } else {
    return (
        <div>
          <InputBase {...props} style={{backgroundColor: "#111111", border: "2px solid #ff8383", height: "15mm", padding: "15px", color: "#ff8383", }}></InputBase>
        </div>
      );
  }
}

export default OurTextField;