import { spawn } from 'child_process';
import { ipcMain, shell } from 'electron';
import kill from 'tree-kill';
import { CHANNELS, IpcEventHandler } from 'src/shared/types/api';

const start: IpcEventHandler = async (event, cwd: string) => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const installProcess = spawn(npm, ['install'], { cwd });

  ipcMain.handle(
    CHANNELS.SERVER.STOP,
    async (e) =>
      new Promise<void>((resolve) => {
        e.sender.send(
          CHANNELS.SERVER.WRITE,
          'Stopping installation of dependencies...'
        );

        kill(installProcess.pid, (error) => {
          const message = error
            ? `Installation of dependencies stopped with errors\n${error.toString()}`
            : 'Installation of dependencies successfully stopped';
          e.sender.send(CHANNELS.SERVER.WRITE, message);
          resolve();
        });
      })
  );

  event.sender.send(CHANNELS.SERVER.WRITE, 'Installing dependencies...');

  installProcess.stdout?.on('data', (data) => {
    event.sender.send(CHANNELS.SERVER.WRITE, data.toString());
  });

  installProcess.stderr?.on('data', (data) => {
    event.sender.send(CHANNELS.SERVER.WRITE, data.toString());
  });

  installProcess.on('exit', (code) => {
    ipcMain.removeHandler(CHANNELS.SERVER.STOP);
    if (code === null) return;

    event.sender.send(
      CHANNELS.SERVER.WRITE,
      `Process stopped with code: ${code.toString()}`
    );
    if (code !== 0) return;

    const developProcess = spawn(npm, ['start'], { cwd });

    ipcMain.handle(
      CHANNELS.SERVER.STOP,
      (e) =>
        new Promise<void>((resolve) => {
          e.sender.send(
            CHANNELS.SERVER.WRITE,
            'Stopping development server...'
          );

          kill(developProcess.pid, (error) => {
            const message = error
              ? `Development server stopped with errors\n${error.toString()}`
              : 'Development server successfully stopped';
            e.sender.send(CHANNELS.SERVER.WRITE, message);
            resolve();
          });
        })
    );

    event.sender.send(CHANNELS.SERVER.WRITE, 'Starting development server...');

    developProcess.stdout?.on('data', (data) => {
      const line: string = data.toString();
      event.sender.send(CHANNELS.SERVER.WRITE, line);
      const uri = line.match(/http:\/\/localhost:\d+\/(?!.)/);
      if (uri && uri[0]) shell.openExternal(uri[0]);
    });

    developProcess.stderr?.on('data', (data) => {
      event.sender.send(CHANNELS.SERVER.WRITE, data.toString());
    });

    developProcess.on('exit', (developCode) => {
      ipcMain.removeHandler(CHANNELS.SERVER.STOP);
      if (developCode === null) return;
      event.sender.send(
        CHANNELS.SERVER.WRITE,
        `Process stopped with code: ${developCode.toString()}`
      );
    });
  });
};

export default start;
