import * as React from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import TextField from '../TextField/TextField';
import Select from '../Select/Select';
import Button from '../Button/Button';

export interface Value {
  username: string;
  role: string;
}

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: Value;
  options?: Option[];
  buttonText: string;
  prompt?: string;
  isError?: boolean;
  selectPlaceholder?: string;
  textFieldPlaceholder?: string;
  onChange: (value: Value | undefined) => void;
  onAdd?: () => void;
}

const CollabPicker: React.FC<Props> = ({
  value,
  options,
  onChange,
  onAdd,
  buttonText,
  prompt,
  isError,
  selectPlaceholder,
  textFieldPlaceholder,
}) => (
  <Box>
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <TextField
        sx={{ flexGrow: 1, borderRight: 'none' }}
        placeholder={textFieldPlaceholder}
        value={value.username}
        onChange={(e) => onChange({ ...value, username: e.target.value })}
      />
      <Select
        sx={{ flexGrow: 1 }}
        placeholder={selectPlaceholder}
        onChange={(e) => onChange({ ...value, role: e.target.value })}
        value={value.role}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant='contained'
        color='primary'
        textCase='uppercase'
        onClick={onAdd}
        sx={{ m: 0 }}
        disabled={!value.username || !value.role}
      >
        {buttonText}
      </Button>
    </Box>
    <Box height={({ typography }) => typography.body2.fontSize}>
      {prompt && (
        <Typography variant='body2' color={isError ? 'error' : undefined}>
          {prompt}
        </Typography>
      )}
    </Box>
  </Box>
);

CollabPicker.defaultProps = {
  options: [],
  selectPlaceholder: '',
  textFieldPlaceholder: '',
  onAdd: () => {},
  prompt: undefined,
  isError: false,
};

export default CollabPicker;
