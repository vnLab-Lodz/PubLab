import { spawn } from 'child_process';
import { ipcMain } from 'electron';
import kill from 'tree-kill';
import { IpcEventHandler } from 'src/shared/types/api';

const start: IpcEventHandler = async (event, cwd: string) => {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const installProcess = spawn(npm, ['install'], { cwd });

  ipcMain.handle(
    'terminal-stop',
    async (e) =>
      new Promise<void>((resolve) => {
        e.sender.send(
          'terminal-write',
          'Stopping installation of dependencies...'
        );

        kill(installProcess.pid, (error) => {
          const message = error
            ? `Installation of dependencies stopped with errors\n${error.toString()}`
            : 'Installation of dependencies successfully stopped';
          e.sender.send('terminal-write', message);
          resolve();
        });
      })
  );

  event.sender.send('terminal-write', 'Installing dependencies...');

  installProcess.stdout?.on('data', (data) => {
    event.sender.send('terminal-write', data.toString());
  });

  installProcess.stderr?.on('data', (data) => {
    event.sender.send('terminal-write', data.toString());
  });

  installProcess.on('exit', (code) => {
    ipcMain.removeHandler('terminal-stop');
    if (code === null) return;

    event.sender.send(
      'terminal-write',
      `Process stopped with code: ${code.toString()}`
    );
    if (code !== 0) return;

    const developProcess = spawn(npm, ['start'], { cwd });

    ipcMain.handle(
      'terminal-stop',
      (e) =>
        new Promise<void>((resolve) => {
          e.sender.send('terminal-write', 'Stopping development server...');

          kill(developProcess.pid, (error) => {
            const message = error
              ? `Development server stopped with errors\n${error.toString()}`
              : 'Development server successfully stopped';
            e.sender.send('terminal-write', message);
            resolve();
          });
        })
    );

    event.sender.send('terminal-write', 'Starting development server...');

    developProcess.stdout?.on('data', (data) => {
      event.sender.send('terminal-write', data.toString());
    });

    developProcess.stderr?.on('data', (data) => {
      event.sender.send('terminal-write', data.toString());
    });

    developProcess.on('exit', (developCode) => {
      ipcMain.removeHandler('terminal-stop');
      if (developCode === null) return;
      event.sender.send(
        'terminal-write',
        `Process stopped with code: ${developCode.toString()}`
      );
    });
  });
};

export default start;
