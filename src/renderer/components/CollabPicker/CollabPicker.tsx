import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useEffect } from '@storybook/addons';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';

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
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (onChange === undefined) return;

    onChange(currentValue);
  }, [currentValue]);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setCurrentValue((prev) => {
      const username = event.target.value;
      return { username, role: prev?.role ?? '' };
    });

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) =>
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
      <Select label='Role' value={currentRole} onChange={handleRoleChange}>
        {options?.map(({ value, label }) => (
          <MenuItem value={value} key={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={handleAdd}>ADD</Button>
    </div>
  );
};

CollabPicker.defaultProps = {
  value: undefined,
  options: undefined,
  onChange: () => {},
  onAdd: ()=> {},
};

export default CollabPicker;
