import { useTheme } from '@mui/material';
import { ipcRenderer, shell } from 'electron';
import React, { useEffect, useRef, useMemo } from 'react';
import { IpcRendererEventHandler } from 'src/shared/types/api';
import { Terminal as XTerm, ITerminalOptions } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css';
import * as Styled from './style';

const Output: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const terminal = useRef<InstanceType<typeof XTerm>>();
  const { background, text } = useTheme().palette;

  const options = useMemo<ITerminalOptions>(
    () => ({
      fontFamily: "'Source Code Pro', monospace",
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
      ipcRenderer.invoke('terminal-stop').catch((e) => {
        console.info('Attempted to stop a running process but none found.');
        console.error(e);
      });
    };
  }, [ref.current, options]);

  return <Styled.XTermContainer ref={ref} />;
};

export default React.memo(Output);
