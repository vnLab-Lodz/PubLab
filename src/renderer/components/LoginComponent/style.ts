import { Box, styled } from '@mui/material';
import ViewContentBase from '../ViewContent/ViewContent';

export const ViewContent = styled(ViewContentBase)(({ theme }) => ({
  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    padding: theme.spacing(1, 0),
  },
}));

export const LangBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  '& > *:not(:first-of-type)::before': {
    content: '"/"',
    fontSize: theme.typography.body1.fontSize,
  },
  marginTop: theme.spacing(1),
}));

export const ContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  margin: theme.spacing(2, 0),
}));
