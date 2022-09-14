import { styled, IconButton as MuiIconButton } from '@mui/material';

const IconButton = styled(MuiIconButton)(({ theme }) => ({
  borderRadius: 0,
  color: 'text.primary',

  '&:hover': {
    background: `${theme.palette.text.primary}10`,
  },

  '&:disabled': {
    opacity: 0.5,
  },
}));

export default IconButton;
