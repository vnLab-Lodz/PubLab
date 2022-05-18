import { Json } from 'src/shared/types';
import { Dirent, promises as fs, Stats } from 'fs';
import { createLogger } from '../logger';

export interface FileIO {
  readDirectory: (path: string) => Promise<Dirent[]>;
  getDetails: (path: string) => Promise<Stats>;
  readJSON: <T = Json>(path: string) => Promise<T>;
  writeJSON: <T = Json>(path: string, content: T) => Promise<void>;
  readString: (path: string) => Promise<string>;
  writeString: (path: string, content: string) => Promise<void>;
  verifyPath: (path: string) => Promise<boolean>;
}

const createFileIO = (): FileIO => {
  const logger = createLogger();

  return {
    async readDirectory(path: string) {
      try {
        return await fs.readdir(path, { withFileTypes: true });
      } catch (error) {
        logger.appendError(
          `Reading directory content at ${path} failed. Error: ${error}`
        );
        throw new Error(`Error writing ${path}`);
      }
    },
    async getDetails(path: string) {
      try {
        return await fs.stat(path);
      } catch (error) {
        logger.appendError(
          `Reading directory content at ${path} failed. Error: ${error}`
        );
        throw new Error(`Error writing ${path}`);
      }
    },
    async readJSON<T = Json>(path: string) {
      try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data) as T;
      } catch (error: any) {
        logger.appendError(`Reading ${path} failed. Error: ${error}`);
        throw new Error(`Error reading ${path}`);
      }
    },
    async writeJSON<T = Json>(path: string, content: T) {
      try {
        await fs.writeFile(path, JSON.stringify(content, null, 2));
      } catch (error: any) {
        logger.appendError(`Writing ${path} failed. Error: ${error}`);
        throw new Error(`Error writing ${path}`);
      }
    },
    async readString(path: string) {
      try {
        const data = await fs.readFile(path, 'utf-8');
        return data;
      } catch (error: any) {
        logger.appendError(`Reading ${path} failed. Error: ${error}`);
        throw new Error(`Error reading ${path}`);
      }
    },
    async writeString(path: string, content: string) {
      try {
        await fs.writeFile(path, content);
      } catch (error: any) {
        logger.appendError(`Writing ${path} failed. Error: ${error}`);
        throw new Error(`Error writing ${path}`);
      }
    },
    async verifyPath(path: string) {
      try {
        await fs.access(path);
        return true;
      } catch (error: any) {
        return false;
      }
    },
  };
};

export default createFileIO;
