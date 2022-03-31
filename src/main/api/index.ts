import { ipcMain as ipc } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import generate from './publications/generate';
import verifyGatsby from './gatsby/verify';
import installGatsby from './gatsby/install';
import verifyNode from './node/verify';
import saveSettings from './settings/save';
import readSettings from './settings/read';
import verifyPath from './files/verifyPath';
import find from './publications/find';

const registerApiHandlers = () => {
  ipc.handle(CHANNELS.PUBLICATIONS.GENERATE, generate);
  ipc.handle(CHANNELS.PUBLICATIONS.FIND, find);
  ipc.handle(CHANNELS.GATSBY.VERIFY, verifyGatsby);
  ipc.handle(CHANNELS.GATSBY.INSTALL, installGatsby);
  ipc.handle(CHANNELS.NODE.VERIFY, verifyNode);
  ipc.handle(CHANNELS.SETTINGS.SAVE, saveSettings);
  ipc.handle(CHANNELS.SETTINGS.READ, readSettings);
  ipc.handle(CHANNELS.FILES.VERIFY_PATH, verifyPath);
};

export default registerApiHandlers;
