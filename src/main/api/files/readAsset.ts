import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';
import { mainStore as store } from 'src/main';
import { addAsset } from '../../../shared/redux/slices/assetsSlice';

const readAsset: IpcEventHandler = async (
  _,
  path: string,
  encoding?: BufferEncoding
) => {
  const io = createFileIO();
  const asset = await io.readAsset(path, encoding || 'base64');
  store.dispatch(addAsset({ path, asset }));
};

export default readAsset;
