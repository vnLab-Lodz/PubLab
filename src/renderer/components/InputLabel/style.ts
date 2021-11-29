import { InputLabel, styled } from '@mui/material';

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  textTransform: 'uppercase',
  marginBottom: '2.07em',
  marginTop: '4.615em',
  color: theme.palette.text.primary,
}));
