import path from 'path';
import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';
import { DirectoryEntryInfo } from '../../../shared/types/api';

const readDirectory: IpcEventHandler<DirectoryEntryInfo[]> = async (
  _,
  dirPath: string,
  depth: number = 0
) => {
  const out = await read(dirPath, depth);
  return out || [];
};

export default readDirectory;

async function read(
  dirPath: string,
  depth: number
): Promise<DirectoryEntryInfo[] | undefined> {
  const io = createFileIO();
  const result = await io.readDirectory(dirPath);
  const output: DirectoryEntryInfo[] = await Promise.all(
    result.map(async (dirent) => {
      const isDirectory = dirent.isDirectory();
      return {
        name: dirent.name,
        details: isDirectory
          ? {
              isDirectory,
              content:
                depth === 0
                  ? undefined
                  : await read(path.join(dirPath, dirent.name), depth - 1),
            }
          : { isDirectory: false },
      };
    })
  );
  return output;
}
