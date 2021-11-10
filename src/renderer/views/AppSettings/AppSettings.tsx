import React, { useReducer } from 'react';
import './AppSettings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import {
  selectAllSettings,
  setAllSettings,
  Settings,
} from '../../../shared/redux/slices/settingsSlice';
import AppUpdate from './subcomponents/AppUpdate';
import LangSelect from './subcomponents/LangSelect';

const AppSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [settings, changeSetting] = useReducer(
    handleSettingChange,
    useSelector(selectAllSettings)
  );

  function submitChanges() {
    dispatch(setAllSettings(settings));
  }

  return (
    <div>
      {t('AppSettings.title')}
      <AppUpdate />
      <LangSelect
        currentLocale={settings.currentLocale}
        onChange={(locale) => changeSetting({ currentLocale: locale })}
      />
      <Button onClick={() => submitChanges()}>{t('common.save')}</Button>
    </div>
  );
};

export default AppSettings;

function handleSettingChange(
  state: Settings,
  change: Partial<Settings>
): Settings {
  return { ...state, ...change };
}
