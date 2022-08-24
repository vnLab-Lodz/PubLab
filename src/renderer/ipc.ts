import { ipcRenderer } from 'electron';
import { CHANNELS, GitRepoTreeItem } from 'src/shared/types/api';
import { RestEndpointMethodTypes } from '@octokit/rest';
import { DirectoryEntryInfo } from '../shared/types/api';
import { Config } from '../main/lib/configurationFileHandler';
import { AssetObject } from '../shared/types';

export async function verifyPath(path: string) {
  const result = (await ipcRenderer.invoke(
    CHANNELS.FILES.VERIFY_PATH,
    path
  )) as boolean;
  return result;
}

export async function openInDefaultApp(path: string) {
  const result = await ipcRenderer.invoke(CHANNELS.FILES.OPEN_DEFAULT, path);
  return result;
}

export async function readDirectory(
  path: string,
  options?: { depth?: number; withDetails?: boolean }
) {
  const result = await ipcRenderer.invoke(
    CHANNELS.FILES.READ_DIRECTORY,
    path,
    options
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

export async function gitStage(items: GitRepoTreeItem[]) {
  await ipcRenderer.invoke(CHANNELS.GIT.STAGE, 'stage', items);
  await ipcRenderer.invoke(
    CHANNELS.GIT.FILES_STATUS,
    items.map((item) => item.filepath)
  );
}

export async function gitUnstage(items: GitRepoTreeItem[]) {
  await ipcRenderer.invoke(CHANNELS.GIT.STAGE, 'unstage', items);
  await ipcRenderer.invoke(
    CHANNELS.GIT.FILES_STATUS,
    items.map((item) => item.filepath)
  );
}

export async function gitCommit(message: string) {
  await ipcRenderer.invoke(CHANNELS.GIT.COMMIT, message);
  await ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS);
}

export async function gitPush(loaderId: string, remoteRef?: string) {
  await ipcRenderer.invoke(CHANNELS.GIT.PUSH, { loaderId, remoteRef });
}

export async function readAsset(path: string, encoding?: BufferEncoding) {
  const result = await ipcRenderer.invoke(
    CHANNELS.FILES.READ_ASSET,
    path,
    encoding
  );
  return result as AssetObject | undefined;
}

export async function getPublicUserData(username: string) {
  const result: RestEndpointMethodTypes['users']['getByUsername']['response'] =
    await ipcRenderer.invoke(CHANNELS.GITHUB.GET_USER_PUBLIC, username);
  return result;
}
