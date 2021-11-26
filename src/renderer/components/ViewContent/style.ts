import { Box, styled } from '@mui/material';

export const BackgroundWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const ContentBox = styled(Box)(() => ({
  minWidth: '400px',
  width: '50vw',
}));
