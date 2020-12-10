import { exec } from 'child_process';
import { appendLog } from '../logger';

/**
 * Check if node is installed globally.
 * Promise returns false if a command execution error occurs or node is not installed globally.
 * @return {Promise<boolean>}
 */
export function checkForNode(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    exec('node -v', (error, stdout, stderr) => {
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
