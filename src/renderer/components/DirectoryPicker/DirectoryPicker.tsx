import * as React from 'react';
import { Box } from '@mui/material';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';

interface Props {
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const DirectoryPicker: React.FC<Props> = ({
  placeholder,
  onClick,
  onChange,
  value,
}) => (
  <Box sx={{ display: 'flex' }}>
    <TextField
      sx={{ flex: 1 }}
      placeholder={placeholder ?? ''}
      value={value ?? ''}
      onChange={onChange}
    />
    <Button
      variant='contained'
      color='lightGray'
      textCase='uppercase'
      fontWeight='regular'
      onClick={onClick}
    >
      Change
    </Button>
  </Box>
);

DirectoryPicker.defaultProps = {
  value: undefined,
  placeholder: undefined,
  onClick: () => {},
  onChange: () => {},
};

export default DirectoryPicker;
