import Switch from '@mui/material/Switch';
import { styled } from '@mui/material';

const StyledSwitch = styled(Switch)(({ theme, size }) => ({
  width: size === 'small' ? 40 : 60,
  height: size === 'small' ? 24 : 30,
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
  },

  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: 'transparent',
    opacity: 1,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export default StyledSwitch;
