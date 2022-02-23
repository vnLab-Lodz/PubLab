import { Box, styled } from '@mui/material';

export const LogoImg = styled('img')(({ theme }) => ({
  display: 'block',
  margin: theme.spacing(2),
  marginTop: 0,
}));

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const UpdatePromptContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  width: '100%',
}));
