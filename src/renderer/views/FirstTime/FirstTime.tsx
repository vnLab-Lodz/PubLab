import React, { useReducer, useState } from 'react';
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

  const [settings, changeSetting] = useReducer(
    handleSettingChange,
    useSelector(selectAllSettings)
  );

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography
          variant='h4'
          sx={{
            color: (theme) => theme.palette.text.primary,
            marginTop: '20px',
            fontWeight: 'bold',
          }}
        >
          {t('first-time-view.title')}
        </Typography>
        <Typography
          variant='h4'
          sx={{
            color: (theme) => theme.palette.text.primary,
            marginTop: '102px',
          }}
        >
          {t('first-time-view.welcome')}
        </Typography>
        <Typography
          variant='h4'
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
              fullWidth={true}
              sx={{
                marginTop: '78px',
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
                    setDir(settings.defaultDirPath);
                  });
              }}
            >
              {t('first-time-view.button')}
            </Button>
          ) : (
            <div style={{ marginTop: '78px' }}>
              <DirectoryPicker
                buttonText='CHANGE'
                value={dir}
                onChange={(path: any) => {
                  saveSettingsAsync({ defaultDirPath: path });
                  setDir(path.target.value);
                }}
              />
              <Button
                disabled={dir === '' ? true : false}
                variant='contained'
                color='green'
                textCase='uppercase'
                fontWeight='bold'
                fullWidth={true}
                sx={{
                  marginTop: '135px',
                  height: '60px',
                  fontSize: '13px',
                }}
                onClick={() => {
                  dispatch(updateCurrentView(VIEWS.PROJECTS_LIST));
                }}
              >
                LET'S GO
              </Button>
            </div>
          )}
        </div>
      </ViewContent>
    </ThemeProvider>
  );
};

export default FirstTime;
