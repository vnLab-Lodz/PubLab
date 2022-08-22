import path from 'path';
import { CONFIG_NAME } from 'src/shared/constants';
import { Publication, PublicationBase } from 'src/shared/types';
import { promises as fs, constants } from 'fs';
import { createLogger } from '../logger';
import createFileIO from './fileIO';

export type Config = Omit<
  Publication,
  'lastUpdate' | 'status' | 'keepSnippetsVisible' | 'keepDescriptionVisible'
>;

type UpdateConfigFieldParams = Exclude<
  {
    [FieldName in keyof Config]: {
      field: FieldName;
      value: Publication[FieldName];
    };
  }[keyof Config],
  undefined
>;

export interface ConfigFileHandler {
  getConfig: () => Promise<Config>;
  setConfig: (config: Config) => Promise<void>;
  createConfigFile: (publication: PublicationBase) => Promise<Config>;
  updateConfigField: (params: UpdateConfigFieldParams) => Promise<void>;
  checkIfConfigExists: () => Promise<boolean>;
}

const createConfigFileHandler = (options: {
  dirPath: string;
  name?: string;
}): ConfigFileHandler => {
  const logger = createLogger();
  const { dirPath, name } = options;
  const configPath = path.join(dirPath, name || '', CONFIG_NAME);
  const io = createFileIO();

  return {
    async getConfig() {
      try {
        logger.appendLog(`Reading ${CONFIG_NAME}...`);
        const data = await io.readJSON<Config>(configPath);
        logger.appendLog(`Reading ${CONFIG_NAME} successful.`);
        return imagePathToAbsolute(data, configPath);
      } catch (error) {
        logger.appendError(`Reading ${CONFIG_NAME} failed.`);
        logger.appendError(`${error}`);
        throw new Error('Placeholder for config open error');
      }
    },
    async setConfig(config: Config) {
      try {
        logger.appendLog(`Writing ${CONFIG_NAME}...`);
        await io.writeJSON(configPath, imagePathToRelative(config, configPath));
        logger.appendLog(`Writing ${CONFIG_NAME} successful.`);
      } catch (error) {
        logger.appendError(`Writing ${CONFIG_NAME} failed.`);
        logger.appendError(`${error}`);
        throw new Error('Placeholder for config write error');
      }
    },
    async createConfigFile(publication) {
      try {
        logger.appendLog('Creating publication configuration file...');
        const creationDate = +new Date();
        const config: Config = {
          ...publication,
          creationDate,
          tags: [],
          snippets: [],
        };
        await this.setConfig(config);
        logger.appendLog('Creating publication configuration file successful.');
        return config;
      } catch (error: any) {
        logger.appendError('Creating publication configuration file failed.');
        logger.appendError(`${error}`);
        throw new Error(error.message);
      }
    },
    async updateConfigField({ field, value }) {
      try {
        const data = await this.getConfig();
        const config = { ...data, [field]: value };
        logger.appendLog('Updating publication config file field...');
        await this.setConfig(config);
        logger.appendLog('Updating publication config file field successful.');
      } catch (error: any) {
        logger.appendError('Creating publication config file failed.');
        logger.appendError(`${error}`);
        throw new Error(error.message);
      }
    },
    async checkIfConfigExists() {
      try {
        logger.appendLog(`Checking ${CONFIG_NAME} existence...`);
        await fs.access(configPath, constants.F_OK);
        logger.appendLog(`Checking ${CONFIG_NAME} existence successful.`);
        return true;
      } catch (error) {
        logger.appendError(`Checking ${CONFIG_NAME} existence failed.`);
        logger.appendError(`${error}`);
        return false;
      }
    },
  };
};

export default createConfigFileHandler;

function imagePathToAbsolute(config: Config, configPath: string) {
  return {
    ...config,
    imagePath: config.imagePath
      ? path.resolve(path.dirname(configPath), config.imagePath)
      : undefined,
  };
}

function imagePathToRelative(config: Config, configPath: string) {
  return {
    ...config,
    imagePath: config.imagePath
      ? path.relative(path.dirname(configPath), config.imagePath)
      : undefined,
  };
}
