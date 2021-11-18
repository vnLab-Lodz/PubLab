import * as React from 'react';
import { Button } from '@mui/material';
import TextField from '../TextField/TextField';

interface Props {
  value?: string;
  placeholder?: string;
  onClick?: () => void;
}

const DirectoryPicker: React.FC<Props> = ({ value, placeholder, onClick }) => {
  const [currentValue, setCurrentValue] = React.useState(value);

  const handleDirectoryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentValue(event.target.value);

  return (
    <div>
      <TextField
        placeholder={placeholder}
        value={currentValue}
        onChange={handleDirectoryChange}
      />
      <Button onClick={onClick}>Change</Button>
    </div>
  );
};

DirectoryPicker.defaultProps = {
  value: undefined,
  placeholder: undefined,
  onChange: () => {},
  onClick: () => {},
};

export default DirectoryPicker;
