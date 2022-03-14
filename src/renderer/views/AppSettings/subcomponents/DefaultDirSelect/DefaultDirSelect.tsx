import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DirectoryPicker from '../../../../components/DirectoryPicker/DirectoryPicker';
import InputLabel from '../../../../components/InputLabel/InputLabel';
import Section from '../../../../components/Section/Section';

const { dialog } = require('electron').remote;

interface Props {
  defaultDirPath: string;
  onChange: (newDirPath: string) => void;
  error?: boolean;
  helperText?: string;
}

const DefaultDirSelect = ({
  defaultDirPath,
  onChange,
  error,
  helperText,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Section>
      <InputLabel id='dir-select-label' error={error}>
        {t('AppSettings.defaultDirectory.description')}:
      </InputLabel>
      <DirectoryPicker
        buttonText={t('common.change')}
        labelledBy='dir-select-label'
        value={defaultDirPath}
        onClick={() => {
          dialog
            .showOpenDialog({ properties: ['openDirectory'] })
            .then(({ filePaths }: any) => onChange(filePaths[0]));
        }}
        onChange={(e) => onChange(e.target.value)}
        error={error}
      />
      <Typography
        variant='body2'
        component='p'
        color='error'
        mt={1}
        sx={{ float: 'left' }}
      >
        {helperText}
      </Typography>
    </Section>
  );
};

DefaultDirSelect.defaultProps = {
  error: false,
  helperText: '',
};

export default DefaultDirSelect;
