import { exec } from 'child_process';
import { type } from 'os';
import { appendLog } from '../logger';

class Platform {
  public os: string;

  constructor(os: string)
  {
    this.os = os;
  }

  public static WINDOWS: Platform = new Platform('Windows_NT');
  public static LINUX: Platform = new Platform('Linux');
  public static MAC: Platform = new Platform('Darwin');
  private static supportedPlatforms: Platform[] = [Platform.WINDOWS, Platform.LINUX, Platform.MAC];

  public static Current() : Platform
  {
    return new Platform(type());
  }

  public IsSupported() : boolean
  {
    const index = Platform.supportedPlatforms.findIndex(platform => platform.os === this.os);
    return index > -1;
  }

  public NodeManagerInstallationCommand() : string
  {
    if (this == Platform.WINDOWS) return "winget install nvs";
    if (this == Platform.LINUX || this == Platform.MAC) return "npm install -g n";
    return "";
  }

  public NodeInstallationCommand() : string
  {
    if (this == Platform.WINDOWS) return "nvs add lts; nvs link latest";
    if (this == Platform.LINUX || this == Platform.MAC) return "n lts";
    return "";
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
 * Installes globally the lateset version of node.js.
 * Rejects the promise if a command execution error occurs or node verification fails.
 * @return {Promise<void>}
 */
export function installNode(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    var platform = Platform.Current();
    if (platform.IsSupported())
    {
      appendLog('Installing node...');
      appendLog(`Platform: ${platform.os}`);
      exec(platform.NodeManagerInstallationCommand(), (error, stdout, stderr) => {
        if (error)
        {
          appendLog(`Node.js Manager installation failed.`);
          reject(error);
        }
        appendLog(`Finished installation of node manager.`);
        resolve();
      });
      exec(platform.NodeInstallationCommand(), (error, stdout, stderr) => {
        if (error)
        {
          appendLog(`Node installation failed.`);
          reject(error);
        }
        appendLog(`Finished installation of node.`);
        resolve();
      });
    }
    else
    {
      let message = `Cannot install node. Platform {${platform.os} is not supported.}`;
      appendLog(message);
      reject(message);
    }
  });
}
