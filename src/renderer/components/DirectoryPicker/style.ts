import { styled } from '@mui/material';
import TextFieldBase from '../TextField/TextField';

export const TextField = styled(TextFieldBase)(({ theme }) => ({
  flex: 1,
  '&&&.MuiInputBase-root': {
    fontSize: theme.typography.body1.fontSize,
  },
}));
