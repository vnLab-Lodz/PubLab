import React from 'react';
import './AppSettings.scss';
import { useTranslation } from 'react-i18next';

const AppSettings = () => {
  const { t } = useTranslation();

  return <div>{t('App Settings')}</div>;
};
export default AppSettings;
