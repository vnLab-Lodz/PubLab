import { styled, Button as MUIButton } from '@mui/material';

export const Button = styled(MUIButton)(() => ({
  borderRadius: 0,
  boxShadow: 'none',
  padding: 0,
  ':hover': {
    boxShadow: 'none',
  },
}));
