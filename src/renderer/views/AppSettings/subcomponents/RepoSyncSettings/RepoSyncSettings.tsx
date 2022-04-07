import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InputLabel from 'src/renderer/components/InputLabel/InputLabel';
import Section from 'src/renderer/components/Section/Section';
import StyledSwitch from 'src/renderer/components/Switch/Switch';
import { SyncLocations } from 'src/shared/redux/slices/settingsSlice';

interface Props {
  locations: SyncLocations;
  setFieldValue: (field: string, value: boolean) => void;
}

const RepoSyncSettings: React.FC<Props> = ({ locations, setFieldValue }) => {
  const { t } = useTranslation();

  return (
    <Section>
      <InputLabel>{t('AppSettings.repoSync.title')}</InputLabel>
      {locations.map((org, index, { length }) => (
        <Box key={org.name} mb={index < length - 1 ? '2.7rem' : undefined}>
          <StyledSwitch
            size='small'
            checked={org.enabled}
            onChange={() => {
              setFieldValue(`syncLocations[${index}].enabled`, !org.enabled);
            }}
          />
          <Typography ml='1rem'>{org.name}</Typography>
        </Box>
      ))}
    </Section>
  );
};

export default RepoSyncSettings;
