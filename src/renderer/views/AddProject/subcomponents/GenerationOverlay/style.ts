import { styled } from '@mui/material';

export const Message = styled('p')(({ theme }) => ({
  marginTop: theme.spacing(3),
  color: theme.palette.green.main,
}));
