import {
  Block,
  DeleteSweep,
  PlayArrow,
  RestartAlt,
  RotateLeft,
} from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ipcRenderer, shell } from 'electron';
import React, { useEffect, useRef, useMemo } from 'react';
import { LocalPublication } from 'src/shared/types';
import { CHANNELS, IpcRendererEventHandler } from 'src/shared/types/api';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import Tooltip from '../Tooltip/Tooltip';
import * as Styled from './style';

type Props = {
  project: LocalPublication;
};

const Terminal: React.FC<Props> = ({ project }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const terminal = useRef<InstanceType<typeof XTerm>>();
  const { background, text } = useTheme().palette;

  const options = useMemo(
    () => ({
      fontSize: 10,
      lineHeight: 1.1,
      theme: { background: background.default, foreground: text.primary },
    }),
    [background.default, text.primary]
  );

  useEffect(() => {
    if (!ref.current) return undefined;

    const fitAddon = new FitAddon();
    terminal.current = new XTerm(options);
    terminal.current.loadAddon(fitAddon);
    terminal.current.loadAddon(
      new WebLinksAddon((e, uri) => {
        e.preventDefault();
        shell.openExternal(uri);
      })
    );
    terminal.current.open(ref.current);
    fitAddon.fit();

    const terminalWriteListener: IpcRendererEventHandler = async (_, data) =>
      terminal.current!.writeln(data);

    const resizeListener = () => fitAddon.fit();

    ipcRenderer.on('terminal-write', terminalWriteListener);
    window.addEventListener('resize', resizeListener);

    return () => {
      ipcRenderer.off('terminal-write', terminalWriteListener);
      window.removeEventListener('resize', resizeListener);
      terminal.current?.dispose();
      fitAddon.dispose();
    };
  }, [ref.current, options]);

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
          <IconButton
            size='small'
            type='button'
            onClick={() => {
              ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
            }}
          >
            <PlayArrow
              role='img'
              aria-label='Start development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </Tooltip>
        <Tooltip title='Stop development server' arrow placement='top-start'>
          <IconButton
            size='small'
            type='button'
            onClick={() => {
              ipcRenderer.invoke('terminal-stop');
            }}
          >
            <Block
              role='img'
              aria-label='Stop development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </Tooltip>
        <Tooltip title='Restart development server' arrow placement='top-start'>
          <IconButton
            size='small'
            type='button'
            onClick={async () => {
              await ipcRenderer.invoke('terminal-stop');
              ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
            }}
          >
            <RestartAlt
              role='img'
              aria-label='Restart development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title='Hard reset development server'
          arrow
          placement='top-start'
        >
          <IconButton
            size='small'
            type='button'
            onClick={async () => {
              await ipcRenderer.invoke('terminal-stop');
              await ipcRenderer.invoke(
                CHANNELS.SERVER.CLEAR_CACHE,
                project.dirPath
              );
              ipcRenderer.invoke(CHANNELS.SERVER.START, project.dirPath);
            }}
          >
            <RotateLeft
              role='img'
              aria-label='Hard reset development server'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </Tooltip>
        <Tooltip title='Clear cache' arrow placement='top-start'>
          <IconButton
            size='small'
            type='button'
            onClick={async () => {
              await ipcRenderer.invoke(
                CHANNELS.SERVER.CLEAR_CACHE,
                project.dirPath
              );
            }}
          >
            <DeleteSweep
              role='img'
              aria-label='Clear cache'
              color='primary'
              fontSize='small'
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Styled.XTermContainer ref={ref} />
    </Box>
  );
};

export default Terminal;
