import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';

const openInDefaultApp: IpcEventHandler = async (_, path: string) => {
  const io = createFileIO();
  const result = await io.openPath(path);
  return result;
};

export default openInDefaultApp;
