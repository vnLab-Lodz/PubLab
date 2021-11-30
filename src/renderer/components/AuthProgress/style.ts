import { Box, styled } from '@mui/material';

export const LogoImg = styled('img')({
  marginBottom: '2.5rem',
});

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column',
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));
