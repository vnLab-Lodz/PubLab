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
import * as Styled from './style';

type Props = {
  project: LocalPublication;
};

enum TERMINAL_STATE {
  IDLE = 'idle',
  INSTALLING = 'installing',
  SERVER_RUNNING = 'running',
  CLEARING_CACHE = 'clearing',
  STOPPING = 'stopping',
}

const Toolbar: React.FC<Props> = ({ project }) => {
  const [state, setState] = useState<TERMINAL_STATE>(TERMINAL_STATE.IDLE);

  const startServer = () => {
    ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
    setState(TERMINAL_STATE.SERVER_RUNNING);
  };

  const stopServer = async () => {
    setState(TERMINAL_STATE.STOPPING);
    await ipcRenderer.invoke('terminal-stop');
    setState(TERMINAL_STATE.IDLE);
  };

  const restartServer = async () => {
    setState(TERMINAL_STATE.STOPPING);
    await ipcRenderer.invoke('terminal-stop');
    ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
    setState(TERMINAL_STATE.SERVER_RUNNING);
  };

  const hardResetServer = async () => {
    setState(TERMINAL_STATE.STOPPING);
    await ipcRenderer.invoke('terminal-stop');
    setState(TERMINAL_STATE.CLEARING_CACHE);
    await ipcRenderer.invoke(CHANNELS.SERVER.CLEAR_CACHE, project.dirPath);
    ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
    setState(TERMINAL_STATE.SERVER_RUNNING);
  };

  const clearCache = async () => {
    setState(TERMINAL_STATE.CLEARING_CACHE);
    await ipcRenderer.invoke(CHANNELS.SERVER.CLEAR_CACHE, project.dirPath);
    setState(TERMINAL_STATE.IDLE);
  };

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
        Server controls
      </Typography>
      <Tooltip title='Start development server' arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={state !== TERMINAL_STATE.IDLE}
            onClick={startServer}
          >
            <PlayArrow
              role='img'
              aria-label='Start development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Stop development server' arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={
              state === TERMINAL_STATE.IDLE || state === TERMINAL_STATE.STOPPING
            }
            onClick={stopServer}
          >
            <Block
              role='img'
              aria-label='Stop development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Restart development server' arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={state !== TERMINAL_STATE.SERVER_RUNNING}
            onClick={restartServer}
          >
            <RestartAlt
              role='img'
              aria-label='Restart development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        title='Hard reset development server'
        arrow
        placement='top-start'
      >
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={state !== TERMINAL_STATE.SERVER_RUNNING}
            onClick={hardResetServer}
          >
            <RotateLeft
              role='img'
              aria-label='Hard reset development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Clear cache' arrow placement='top-start'>
        <span>
          <IconButton
            size='small'
            type='button'
            disabled={state !== TERMINAL_STATE.IDLE}
            onClick={clearCache}
          >
            <DeleteSweep
              role='img'
              aria-label='Clear cache'
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
