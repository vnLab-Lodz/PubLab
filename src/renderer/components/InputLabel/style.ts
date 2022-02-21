import { InputLabel as MUIInputLabel, styled } from '@mui/material';

export const InputLabel = styled(MUIInputLabel)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  margin: theme.spacing(2, 0),
}));
