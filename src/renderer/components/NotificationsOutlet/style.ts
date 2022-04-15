import { Box, styled } from '@mui/material';

export const NotificationsContainer = styled(Box)({
  zIndex: 2,
  position: 'fixed',
  top: '0',
  right: '0',
  maxHeight: '100vh',
  height: 'fit-content',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});
