import * as React from 'react';
import { InputBase } from '@mui/material';
import './TextField.scss';
import { styled } from '@mui/material/styles';

interface Props {
  type?: string;
  placeholder?: string;
  error?: boolean;
  value?: string;
  onChange?: (...args: any[]) => void;
}

const StyledTextField = styled(InputBase)(
  ({ type, error, theme: { palette } }) => {
    const { lightGray, black, lightRed } = palette;

    return {
      color:
        error === true
          ? lightRed.main
          : type === 'light'
          ? black.main
          : lightGray.main,
      border:
        error === true
          ? `1px solid ${lightRed.main} `
          : type === 'light'
          ? `1px solid ${black.main}`
          : `1px solid ${lightGray.main}`,
      height: '45px',
      width: '400px',
      paddingTop: '10px',
      padding: '12px 10px 12px 10px',
      fontSize: '15px !important',
    };
  }
);

const TextField: React.FC<Props> = (props) => {
  return (
    <StyledTextField
      type={props.type}
      value={props.value}
      error={props.error}
      placeholder={props.placeholder}
      onChange={() => props.onChange()}
    />
  );
};

TextField.defaultProps = {
  type: 'dark',
  placeholder: 'Project name...',
  value: undefined,
  error: false,
  onChange: () => {},
};

export default TextField;
