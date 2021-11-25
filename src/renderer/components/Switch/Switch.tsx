import Switch from '@mui/material/Switch';
import { styled } from '@mui/material';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 40,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    height: '100%',
    marginLeft: '10%',
    transitionDuration: '300ms',
    borderColor: theme.palette.lightGray.main,
    '&.Mui-checked': {
      transform: 'translateX(160%)',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.green.main,
        opacity: 1,
      },
    },
  },

  '& .MuiSwitch-thumb': {
    width: 25,
    height: 25,
    color: theme.palette.lightGray.main,
  },

  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: 'transparent',
    opacity: 1,
    border: `1px solid ${theme.palette.lightGray.main}`,
  },
}));

export default StyledSwitch;
