import { Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectVersionDetails } from '../../../../shared/redux/slices/settingsSlice';

export default function AppUpdate() {
  const { t } = useTranslation();
  const versionDetails = useSelector(selectVersionDetails);
  return (
    <>
      <Typography>
        {t('AppSettings.updates.version')} {versionDetails.version}
      </Typography>

      {!versionDetails.isUpToDate && (
        <>
          <Typography>
            {t('AppSettings.updates.newVersionAvailable')}
          </Typography>
          <Button>{t('AppSettings.updates.update')}</Button>
        </>
      )}
    </>
  );
}

// TODO: implement update logic
