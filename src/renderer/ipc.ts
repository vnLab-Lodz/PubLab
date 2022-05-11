import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import { DirectoryEntryInfo } from '../shared/types/api';
import { Config } from '../main/lib/configurationFileHandler';

export async function verifyPath(path: string) {
  const result = (await ipcRenderer.invoke(
    CHANNELS.FILES.VERIFY_PATH,
    path
  )) as boolean;
  return result;
}

export async function readDirectory(path: string, depth?: number) {
  const result = await ipcRenderer.invoke(
    CHANNELS.FILES.READ_DIRECTORY,
    path,
    depth
  );
  return result as DirectoryEntryInfo[];
}

export async function updateConfig(dirPath: string, changes: Partial<Config>) {
  await ipcRenderer.invoke(
    CHANNELS.PUBLICATIONS.UPDATE_CONFIG,
    dirPath,
    changes
  );
}
