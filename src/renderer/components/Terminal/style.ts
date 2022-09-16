import { Box, styled } from '@mui/material';

export const TerminalContainer = styled(Box)(({ theme }) => ({
  height: '50rem',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: `1px solid ${theme.palette.primary.main}`,
}));
