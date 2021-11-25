import { Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getVersionDetails } from '../../../../shared/utils/versionDetails';

export default function AppUpdate() {
  const { t } = useTranslation();
  const versionDetails = getVersionDetails();
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
