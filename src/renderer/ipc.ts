import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';

export async function verifyPath(path: string) {
  const result = (await ipcRenderer.invoke(
    CHANNELS.FILES.VERIFY_PATH,
    path
  )) as boolean;
  return result;
}
