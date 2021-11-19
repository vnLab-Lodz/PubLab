import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';

const RadioBtn = styled(Radio)(({ theme }) => ({
  color: theme.palette.lightGray.main,
  '&.Mui-checked': {
    color: theme.palette.lightGray.main,
  },
  '&.Mui-disabled': {
    color: theme.palette.darkGray.main,
  },
}));

export default RadioBtn;
