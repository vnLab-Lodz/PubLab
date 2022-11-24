import { styled, Box, Button } from '@mui/material';
import Select from 'src/renderer/components/Select/Select';

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

export const HeaderFilterSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&&& .MuiSelect-select': {
    fontSize: theme.typography.caption.fontSize,
    padding: '0',
    paddingRight: '1.5rem',
  },
  '& .MuiSelect-icon': {
    right: '-0.5rem',
  },
}));
