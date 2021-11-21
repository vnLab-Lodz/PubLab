import * as React from 'react';
import { Button } from '@mui/material';
import TextField from '../TextField/TextField';

interface Props {
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  onChange?: (event?: string) => void;
}

const DirectoryPicker: React.FC<Props> = ({ value, placeholder, onClick, onChange }) => {

  return (
    <div>
      <TextField
        placeholder={placeholder}
       onChange={(event) => onChange(event.target.value)}
      />
      <Button onClick={onClick}>Change</Button>
    </div>
  );
};

DirectoryPicker.defaultProps = {
  value: undefined,
  placeholder: undefined,
  onClick: () => {},
  onChange: (placeholder) => {}
};

export default DirectoryPicker;
