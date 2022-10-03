import { mainStore as store } from 'src/main';
import { IpcEventHandler } from '../../../shared/types/api';
import syncCheck from '../../utils/git/syncCheck';

const runSyncCheck: IpcEventHandler = async () => {
  await syncCheck(store);
};

export default runSyncCheck;
