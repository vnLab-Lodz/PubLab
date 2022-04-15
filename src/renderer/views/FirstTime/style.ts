import { styled } from '@mui/material';
import Button from 'src/renderer/components/Button/Button';

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: '9rem',
  height: '6rem',
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.6,
    color: 'text.secondary',
    background: theme.palette.green.main,
  },
}));
