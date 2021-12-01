import { styled } from '@mui/material';
import TextFieldBase from '../TextField/TextField';

export const TextField = styled(TextFieldBase)(({ theme }) => ({
  flex: 1,
  '&&&.MuiInputBase-root': {
    fontSize: theme.typography.h3.fontSize,
    padding: '0.8em',
  },
  '& .MuiInputBase-input': {
    padding: 0,
  },
}));
