import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography } from '@mui/material';
import { altTheme } from '../../theme';
import ViewContentBase from '../../components/ViewContent/ViewContent';
import CollabPicker from '../../components/CollabPicker/CollabPicker';

const AddColaborators = () => {
  const { t } = useTranslation();
  const options = [
    {
      value: 'programmer',
      label: 'Programmer',
    },
    {
      value: 'editor',
      label: 'Editor',
    },
  ];
  return (
    <ThemeProvider theme={altTheme}>
      <ViewContentBase>
        <Typography
          variant='h1'
          sx={{
            color: (theme) => theme.palette.text.primary,
            marginBottom: '8.5rem',
          }}
        >
          {t('AddColaborators.title')}
        </Typography>
        <CollabPicker
          options={options}
          buttonText='ADD'
          selectPlaceholder='Role'
          textFieldPlaceholder='Username...'
        />
      </ViewContentBase>
    </ThemeProvider>
  );
};

export default AddColaborators;
