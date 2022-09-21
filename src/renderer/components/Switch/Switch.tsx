import Switch from '@mui/material/Switch';
import { styled } from '@mui/material';

const StyledSwitch = styled(Switch)(({ theme, size, disabled }) => ({
  width: size === 'small' ? '4rem' : '6rem',
  height: size === 'small' ? '2.4rem' : '3rem',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    height: '100%',
    marginLeft: '10%',
    transitionDuration: '300ms',
    borderColor: theme.palette.primary.main,
    '&.Mui-checked': {
      transform: size === 'small' ? 'translate(16px)' : 'translateX(150%)',
      '& + .MuiSwitch-track': {
        backgroundColor: disabled ? '#002f23' : theme.palette.green.main,
        opacity: 1,
      },
    },
  },

  '& .MuiSwitch-thumb': {
    color: disabled ? theme.palette.text.disabled : theme.palette.primary.main,
    opacity: disabled ? 1 : 1,
    width: size === 'small' ? '1.6rem' : '2rem',
    height: size === 'small' ? '1.6rem' : '2rem',
  },

  '& .MuiSwitch-track': {
    borderRadius: '2rem',
    backgroundColor: 'transparent',
    border: `1px solid ${
      disabled ? theme.palette.text.disabled : theme.palette.primary.main
    }`,
    opacity: disabled ? 1 : 1,
  },
}));

export default StyledSwitch;
