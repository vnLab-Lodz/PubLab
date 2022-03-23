import path from 'path';
import { Json } from 'src/shared/types';
import { createLogger } from '../logger';
import createFileIO from './fileIO';

export const PACKAGE_NAME = 'package.json' as const;

export interface PackageHandler {
  getPackage: () => Promise<Json>;
  setPackage: (packageData: Json) => Promise<void>;
  modifyPackage: (modifier: (pckg: Json) => void) => Promise<void>;
  modifyField: (field: string, value: Json['key']) => Promise<void>;
}

const createPackageHandler = (options: {
  dirPath: string;
  name: string;
}): PackageHandler => {
  const logger = createLogger();
  const { dirPath, name } = options;
  const packagePath = path.join(dirPath, name, PACKAGE_NAME);
  const io = createFileIO();

  return {
    async getPackage() {
      try {
        logger.appendLog('Reading package.json...');
        const data = await io.readJSON<Json>(packagePath);
        logger.appendLog('Reading package.json successful.');
        return data;
      } catch (error) {
        logger.appendError('Reading package.json failed.');
        logger.appendError(`${error}`);
        throw new Error('Placeholder for package open error');
      }
    },
    async setPackage(packageData) {
      try {
        logger.appendLog('Writing package.json...');
        await io.writeJSON(packagePath, packageData);
        logger.appendLog('Writing package.json successful.');
      } catch (error) {
        logger.appendError('Writing package.json failed.');
        logger.appendError(`${error}`);
        throw new Error('Placeholder for package write error');
      }
    },
    async modifyField(field, value) {
      try {
        const data = await this.getPackage();
        logger.appendLog(`Modifying ${field} in package.json...`);
        data[field] = value;
        logger.appendLog(`Modifying ${field} in package.json successful.`);
        await this.setPackage(data);
      } catch (error: any) {
        logger.appendError(`Modifying package.json ${field} failed.`);
        logger.appendError(`${error}`);
        throw new Error(error.message);
      }
    },
    async modifyPackage(modifier) {
      try {
        const data = await this.getPackage();
        logger.appendLog(`Modifying package.json...`);
        modifier(data);
        logger.appendLog(`Modifying package.json successful.`);
        await this.setPackage(data);
      } catch (error: any) {
        logger.appendError('Modifying package.json failed.');
        logger.appendError(`${error}`);
        throw new Error(error.message);
      }
    },
  };
};

export default createPackageHandler;
