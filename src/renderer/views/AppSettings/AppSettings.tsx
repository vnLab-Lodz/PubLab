import React, { useReducer } from 'react';
import './AppSettings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import {
  saveSettingsAsync,
  selectAllSettings,
  Settings,
} from '../../../shared/redux/slices/settingsSlice';
import AppUpdate from './subcomponents/AppUpdate';
import LangSelect from './subcomponents/LangSelect';
import DefaultDirSelect from './subcomponents/DefaultDirSelect';
import NotificationIntervalSelect from './subcomponents/NotifIntervalSelect';
import ViewContent from '../../components/ViewContent/ViewContent';

const AppSettings = () => {
  const color = useTheme().palette.black;

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
    <ViewContent sx={{ backgroundColor: color.main }}>
      {t('AppSettings.title')}
      <AppUpdate />
      <LangSelect
        currentLocale={settings.currentLocale}
        onChange={(locale) => changeSetting({ currentLocale: locale })}
      />
      <DefaultDirSelect
        defaultDirPath={settings.defaultDirPath}
        onChange={(path) => changeSetting({ defaultDirPath: path })}
      />
      <Button style={{ display: 'block' }} onClick={() => submitChanges()}>
        {t('common.save')}
      </Button>
      <NotificationIntervalSelect
        currentInterval={settings.notificationInterval}
        onChange={(interval) =>
          changeSetting({ notificationInterval: interval })
        }
      />
      <Button onClick={() => submitChanges()}>{t('common.save')}</Button>
    </ViewContent>
  );
};

export default AppSettings;

function handleSettingChange(
  state: Settings,
  change: Partial<Settings>
): Settings {
  return { ...state, ...change };
}
