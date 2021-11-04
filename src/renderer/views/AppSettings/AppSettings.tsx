import React from 'react';
import './AppSettings.scss';
import { useTranslation } from 'react-i18next';

const AppSettings = () => {
  const { t } = useTranslation();

  return <div>{t('AppSettings.title')}</div>;
};
export default AppSettings;
