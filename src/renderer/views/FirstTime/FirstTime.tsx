import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography, Box } from '@mui/material';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import Button from '../../components/Button/Button';
import { saveSettingsAsync } from '../../../shared/redux/slices/settingsSlice';
import DirectoryPicker from '../../components/DirectoryPicker/DirectoryPicker';
import { VIEWS } from '../../constants/Views';
import { updateCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { setLocalStorageItem } from '../../../shared/redux/helpers/localStorage';

const FirstTime = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [path, setPath] = useState(false);
  const [dir, setDir] = useState('');

  const pickDirectory = () => {
    const { dialog } = require('electron').remote;

    dialog
      .showOpenDialog({ properties: ['openDirectory'] })
      .then(({ filePaths }: any) => {
        dispatch(saveSettingsAsync({ defaultDirPath: filePaths[0] }));
        if (filePaths[0] !== undefined) setPath(true);
        setDir(filePaths[0]);
      });
  };

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography variant='h1' sx={{ fontWeight: 'bold' }}>
          {t('first-time-view.title')}
        </Typography>
        <Typography variant='h1' sx={{ marginTop: '9rem' }}>
          {t('first-time-view.welcome')}
        </Typography>
        <Typography variant='h1' sx={{ marginTop: '2.725rem' }}>
          {t('first-time-view.message')}
        </Typography>

        <Box>
          {!path ? (
            <Button
              fullWidth
              variant='contained'
              textCase='uppercase'
              sx={{ marginTop: '9rem', height: '4.5rem' }}
              onClick={pickDirectory}
            >
              {t('common.choose')}
            </Button>
          ) : (
            <Box sx={{ marginTop: '9rem' }}>
              <DirectoryPicker
                buttonText={t('common.change')}
                value={dir}
                onChange={(event) => {
                  const { value } = event.target;
                  saveSettingsAsync({ defaultDirPath: value });
                  setDir(value);
                }}
                onClick={pickDirectory}
              />
              <Button
                disabled={dir === ''}
                variant='contained'
                color='green'
                isMajor
                fullWidth
                sx={{
                  marginTop: '9rem',
                  height: '6rem',
                  ':disabled': {
                    cursor: 'not-allowed',
                    opacity: 0.6,
                    color: 'text.secondary',
                    background: (theme) => theme.palette.green.main,
                  },
                }}
                onClick={() => {
                  setLocalStorageItem('initialConfigFlag', false);
                  dispatch(updateCurrentView(VIEWS.PROJECTS_LIST));
                }}
              >
                {t('common.go')}
              </Button>
            </Box>
          )}
        </Box>
      </ViewContent>
    </ThemeProvider>
  );
};

export default FirstTime;
