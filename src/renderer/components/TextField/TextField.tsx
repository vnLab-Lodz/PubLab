import * as React from 'react';
import { TextField, InputBase } from '@mui/material';
import './TextField.scss';
import { styled } from '@mui/material/styles';

interface Props {
  type?: string;
  placeholder?: string;
  error?: boolean;
  value?: string;
}

const StyledTextField = styled(InputBase)(({ theme, type, error }) => ({
  color: error === true ? theme.palette.lightRed.main : type === 'light' ? theme.palette.black.main : theme.palette.lightGray.main,
  border: error === true ? `1px solid ${theme.palette.lightRed.main} `
    : type === 'light' ? `1px solid ${theme.palette.black.main}` : `1px solid ${theme.palette.lightGray.main}`,
  height: '45px',
  width: '400px',
  padding: '10px',
  fontSize: '15px'
}));

const OurTextField: React.FC<Props> = (props) => {
  return (
    <StyledTextField
      type={props.type}
      value={props.value}
      error={props.error}
      placeholder={props.placeholder} />
  );
}

OurTextField.defaultProps = {
  type: 'dark',
  placeholder: 'Project name...',
  error: false
};

export default OurTextField;