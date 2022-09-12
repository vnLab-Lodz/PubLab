import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography, Box } from '@mui/material';
import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import { useFormik } from 'formik';
import { sendNotification } from 'src/shared/redux/slices/notificationsSlice';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import Button from '../../components/Button/Button';
import DirectoryPicker from '../../components/DirectoryPicker/DirectoryPicker';
import { VIEWS } from '../../constants/Views';
import { updateCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { setLocalStorageItem } from '../../../shared/redux/helpers/localStorage';
import { validationSchema } from './validationSchema';
import * as Styled from './style';

const FirstTime = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [path, setPath] = useState(false);

  const formik = useFormik({
    initialValues: { dir: '' },
    validationSchema,
    onSubmit: () => {
      setLocalStorageItem('initialConfigFlag', true);
      dispatch(updateCurrentView(VIEWS.PROJECTS_LIST));
    },
  });

  const pickDirectory = () => {
    const { dialog } = require('electron').remote;

    dialog
      .showOpenDialog({ properties: ['openDirectory'] })
      .then(({ filePaths }: any) => {
        ipcRenderer.invoke(CHANNELS.SETTINGS.SAVE, {
          defaultDirPath: filePaths[0],
        });
        if (filePaths[0] !== undefined) setPath(true);
        formik.setFieldValue('dir', filePaths[0]);
      });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    formik.setFieldValue('dir', value);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    if (formik.isValid) {
      ipcRenderer.invoke(CHANNELS.SETTINGS.SAVE, {
        defaultDirPath: event.target.value,
      });
      return;
    }

    dispatch(
      sendNotification({
        type: 'error',
        message: t('notifications.directory_not_existing', {
          dir: event.target.value,
        }),
        autoDismiss: true,
        delay: 6000,
      })
    );
  };

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography variant='h1' sx={{ fontWeight: 'bold' }}>
          {t('first-time-view.title')}
        </Typography>
        <Typography variant='h1' sx={{ marginTop: '9rem' }}>
          {t('first-time-view.welcome')}
        </Typography>
        <Typography variant='h1' sx={{ marginTop: '2.725rem' }}>
          {t('first-time-view.message')}
        </Typography>

        <Box>
          {!path ? (
            <Button
              fullWidth
              variant='contained'
              textCase='uppercase'
              sx={{ marginTop: '9rem', height: '4.5rem' }}
              onClick={pickDirectory}
            >
              {t('common.choose')}
            </Button>
          ) : (
            <Box sx={{ marginTop: '9rem' }}>
              <DirectoryPicker
                buttonText={t('common.change')}
                error={!!formik.errors.dir}
                value={formik.values.dir}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={pickDirectory}
              />
              <Styled.SubmitButton
                disabled={!formik.isValid}
                variant='contained'
                color='green'
                isMajor
                fullWidth
                onClick={() => formik.handleSubmit()}
              >
                {t('common.go')}
              </Styled.SubmitButton>
            </Box>
          )}
        </Box>
      </ViewContent>
    </ThemeProvider>
  );
};

export default FirstTime;
