import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOTIFICATION_INTERVAL } from '../../../../../shared/redux/slices/settingsSlice';
import InputLabel from '../../../../components/InputLabel/InputLabel';
import Select from '../../../../components/Select/Select';

interface Props {
  currentInterval: NOTIFICATION_INTERVAL;
  onChange: (interval: NOTIFICATION_INTERVAL) => void;
}

export default function NotificationIntervalSelect({
  currentInterval,
  onChange,
}: Props) {
  const { t } = useTranslation();

  function generateIntervalOptions() {
    return Object.values(NOTIFICATION_INTERVAL).map((interval) => (
      <MenuItem key={interval} value={interval}>
        <Typography variant='h3'>
          {t(`AppSettings.notifications.intervals.${interval}` as const)}
        </Typography>
      </MenuItem>
    ));
  }

  return (
    <div>
      <InputLabel id='interval-select-label'>
        {t('AppSettings.notifications.notifications')}:
      </InputLabel>
      <Select
        labelId='interval-select-label'
        title={t('AppSettings.notifications.notifications')}
        value={currentInterval}
        onChange={(e) => onChange(e.target.value as NOTIFICATION_INTERVAL)}
        fullWidth
      >
        {generateIntervalOptions()}
      </Select>
    </div>
  );
}
