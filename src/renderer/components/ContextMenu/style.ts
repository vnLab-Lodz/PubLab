import { Menu as MUIMenu, styled } from '@mui/material';

export const Menu = styled(MUIMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 0,
    backgroundColor: theme.palette.background.default,
  },
}));
