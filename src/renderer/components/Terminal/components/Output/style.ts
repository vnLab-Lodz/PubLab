import { Box, styled } from '@mui/material';

export const XTermContainer = styled(Box)(() => ({
  flex: '1 0 auto',

  '.xterm-viewport::-webkit-scrollbar': {
    width: '0.6rem',
  },

  '.xterm-viewport::-webkit-scrollbar-track': {
    backgroundColor: 'inherit',
  },

  '.xterm-viewport::-webkit-scrollbar-thumb': {
    backgroundColor: '#505050',
    borderRadius: '1rem',
  },
}));
