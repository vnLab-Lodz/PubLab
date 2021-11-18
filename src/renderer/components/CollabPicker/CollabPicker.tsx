import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, MenuItem } from '@mui/material';
import TextField from '../TextField/TextField';

interface Value {
  username: string;
  role: string;
}

interface Option {
  value: string;
  label: string;
}

interface Props {
  value?: Value;
  options?: Option[];
  onChange?: (value: Value | undefined) => void;
  onAdd?: (value: Value) => void;
}

const CollabPicker: React.FC<Props> = ({ value, options, onChange, onAdd }) => {
  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    if (onChange === undefined) return;

    onChange(currentValue);
  }, [currentValue]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCurrentValue((prev) => {
      const username = event.target.value;
      return { username, role: prev?.role ?? '' };
    });

  const handleRoleChange = (event: SelectChangeEvent) =>
    setCurrentValue((prev) => {
      const role = event.target.value;
      return { role, username: prev?.username ?? '' };
    });

  const handleAdd = () => {
    if (onAdd === undefined || currentValue === undefined) return;

    onAdd(currentValue);
    setCurrentValue(undefined);
  };

  const currentUsername = currentValue?.username ?? '';
  const currentRole = currentValue?.role ?? '';

  return (
    <div>
      <TextField
        placeholder='Username...'
        value={currentUsername}
        onChange={handleUsernameChange}
      />
      <Select label='Role' onChange={handleRoleChange} value={currentRole}>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
};

CollabPicker.defaultProps = {
  value: undefined,
  options: [],
  onChange: () => {},
  onAdd: () => {},
};

export default CollabPicker;
