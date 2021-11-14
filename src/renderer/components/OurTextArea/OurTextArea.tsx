import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface Props {
  type?: string;
  error?: boolean;
  onChange: (...args: any[]) => void;
  value?: string;
  helperText?: string;
  placeholder?: string;
  width?: string;
}

const StyledTextArea = styled(TextField)(({ type }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '0px',
      borderColor: type === 'light' ? lightGray.main : black.main,
      color: type === 'light' ? lightGray.main : black.main,
    },
    '&.Mui-error': {
      '& fieldset': {
        borderRadius: '0px',
        borderColor: lightRed.main,
      },
    },
  },
  // customise top label, e.g "Project description"
  '& .MuiInputLabel-root': {
    color: type === 'light' ? lightGray.main : black.main,
    '&.Mui-error': {
      color: lightRed.main,
    },
  },
  // customise helperText for errors
  '& .MuiFormHelperText-root': {
    color: lightRed.main,
  },
}));

const OurTextArea: React.FC<Props> = (props) => (
  <StyledTextArea
    label={props.placeholder}
    variant='outlined'
    multiline
    rows={6}
    maxRows={10}
    type={props.type}
    onChane={() => props.onChange()}
    value={props.value}
    error={props.error}
    helperText={props.helperText}
    style={{ width: props.width }}
  />
);

OurTextArea.defaultProps = {
  type: 'light',
  placeholder: 'Project description',
  value: '',
  error: false,
  helperText: '',
  width: '400px',
};

export default OurTextArea;
