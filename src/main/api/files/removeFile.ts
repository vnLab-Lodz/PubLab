import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';

const removeFile: IpcEventHandler = async (_, path: string) => {
  const io = createFileIO();
  await io.removeFile(path);
};

export default removeFile;
