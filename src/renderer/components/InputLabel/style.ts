import { InputLabel as MUIInputLabel, styled } from '@mui/material';

export const InputLabel = styled(MUIInputLabel)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  marginBottom: '2.07em',
  marginTop: '2.07em',
}));
