import { ipcMain as ipc } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import generate from './publications/generate';
import verifyGatsby from './gatsby/verify';
import installGatsby from './gatsby/install';
import verifyNode from './node/verify';
import saveSettings from './settings/save';
import readSettings from './settings/read';
import verifyPath from './files/verifyPath';
import findLocal from './publications/findLocal';
import findRemote from './publications/findRemote';
import readSyncLocations from './settings/readSyncLocations';
import clone from './git/clone';
import updateConfig from './publications/updateConfig';
import readDirectory from './files/readDirectory';
import openInDefaultApp from './files/openInDefaultApp';
import { updateRepoStatus, updateFilesStatus } from './git/status';
import stage from './git/stage';
import commit from './git/commit';
import push from './git/push';

const registerApiHandlers = () => {
  ipc.handle(CHANNELS.PUBLICATIONS.GENERATE, generate);
  ipc.handle(CHANNELS.PUBLICATIONS.FIND_LOCAL, findLocal);
  ipc.handle(CHANNELS.PUBLICATIONS.FIND_REMOTE, findRemote);
  ipc.handle(CHANNELS.PUBLICATIONS.UPDATE_CONFIG, updateConfig);
  ipc.handle(CHANNELS.GATSBY.VERIFY, verifyGatsby);
  ipc.handle(CHANNELS.GATSBY.INSTALL, installGatsby);
  ipc.handle(CHANNELS.NODE.VERIFY, verifyNode);
  ipc.handle(CHANNELS.SETTINGS.SAVE, saveSettings);
  ipc.handle(CHANNELS.SETTINGS.READ, readSettings);
  ipc.handle(CHANNELS.SETTINGS.READ_SYNC_LOCATIONS, readSyncLocations);
  ipc.handle(CHANNELS.FILES.VERIFY_PATH, verifyPath);
  ipc.handle(CHANNELS.FILES.OPEN_DEFAULT, openInDefaultApp);
  ipc.handle(CHANNELS.FILES.READ_DIRECTORY, readDirectory);
  ipc.handle(CHANNELS.GIT.CLONE, clone);
  ipc.handle(CHANNELS.GIT.PUSH, push);
  ipc.handle(CHANNELS.GIT.REPO_STATUS, updateRepoStatus);
  ipc.handle(CHANNELS.GIT.FILES_STATUS, updateFilesStatus);
  ipc.handle(CHANNELS.GIT.STAGE, stage);
  ipc.handle(CHANNELS.GIT.COMMIT, commit);
};

export default registerApiHandlers;
