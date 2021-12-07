import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography } from '@mui/material';
import {
  saveSettingsAsync,
  selectAllSettings,
  Settings,
} from '../../../shared/redux/slices/settingsSlice';
import AppUpdate from './subcomponents/AppUpdate/AppUpdate';
import LangSelect from './subcomponents/LangSelect/LangSelect';
import DefaultDirSelect from './subcomponents/DefaultDirSelect/DefaultDirSelect';
import NotificationIntervalSelect from './subcomponents/NotifIntervalSelect/NotifIntervalSelect';
import { altTheme } from '../../theme';
import * as Styled from './style';
import Button from '../../components/Button/Button';

const AppSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [settings, changeSetting] = useReducer(
    handleSettingChange,
    useSelector(selectAllSettings)
  );

  function submitChanges() {
    dispatch(saveSettingsAsync(settings));
  }

  return (
    <ThemeProvider theme={altTheme}>
      <Styled.ViewContent>
        <Typography
          variant='h1'
          sx={{
            color: (theme) => theme.palette.text.primary,
            marginBottom: '8.5rem',
          }}
        >
          {t('AppSettings.title')}
        </Typography>
        <AppUpdate />
        <LangSelect
          currentLocale={settings.currentLocale}
          onChange={(locale) => changeSetting({ currentLocale: locale })}
        />
        <DefaultDirSelect
          defaultDirPath={settings.defaultDirPath}
          onChange={(path) => changeSetting({ defaultDirPath: path })}
        />
        <NotificationIntervalSelect
          currentInterval={settings.notificationInterval}
          onChange={(interval) =>
            changeSetting({ notificationInterval: interval })
          }
        />
        <Button
          onClick={() => submitChanges()}
          variant='contained'
          color='green'
          typographyVariant='h3'
          fontWeight='bold'
          fullWidth
        >
          {t('common.save')}
        </Button>
      </Styled.ViewContent>
    </ThemeProvider>
  );
};

export default AppSettings;

function handleSettingChange(
  state: Settings,
  change: Partial<Settings>
): Settings {
  return { ...state, ...change };
}
