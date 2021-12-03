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
  labelledBy?: string;
}

const DirectoryPicker: React.FC<Props> = ({
  placeholder,
  onClick,
  onChange,
  value,
  buttonText,
  labelledBy,
}) => (
  <Box sx={{ display: 'flex' }}>
    <Styled.TextField
      placeholder={placeholder ?? ''}
      value={value ?? ''}
      onChange={onChange}
      spellCheck={false}
      inputProps={{ 'aria-labelledby': labelledBy }}
    />
    <Button
      variant='contained'
      textCase='uppercase'
      fontWeight='regular'
      onClick={onClick}
      typographyVariant='h4'
    >
      {buttonText}
    </Button>
  </Box>
);

DirectoryPicker.defaultProps = {
  value: undefined,
  placeholder: undefined,
  onClick: () => {},
  onChange: () => {},
  labelledBy: undefined,
};

export default DirectoryPicker;
