import Switch from '@mui/material/Switch';
import { styled } from '@mui/material';

const StyledSwitch = styled(Switch)(({ theme, size }) => ({
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
        backgroundColor: theme.palette.green.main,
        opacity: 1,
      },
    },
  },

  '& .MuiSwitch-thumb': {
    color: theme.palette.primary.main,
    width: size === 'small' ? '1.6rem' : '2rem',
    height: size === 'small' ? '1.6rem' : '2rem',
  },

  '& .MuiSwitch-track': {
    borderRadius: '2rem',
    backgroundColor: 'transparent',
    opacity: 1,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default StyledSwitch;
