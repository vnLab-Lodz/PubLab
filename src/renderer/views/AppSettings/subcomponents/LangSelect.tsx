import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  SupportedLangCode,
  supportedLocales,
} from '../../../internationalisation/i18next';

interface Props {
  currentLocale: SupportedLangCode;
  onChange: (locale: SupportedLangCode) => void;
}

export default function LangSelect({ currentLocale, onChange }: Props) {
  const { t } = useTranslation();

  function generateLangOptions() {
    return supportedLocales.map((locale) => (
      <MenuItem key={locale} value={locale}>
        {t(`AppSettings.language.${locale}` as const)}
      </MenuItem>
    ));
  }

  return (
    <>
      <InputLabel id='lang-select-label'>
        {t('AppSettings.language.language')}
      </InputLabel>
      <Select
        labelId='lang-select-label'
        title={t('AppSettings.language.language')}
        value={currentLocale}
        onChange={(e) => onChange(e.target.value as SupportedLangCode)}
      >
        {generateLangOptions()}
      </Select>
    </>
  );
}
