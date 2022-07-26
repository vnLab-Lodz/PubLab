import path from 'path';

const GIT_PATH_DELIMITER = '/';

export const gitPathToAbsolute = (relativePath: string, dirPath: string) =>
  path.join(dirPath, ...relativePath.split(GIT_PATH_DELIMITER));

export const absoluteToGitPath = (absolutePath: string, dirPath: string) =>
  path.relative(dirPath, absolutePath).replaceAll(path.sep, GIT_PATH_DELIMITER);
