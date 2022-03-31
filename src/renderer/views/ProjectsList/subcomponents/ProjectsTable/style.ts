import { styled, Box, Button } from '@mui/material';

export const HighlightBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.primary.main}`,
  position: 'absolute',
  height: '100%',
  width: '80vw',
  left: '3rem',
  top: 0,
  zIndex: -1,
}));

export const RowButton = styled(Button)({
  margin: '0 -0.5rem 4.5rem',
  padding: '0.5rem',
});
