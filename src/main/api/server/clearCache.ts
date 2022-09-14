import { spawn } from 'child_process';
import { ipcMain } from 'electron';
import kill from 'tree-kill';
import { IpcEventHandler } from 'src/shared/types/api';

const clearCache: IpcEventHandler = (event, cwd: string) =>
  new Promise<void>((resolveEventHandler) => {
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const cleanProcess = spawn(npm, ['run', 'clean'], { cwd });

    ipcMain.handle(
      'terminal-stop',
      async (e) =>
        new Promise<void>((resolve) => {
          e.sender.send('terminal-write', 'Stopping cache clearing...');

          kill(cleanProcess.pid, (error) => {
            const message = error
              ? `Cache clearing stopped with errors\n${error.toString()}`
              : 'Cache clearing successfully stopped';
            e.sender.send('terminal-write', message);
            resolve();
          });
        })
    );

    event.sender.send('terminal-write', 'Clearing cache...');

    cleanProcess.stdout?.on('data', (data) => {
      event.sender.send('terminal-write', data.toString());
    });

    cleanProcess.stderr?.on('data', (data) => {
      event.sender.send('terminal-write', data.toString());
    });

    cleanProcess.on('exit', (code) => {
      ipcMain.removeHandler('terminal-stop');
      resolveEventHandler();
      if (code === null) return;

      event.sender.send(
        'terminal-write',
        `Process stopped with code: ${code.toString()}`
      );
    });
  });

export default clearCache;
