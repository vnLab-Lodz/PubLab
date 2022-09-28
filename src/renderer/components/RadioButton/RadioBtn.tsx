import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { FormControlLabel } from '@mui/material';

export const RadioFormControl = styled(FormControlLabel)(({ theme }) => ({
  width: 'fit-content',

  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
}));

const RadioBtn = styled(Radio)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
  '.MuiFormControlLabel-label': {
    color: theme.palette.text.disabled,
  },
}));

export default RadioBtn;
