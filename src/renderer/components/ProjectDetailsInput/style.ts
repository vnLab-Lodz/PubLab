import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const GridContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '0.5fr 1fr',
  gap: '2rem',
});
