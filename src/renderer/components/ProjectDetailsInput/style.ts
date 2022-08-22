import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GridContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '0.375fr 1fr',
  gap: '5rem',
});

export const LeftColumn = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
