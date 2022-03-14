import { ipcMain } from 'electron';
import verifyPath from './node/fileIO/verifyPath';

export default function registerEventListeners() {
  ipcMain.handle('verify-path', async (event, path: string) => {
    const result = await verifyPath(path);
    return result;
  });
}
