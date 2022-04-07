import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import {
  selectAllSettings,
  Settings,
} from 'src/shared/redux/slices/settingsSlice';
import AppUpdate from './subcomponents/AppUpdate/AppUpdate';
import LangSelect from './subcomponents/LangSelect/LangSelect';
import DefaultDirSelect from './subcomponents/DefaultDirSelect/DefaultDirSelect';
import NotificationIntervalSelect from './subcomponents/NotifIntervalSelect/NotifIntervalSelect';
import { altTheme } from '../../theme';
import Button from '../../components/Button/Button';
import ViewContent from '../../components/ViewContent/ViewContent';
import { validationSchema } from './validationSchema';
import RepoSyncSettings from './subcomponents/RepoSyncSettings/RepoSyncSettings';

const AppSettings = () => {
  const { t } = useTranslation();

  const formik = useFormik<Settings>({
    initialValues: useSelector(selectAllSettings),
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      ipcRenderer.invoke(CHANNELS.SETTINGS.SAVE, values);
      setSubmitting(false);
    },
  });

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography variant='h1' mb={4}>
          {t('AppSettings.title')}
        </Typography>
        <AppUpdate />
        <form onSubmit={formik.handleSubmit}>
          <LangSelect
            currentLocale={formik.values.currentLocale}
            onChange={(value) => {
              formik.setFieldValue('currentLocale', value);
            }}
          />
          <DefaultDirSelect
            defaultDirPath={formik.values.defaultDirPath}
            error={Boolean(formik.errors.defaultDirPath)}
            helperText={
              formik.errors.defaultDirPath
                ? t(formik.errors.defaultDirPath as any)
                : undefined
            }
            onChange={(value) => {
              formik.setFieldValue('defaultDirPath', value);
            }}
          />
          <NotificationIntervalSelect
            currentInterval={formik.values.notificationInterval}
            onChange={(value) => {
              formik.setFieldValue('notificationInterval', value);
            }}
          />
          <RepoSyncSettings
            locations={formik.values.syncLocations}
            setFieldValue={formik.setFieldValue}
          />
          <Button
            type='submit'
            variant='contained'
            color='green'
            isMajor
            fullWidth
            disabled={!formik.isValid}
          >
            {t('common.save')}
          </Button>
        </form>
      </ViewContent>
    </ThemeProvider>
  );
};

export default AppSettings;
