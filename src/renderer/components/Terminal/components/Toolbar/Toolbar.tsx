import { Typography } from '@mui/material';
import { ipcRenderer } from 'electron';
import React, { useState } from 'react';
import { CHANNELS } from 'src/shared/types/api';
import { LocalPublication } from 'src/shared/types';
import 'xterm/css/xterm.css';
import {
  Block,
  DeleteSweep,
  PlayArrow,
  RestartAlt,
  RotateLeft,
} from '@mui/icons-material';
import Tooltip from 'src/renderer/components/Tooltip/Tooltip';
import IconButton from 'src/renderer/components/IconButton/IconButton';
import { useTranslation, CustomTypeOptions } from 'react-i18next';
import * as Styled from './style';

type Props = {
  project: LocalPublication;
};

enum SERVER {
  IDLE = 'idle',
  INSTALLING = 'installing',
  SERVER_RUNNING = 'running',
  CLEARING_CACHE = 'clearing',
  STOPPING = 'stopping',
}

const Toolbar: React.FC<Props> = ({ project }) => {
  const [state, setState] = useState<SERVER>(SERVER.IDLE);
  const { t } = useTranslation('translation');

  const isStopBtnDisabled = state === SERVER.IDLE || state === SERVER.STOPPING;
  const isStartBtnDisabled = state !== SERVER.IDLE;
  const isRestartBtnDisabled = state !== SERVER.SERVER_RUNNING;
  const isHardResetBtnDisabled = state !== SERVER.SERVER_RUNNING;
  const isClearCacheBtnDisabled = state !== SERVER.IDLE;

  const startServer = () => {
    ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
    setState(SERVER.SERVER_RUNNING);
  };

  const stopServer = async () => {
    setState(SERVER.STOPPING);
    await ipcRenderer.invoke(CHANNELS.SERVER.STOP);
    setState(SERVER.IDLE);
  };

  const restartServer = async () => {
    setState(SERVER.STOPPING);
    await ipcRenderer.invoke(CHANNELS.SERVER.STOP);
    ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
    setState(SERVER.SERVER_RUNNING);
  };

  const hardResetServer = async () => {
    setState(SERVER.STOPPING);
    await ipcRenderer.invoke(CHANNELS.SERVER.STOP);
    setState(SERVER.CLEARING_CACHE);
    await ipcRenderer.invoke(CHANNELS.SERVER.CLEAR_CACHE, project.dirPath);
    ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
    setState(SERVER.SERVER_RUNNING);
  };

  const clearCache = async () => {
    setState(SERVER.CLEARING_CACHE);
    await ipcRenderer.invoke(CHANNELS.SERVER.CLEAR_CACHE, project.dirPath);
    setState(SERVER.IDLE);
  };

  const getTooltip = (
    key: keyof Pick<
      CustomTypeOptions['resources']['translation']['Terminal'],
      'start' | 'stop' | 'restart' | 'hard_reset' | 'clear_cache'
    >
  ) => (
    <>
      <Typography variant='caption' component='h5' mb='1rem' fontWeight='bold'>
        {t(`Terminal.${key}`)}
      </Typography>
      <Typography variant='caption' component='p'>
        {t(`Terminal.${key}_info`)}
      </Typography>
    </>
  );

  return (
    <Styled.TerminalToolbar
      role='toolbar'
      aria-labelledby='server-toolbar__title'
    >
      <Typography
        id='server-toolbar__title'
        variant='caption'
        component='h2'
        textTransform='uppercase'
        mr='auto'
      >
        {t('Terminal.controls')}
      </Typography>
      <Tooltip title={getTooltip('start')} arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={isStartBtnDisabled}
            onClick={startServer}
          >
            <PlayArrow
              role='img'
              aria-label={t('Terminal.start')}
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={getTooltip('stop')} arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={isStopBtnDisabled}
            onClick={stopServer}
          >
            <Block
              role='img'
              aria-label={t('Terminal.stop')}
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={getTooltip('restart')} arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={isRestartBtnDisabled}
            onClick={restartServer}
          >
            <RestartAlt
              role='img'
              aria-label={t('Terminal.restart')}
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={getTooltip('hard_reset')} arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={isHardResetBtnDisabled}
            onClick={hardResetServer}
          >
            <RotateLeft
              role='img'
              aria-label={t('Terminal.hard_reset')}
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={getTooltip('clear_cache')} arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={isClearCacheBtnDisabled}
            onClick={clearCache}
          >
            <DeleteSweep
              role='img'
              aria-label={t('Terminal.clear_cache')}
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
    </Styled.TerminalToolbar>
  );
};

export default Toolbar;
