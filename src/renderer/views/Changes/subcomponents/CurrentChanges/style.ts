import { Button, styled } from '@mui/material';

export const TextButton = styled(Button)(({ theme }) => ({
  margin: `${theme.spacing(2)} -0.5rem ${theme.spacing(2)}`,
  padding: '0.5rem',
  textDecoration: 'underline !important',
}));
