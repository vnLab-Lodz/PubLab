import { Box, styled } from '@mui/material';

export const DataContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.gray.main}`,
}));

export const DataField = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.gray.main}`,
  padding: `0.2rem ${theme.spacing(1)}`,
  overflow: 'hidden',
}));
