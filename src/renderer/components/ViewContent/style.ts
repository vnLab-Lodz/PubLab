import { Box, styled } from '@mui/material';

export const BackgroundWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '0.6rem',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: 'inherit',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#505050',
    borderRadius: '1rem',
  },
}));

export const ContentBox = styled(Box)(() => ({
  minWidth: '400px',
  width: '50vw',
  paddingTop: '2rem',
  paddingBottom: '12rem',
}));
