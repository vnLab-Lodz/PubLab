import { Button, InputLabel, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { dialog } = require('electron').remote;

interface Props {
  defaultDirPath: string;
  onChange: (newDirPath: string) => void;
}

export default function DefaultDirSelect({ defaultDirPath, onChange }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <InputLabel id='dir-select-label'>
        {t('AppSettings.defaultDirectory.description')}
      </InputLabel>
      <TextField label='dir-select-label' value={defaultDirPath} />
      <Button
        onClick={() => {
          dialog
            .showOpenDialog({ properties: ['openDirectory'] })
            .then(({ filePaths }: any) => onChange(filePaths[0]));
        }}
      >
        {t('common.change')}
      </Button>
    </>
  );
}
