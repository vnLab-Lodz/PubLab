import { Box, styled } from '@mui/material';

export const LogoImg = styled('img')(() => ({
  display: 'block',
  margin: '3rem',
}));

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const UpdatePromptContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '8.3rem',
  width: '100%',
}));
