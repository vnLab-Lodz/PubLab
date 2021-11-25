import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Box, MenuItem } from '@mui/material';
import TextField from '../TextField/TextField';
import Select from '../Select/Select';
import Button from '../Button/Button';

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
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <TextField
        sx={{ flexGrow: 1, borderRight: 'none' }}
        placeholder='Username...'
        value={currentUsername}
        onChange={handleUsernameChange}
      />
      <Select
        sx={{ flexGrow: 1 }}
        placeholder='Role'
        onChange={handleRoleChange}
        value={currentRole}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant='contained'
        color='lightGray'
        textCase='uppercase'
        fontWeight='regular'
        onClick={handleAdd}
      >
        Add
      </Button>
    </Box>
  );
};

CollabPicker.defaultProps = {
  value: undefined,
  options: [],
  onChange: () => {},
  onAdd: () => {},
};

export default CollabPicker;
