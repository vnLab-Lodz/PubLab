import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';

const readAsset: IpcEventHandler = async (
  _,
  path: string,
  encoding?: BufferEncoding
) => {
  const io = createFileIO();
  const asset = await io.readAsset(path, encoding || 'base64');
  return asset;
};

export default readAsset;
