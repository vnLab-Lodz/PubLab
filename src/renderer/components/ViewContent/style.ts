import { Box, styled } from '@mui/material';

export const BackgroundWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const ContentBox = styled(Box)(() => ({
  minWidth: '400px',
  width: '50vw',
}));