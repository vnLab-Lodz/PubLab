import { exec } from 'child_process';
import { type } from 'os';
import { appendLog } from '../logger';

class Platform {
  public os: string;

  constructor(os: string) {
    this.os = os;
  }

  public static WINDOWS: Platform = new Platform('Windows_NT');

  public static LINUX: Platform = new Platform('Linux');

  public static MAC: Platform = new Platform('Darwin');

  private static supportedPlatforms: Platform[] = [
    Platform.WINDOWS,
    Platform.LINUX,
    Platform.MAC,
  ];

  public static Current(): Platform {
    return new Platform(type());
  }

  public IsSupported(): boolean {
    return Platform.supportedPlatforms.some(({ os }) => os === this.os);
  }

  public InstallNodeManager(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const managerInstallCommand = this.NodeManagerInstallationCommand();
      if (managerInstallCommand !== undefined) {
        exec(managerInstallCommand as string, (error) => {
          if (error) {
            appendLog(`Node.js Manager installation failed.`);
            reject(error);
          }
          appendLog(`Finished installation of node manager.`);
          resolve();
        });
      }
      const message = `Node manager installation command unspecified.`;
      reject(message);
    });
  }

  public InstallNodeJs(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const nodeInstallCommand = this.NodeInstallationCommand();
      if (nodeInstallCommand !== undefined) {
        exec(nodeInstallCommand as string, (error) => {
          if (error) {
            appendLog(`Node installation failed.`);
            reject(error);
          }
          appendLog(`Finished installation of node.`);
          resolve();
        });
      }
      const message = `Node installation command unspecified.`;
      reject(message);
    });
  }

  private NodeManagerInstallationCommand(): string | undefined {
    if (this === Platform.WINDOWS) return 'winget install nvs';
    if (this === Platform.LINUX || this === Platform.MAC)
      return 'npm install -g n';
    return undefined;
  }

  private NodeInstallationCommand(): string | undefined {
    if (this === Platform.WINDOWS) return 'nvs add lts; nvs link latest';
    if (this === Platform.LINUX || this === Platform.MAC) return 'n lts';
    return undefined;
  }
}

/**
 * Check if node is installed globally.
 * Promise returns false if a command execution error occurs or node is not installed globally.
 * @return {Promise<boolean>}
 */
export function checkForNode(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    exec('node -v', (error) => {
      if (error) {
        appendLog('node is not installed globally');
        resolve(false);
      } else {
        appendLog('node is installed globally');
        resolve(true);
      }
    });
  });
}

/**
 * Installes globally the lateset version of node.js using node manager.
 * Rejects the promise if a command execution error occurs or node verification fails.
 * @return {Promise<void>}
 */
export function installNode(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const platform = Platform.Current();
    if (platform.IsSupported()) {
      appendLog('Installing node...');
      appendLog(`Platform: ${platform.os}`);

      platform
        .InstallNodeManager()
        .then(() => platform.InstallNodeJs())
        .then(() => resolve())
        .catch((error) => reject(error));
    } else {
      const message = `Cannot install node. Platform {${platform.os} is not supported.}`;
      appendLog(message);
      reject(message);
    }
  });
}
