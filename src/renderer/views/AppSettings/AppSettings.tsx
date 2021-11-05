import React, { useState } from 'react';
import './AppSettings.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, MenuItem, Select } from '@mui/material';
import {
  selectCurrentLocale,
  setLocale,
} from '../../../shared/redux/slices/settingsSlice';

const AppSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [language, setLanguage] = useState(useSelector(selectCurrentLocale));

  function submitChanges() {
    dispatch(setLocale(language));
  }

  return (
    <div>
      {t('AppSettings.title')}
      <Select
        label={t('AppSettings.language')}
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'pl')}
      >
        <MenuItem value='en'>{t('AppSettings.language.english')}</MenuItem>
        <MenuItem value='pl'>{t('AppSettings.language.polish')}</MenuItem>
      </Select>
      <Button onClick={() => submitChanges()}>{t('common.save')}</Button>
    </div>
  );
};

export default AppSettings;
