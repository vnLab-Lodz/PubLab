import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import { Config } from '../main/lib/configurationFileHandler';

export async function verifyPath(path: string) {
  const result = (await ipcRenderer.invoke(
    CHANNELS.FILES.VERIFY_PATH,
    path
  )) as boolean;
  return result;
}

export async function updateConfig(
  handlerOptions: { dirPath: string },
  changes: Partial<Config>
) {
  await ipcRenderer.invoke(
    CHANNELS.PUBLICATIONS.UPDATE_CONFIG,
    handlerOptions,
    changes
  );
}
