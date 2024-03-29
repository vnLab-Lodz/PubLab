import path from 'path';
import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';
import { DirectoryEntryInfo } from '../../../shared/types/api';

const readDirectory: IpcEventHandler<DirectoryEntryInfo[]> = async (
  _,
  dirPath: string,
  options?: { depth?: number; withDetails?: boolean }
) => {
  const optionsWithDefaults = { depth: 0, withDetails: false, ...options };
  const out = await read(dirPath, optionsWithDefaults);
  return out || [];
};

export default readDirectory;

async function read(
  dirPath: string,
  options: { depth: number; withDetails: boolean }
): Promise<DirectoryEntryInfo[] | undefined> {
  const io = createFileIO();
  const result = await io.readDirectory(dirPath);
  const output: DirectoryEntryInfo[] = await Promise.all(
    result.map(async (dirent) => {
      const isDirectory = dirent.isDirectory();
      const directory: DirectoryEntryInfo['directory'] = {
        isDirectory,
        content:
          isDirectory && options.depth !== 0
            ? await read(path.join(dirPath, dirent.name), {
                depth: options.depth - 1,
                withDetails: options.withDetails,
              })
            : undefined,
      };

      const stats =
        options.withDetails &&
        (await io.getDetails(path.join(dirPath, dirent.name)));
      const details: DirectoryEntryInfo['details'] = stats
        ? { dateModifiedMs: stats.mtimeMs }
        : undefined;

      return {
        name: dirent.name,
        directory,
        details,
      } as DirectoryEntryInfo;
    })
  );
  return output;
}
