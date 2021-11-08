import * as React from 'react';
import { TextField, InputBase } from '@mui/material';
import { ReactNode } from 'react';
import './TextField.scss';
import { styled } from '@mui/material/styles';

interface Props {
    children: ReactNode;
    type?: string;
}

const StyledTextField = styled(InputBase)(({ theme, type }) => ({
  backgroundColor: type === 'light' ? 'lightGray' : 'black', 
  color: type === 'light' ? 'black' : 
    type === 'dark' ? 'lightGray' : '#ff8383',
  border: type === 'light' ? '2px solid black' 
    : type === 'dark' ? '2px solid lightGray' : '2px solid #ff8383',
  height: '45px',
  width: '400px',
  padding: '10px'
}));

const OurTextField: React.FC<Props> = ({type, ...props}: Props) => {

  if (type === 'light') {
    return (
        <StyledTextField {...props} type={type}/>
      );
  } else if (type === 'dark') {
    return (
      <StyledTextField {...props} type={type}/>
      );
  } else {
    return (
      <StyledTextField {...props} type={type}/>
      );
  }
}

OurTextField.defaultProps = {
  type: 'black'
};

export default OurTextField;