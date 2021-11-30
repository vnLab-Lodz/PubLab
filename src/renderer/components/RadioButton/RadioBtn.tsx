import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';

const RadioBtn = styled(Radio)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
}));

export default RadioBtn;
