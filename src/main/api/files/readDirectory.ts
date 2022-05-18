import path from 'path';
import createFileIO from 'src/main/lib/fileIO';
import { IpcEventHandler } from 'src/shared/types/api';
import { DirectoryEntryInfo } from '../../../shared/types/api';

const readDirectory: IpcEventHandler<DirectoryEntryInfo[]> = async (
  _,
  dirPath: string,
  options?: { depth?: number; withDetails?: boolean }
) => {
  const optionsWithDefaults = {
    depth: 0,
    withDetails: false,
    ...options,
  };
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
  // @ts-expect-error - typescript considers output type unassignable to DirectoryEntryInfo[], even though all elements properties are individually typed
  const output: DirectoryEntryInfo[] = await Promise.all(
    result.map(async (dirent) => {
      const isDirectory = dirent.isDirectory();
      const directory: DirectoryEntryInfo['directory'] = isDirectory
        ? {
            isDirectory,
            content:
              options.depth === 0
                ? undefined
                : await read(path.join(dirPath, dirent.name), {
                    depth: options.depth - 1,
                    withDetails: options.withDetails,
                  }),
          }
        : { isDirectory, content: null };

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
      };
    })
  );
  return output;
}
