import { ipcMain } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import generate from './publications/generate';

const registerApiHandlers = () => {
  ipcMain.handle(CHANNELS.PUBLICATIONS.GENERATE, generate);
};

export default registerApiHandlers;
