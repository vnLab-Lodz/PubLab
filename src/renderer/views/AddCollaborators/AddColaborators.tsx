import React from 'react';
import { ThemeProvider, Typography } from '@mui/material';
import { altTheme } from '../../theme';
import ViewContentBase from '../../components/ViewContent/ViewContent';

const AddColaborators = () => (
  <ThemeProvider theme={altTheme}>
    <ViewContentBase>
      <Typography
        variant='h1'
        sx={{
          color: (theme) => theme.palette.text.primary,
          marginBottom: '8.5rem',
        }}
      >
        Would you like to add colaborators?
      </Typography>
    </ViewContentBase>
  </ThemeProvider>
);

export default AddColaborators;
