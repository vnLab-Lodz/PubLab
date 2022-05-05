import { Box, styled } from '@mui/material';

export const BackgroundWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflowY: 'auto',
  overflowX: 'hidden',

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

export const MainContentBox = styled(Box)(() => ({
  minWidth: '400px',
  width: '50vw',
  marginTop: '2rem',
  marginBottom: '12rem',
  position: 'relative',
}));

export const SubviewContentBox = styled(Box)(() => ({
  margin: '2rem 2rem 12rem',
  width: '100%',
  position: 'relative',
}));
