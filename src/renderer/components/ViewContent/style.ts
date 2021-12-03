import { Box, styled } from '@mui/material';

export const BackgroundWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const ContentBox = styled(Box)(() => ({
  minWidth: '400px',
  width: '50vw',
  paddingTop: '2rem',
  paddingBottom: '12rem',
}));
