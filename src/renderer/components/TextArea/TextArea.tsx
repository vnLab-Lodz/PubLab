import * as React from 'react';
import { InputBaseProps } from '@mui/material';
import TextField from '../TextField/TextField';

const TextArea: React.FC<InputBaseProps> = (props) => (
  <TextField rows={6} maxRows={10} {...props} multiline />
);

export default TextArea;
