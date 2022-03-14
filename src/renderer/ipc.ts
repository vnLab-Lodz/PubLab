import { ipcRenderer } from 'electron';

export async function verifyPath(path: string) {
  const result = (await ipcRenderer.invoke('verify-path', path)) as boolean;
  return result;
}
