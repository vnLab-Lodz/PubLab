import { ipcMain as ipc } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import generate from './publications/generate';
import verifyGatsby from './gatsby/verify';
import installGatsby from './gatsby/install';
import verifyNode from './node/verify';

const registerApiHandlers = () => {
  ipc.handle(CHANNELS.PUBLICATIONS.GENERATE, generate);
  ipc.handle(CHANNELS.GATSBY.VERIFY, verifyGatsby);
  ipc.handle(CHANNELS.GATSBY.INSTALL, installGatsby);
  ipc.handle(CHANNELS.NODE.VERIFY, verifyNode);
};

export default registerApiHandlers;
