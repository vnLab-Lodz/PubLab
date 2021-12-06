import { styled } from '@mui/material';
import Button from '../../components/Button/Button';

export const StepContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(8),
}));

export const StyledButton = styled(Button)(() => ({
  width: '50%',
  height: '60px',
}));

export const BlackButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.black,
}));

export const GreenButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.green.main,
  color: theme.palette.black.main,
}));
