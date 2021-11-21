import * as React from 'react';
import { Button } from '@mui/material';
import TextField from '../TextField/TextField';

interface Props {
  placeholder?: string;
  onClick?: () => void;
  onChange?: (event?: string) => void;
}

const DirectoryPicker: React.FC<Props> = ({
  placeholder,
  onClick,
  onChange,
}) => (
  <div>
    <TextField
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
    <Button onClick={onClick}>Change</Button>
  </div>
);

DirectoryPicker.defaultProps = {
  placeholder: undefined,
  onClick: () => {},
  onChange: () => {},
};

export default DirectoryPicker;