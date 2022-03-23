import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';

const verifyPath: IpcEventHandler = async (_, path: string) => {
  const io = createFileIO();
  const result = await io.verifyPath(path);
  return result;
};

export default verifyPath;
