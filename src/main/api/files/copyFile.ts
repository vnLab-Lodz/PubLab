import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';

const copyFile: IpcEventHandler = async (
  _,
  path: string,
  destination: string
) => {
  const io = createFileIO();
  await io.copyFile(path, destination);
};

export default copyFile;
