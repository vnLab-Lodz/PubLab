import { Box, styled } from '@mui/material';
import TextField from '../../../../components/TextField/TextField';

export const SnippetHeader = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginBottom: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const SnippetName = styled(TextField)({
  borderBottom: 'none',
  '& .MuiInputBase-input': { padding: '0.5rem' },
});

export const ListItem = styled('li')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(3),
}));
