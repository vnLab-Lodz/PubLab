import { Box, Typography } from '@mui/material';
import { ipcRenderer } from 'electron';
import React, { useState } from 'react';
import { LocalPublication } from 'src/shared/types';
import { CHANNELS } from 'src/shared/types/api';
import 'xterm/css/xterm.css';
import {
  Block,
  DeleteSweep,
  PlayArrow,
  RestartAlt,
  RotateLeft,
} from '@mui/icons-material';
import Tooltip from '../Tooltip/Tooltip';
import Output from './components/Output/Output';
import IconButton from '../IconButton/IconButton';

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

const Terminal: React.FC<Props> = ({ project }) => {
  const [state, setState] = useState<TERMINAL_STATE>(TERMINAL_STATE.IDLE);

  return (
    <Box
      aria-label='Development server'
      component='section'
      height='50rem'
      display='flex'
      flexDirection='column'
      sx={{
        borderBottom: ({ palette }) => `1px solid ${palette.primary.main}`,
      }}
    >
      <Box
        role='toolbar'
        aria-labelledby='server-toolbar__title'
        sx={{
          borderTop: ({ palette }) => `1px solid ${palette.primary.main}`,
          borderBottom: ({ palette }) => `1px solid ${palette.primary.main}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
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
              onClick={() => {
                ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
                setState(TERMINAL_STATE.SERVER_RUNNING);
              }}
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
                state === TERMINAL_STATE.IDLE ||
                state === TERMINAL_STATE.STOPPING
              }
              onClick={async () => {
                setState(TERMINAL_STATE.STOPPING);
                await ipcRenderer.invoke('terminal-stop');
                setState(TERMINAL_STATE.IDLE);
              }}
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
              onClick={async () => {
                setState(TERMINAL_STATE.STOPPING);
                await ipcRenderer.invoke('terminal-stop');
                ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
                setState(TERMINAL_STATE.SERVER_RUNNING);
              }}
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
              onClick={async () => {
                setState(TERMINAL_STATE.STOPPING);
                await ipcRenderer.invoke('terminal-stop');
                setState(TERMINAL_STATE.CLEARING_CACHE);
                await ipcRenderer.invoke(
                  CHANNELS.SERVER.CLEAR_CACHE,
                  project.dirPath
                );
                ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
                setState(TERMINAL_STATE.SERVER_RUNNING);
              }}
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
              onClick={async () => {
                setState(TERMINAL_STATE.CLEARING_CACHE);
                await ipcRenderer.invoke(
                  CHANNELS.SERVER.CLEAR_CACHE,
                  project.dirPath
                );
                setState(TERMINAL_STATE.IDLE);
              }}
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
      </Box>
      <Output />
    </Box>
  );
};

export default React.memo(Terminal);
