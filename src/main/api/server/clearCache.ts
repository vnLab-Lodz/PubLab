import { spawn } from 'child_process';
import { ipcMain } from 'electron';
import kill from 'tree-kill';
import { CHANNELS, IpcEventHandler } from 'src/shared/types/api';

const clearCache: IpcEventHandler = (event, cwd: string) =>
  new Promise<void>((resolveEventHandler) => {
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const cleanProcess = spawn(npm, ['run', 'clean'], { cwd });

    ipcMain.handle(
      CHANNELS.SERVER.STOP,
      async (e) =>
        new Promise<void>((resolve) => {
          e.sender.send(CHANNELS.SERVER.WRITE, 'Stopping cache clearing...');

          kill(cleanProcess.pid, (error) => {
            const message = error
              ? `Cache clearing stopped with errors\n${error.toString()}`
              : 'Cache clearing successfully stopped';
            e.sender.send(CHANNELS.SERVER.WRITE, message);
            resolve();
          });
        })
    );

    event.sender.send(CHANNELS.SERVER.WRITE, 'Clearing cache...');

    cleanProcess.stdout?.on('data', (data) => {
      event.sender.send(CHANNELS.SERVER.WRITE, data.toString());
    });

    cleanProcess.stderr?.on('data', (data) => {
      event.sender.send(CHANNELS.SERVER.WRITE, data.toString());
    });

    cleanProcess.on('exit', (code) => {
      ipcMain.removeHandler(CHANNELS.SERVER.STOP);
      resolveEventHandler();
      if (code === null) return;

      event.sender.send(
        CHANNELS.SERVER.WRITE,
        `Process stopped with code: ${code.toString()}`
      );
    });
  });

export default clearCache;
