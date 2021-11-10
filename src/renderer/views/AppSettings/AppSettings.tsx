import React, { useState } from 'react';
import './AppSettings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import {
  selectCurrentLocale,
  setLocale,
} from '../../../shared/redux/slices/settingsSlice';
import { supportedLocales } from '../../internationalisation/i18next';
import AppUpdate from './subcomponents/AppUpdate';

const AppSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(useSelector(selectCurrentLocale));

  function submitChanges() {
    dispatch(setLocale(language));
  }

  function generateLangOptions() {
    return supportedLocales.map((locale) => (
      <MenuItem key={locale} value={locale}>
        {t(`AppSettings.language.${locale}` as const)}
      </MenuItem>
    ));
  }
  return (
    <div>
      {t('AppSettings.title')}
      <AppUpdate />
      <InputLabel id='lang-select-label'>
        {t('AppSettings.language.language')}
      </InputLabel>
      <Select
        labelId='lang-select-label'
        title={t('AppSettings.language.language')}
        value={language}
        onChange={(e) => setLanguage(e.target.value as typeof language)}
      >
        {generateLangOptions()}
      </Select>
      <Button onClick={() => submitChanges()}>{t('common.save')}</Button>
    </div>
  );
};

export default AppSettings;
