import * as React from 'react';
import { Box } from '@mui/material';
import Button from '../Button/Button';
import * as Styled from './style';

interface Props {
  buttonText: string;
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  labelledBy?: string;
  error?: boolean;
}

const DirectoryPicker: React.FC<Props> = ({
  placeholder,
  onClick,
  onChange,
  onBlur,
  value,
  buttonText,
  labelledBy,
  error,
}) => (
  <Box sx={{ display: 'flex' }}>
    <Styled.TextField
      placeholder={placeholder ?? ''}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      spellCheck={false}
      inputProps={{ 'aria-labelledby': labelledBy }}
      error={error}
    />
    <Button variant='contained' onClick={onClick} sx={{ m: 0 }}>
      {buttonText}
    </Button>
  </Box>
);

DirectoryPicker.defaultProps = {
  value: undefined,
  placeholder: undefined,
  onClick: () => {},
  onChange: () => {},
  onBlur: () => {},
  labelledBy: undefined,
  error: false,
};

export default DirectoryPicker;
