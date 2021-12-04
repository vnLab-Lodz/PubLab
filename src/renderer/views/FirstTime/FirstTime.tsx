import React, { useReducer, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './FirstTime.scss';
import { ThemeProvider, Typography } from '@mui/material';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import Button from '../../components/Button/Button';
import {
  saveSettingsAsync,
  selectAllSettings,
  Settings,
} from '../../../shared/redux/slices/settingsSlice';
import DirectoryPicker from '../../components/DirectoryPicker/DirectoryPicker';
import { VIEWS } from '../../constants/Views';
import { updateCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import {
  loadFirstTimeFlag,
  saveFirstTimeFlag,
} from '../../../shared/redux/helpers/localStorage';

function handleSettingChange(
  state: Settings,
  change: Partial<Settings>
): Settings {
  return { ...state, ...change };
}

const FirstTime = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { dialog } = require('electron').remote;
  const [path, setPath] = useState(false);
  const [dir, setDir] = useState('');

  useReducer(handleSettingChange, useSelector(selectAllSettings));

  useEffect(() => {
    if (loadFirstTimeFlag() !== true)
      dispatch(updateCurrentView(VIEWS.PROJECT));
  }, []);

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography
          variant='h1'
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontWeight: 'bold',
          }}
        >
          {t('first-time-view.title')}
        </Typography>
        <Typography
          variant='h1'
          sx={{
            color: (theme) => theme.palette.text.primary,
            marginTop: '90px',
          }}
        >
          {t('first-time-view.welcome')}
        </Typography>
        <Typography
          variant='h1'
          sx={{
            color: (theme) => theme.palette.text.primary,
            marginTop: '27.25px',
          }}
        >
          {t('first-time-view.message')}
        </Typography>

        <div>
          {!path ? (
            <Button
              variant='contained'
              textCase='uppercase'
              fontWeight='light'
              fullWidth
              sx={{
                marginTop: '90px',
                height: '45px',
                fontSize: '13px',
              }}
              onClick={() => {
                dialog
                  .showOpenDialog({
                    properties: ['openDirectory'],
                  })
                  .then(({ filePaths }: any) => {
                    dispatch(
                      saveSettingsAsync({ defaultDirPath: filePaths[0] })
                    );
                    if (filePaths[0] !== undefined) setPath(true);
                    setDir(filePaths[0]);
                  });
              }}
            >
              {t('common.choose')}
            </Button>
          ) : (
            <div style={{ marginTop: '90px' }}>
              <DirectoryPicker
                buttonText='CHANGE'
                value={dir}
                onChange={(p: any) => {
                  saveSettingsAsync({ defaultDirPath: p });
                  setDir(p.target.value);
                }}
                onClick={() => {
                  dialog
                    .showOpenDialog({
                      properties: ['openDirectory'],
                    })
                    .then(({ filePaths }: any) => {
                      dispatch(
                        saveSettingsAsync({ defaultDirPath: filePaths[0] })
                      );
                      setDir(filePaths[0]);
                    });
                }}
              />
              <Button
                disabled={dir === ''}
                variant='contained'
                color='green'
                textCase='uppercase'
                fontWeight='bold'
                fullWidth
                typographyVariant='h3'
                sx={{
                  marginTop: '90px',
                  height: '60px',
                }}
                onClick={() => {
                  saveFirstTimeFlag(false);
                  dispatch(updateCurrentView(VIEWS.PROJECTS_LIST));
                }}
              >
                {t('common.go')}
              </Button>
            </div>
          )}
        </div>
      </ViewContent>
    </ThemeProvider>
  );
};

export default FirstTime;
