import { ipcMain as ipc } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import install from './gatsby/install';
import verify from './gatsby/verify';
import generate from './publications/generate';

const registerApiHandlers = () => {
  ipc.handle(CHANNELS.PUBLICATIONS.GENERATE, generate);
  ipc.handle(CHANNELS.GATSBY.VERIFY, verify);
  ipc.handle(CHANNELS.GATSBY.INSTALL, install);
};

export default registerApiHandlers;
