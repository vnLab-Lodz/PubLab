import { Box, Button, styled } from '@mui/material';

export const NavBar = styled(Box)<{ isExpanded?: boolean }>(
  ({ theme, isExpanded }) => ({
    position: 'relative',
    boxSizing: 'border-box',
    maxHeight: '100vh',
    flex: '0 22rem,',
    minWidth: isExpanded ? '22rem' : '7.4rem',
    maxWidth: isExpanded ? '22rem' : '7.4rem',
    padding: '1rem 4px',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRight: `1px solid ${theme.palette.primary.main}`,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

    background: theme.palette.background.default,

    transition: 'all 0.3s',

    '&::-webkit-scrollbar': {
      width: '0.6rem',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: 'inherit',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#505050',
      borderRadius: '1rem',
    },
  })
);

export const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'start',
  width: '100%',
  padding: '0.4rem 1.2rem 0.4rem 0',
  margin: '0.7rem 0',
  cursor: 'pointer',
  borderRadius: '0.8rem',
  textTransform: 'none',
  whiteSpace: 'nowrap',

  '& .MuiButton-startIcon': {
    position: 'relative',
    minWidth: '7.4rem',
    height: '4.8rem',
    color: theme.palette.text.primary,
    fontSize: '1.5rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > img': {
      height: '100%',
      width: '4.8rem',
      borderRadius: '50%',
      position: 'relative',
      bottom: '0.2rem',
    },
    '&::after': {
      content: '" "',
      position: 'absolute',
      bottom: '0.2rem',
      width: '3.2rem',
      height: '1px',
      background: isActive ? theme.palette.primary.main : 'transparent',
    },
  },
}));

export const ExpandHandle = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '20px',

  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
  },
});
