import path from 'path';
import { Collaborator, Publication } from 'src/shared/types';
import { createLogger } from '../logger';
import createFileIO from './fileIO';

export const CONFIG_NAME = 'publab.config.json' as const;

type Config = Omit<Publication, 'imagePath'>;

type UpdateConfigFieldParams =
  | {
      field: keyof Pick<Publication, 'collaborators'>;
      value: Collaborator[];
    }
  | {
      field: keyof Pick<Publication, 'useTypescript' | 'useSass'>;
      value: boolean;
    }
  | {
      field: keyof Omit<
        Publication,
        'collaborators' | 'useSass' | 'useTypescript'
      >;
      value: string;
    };

export interface ConfigFileHandler {
  getConfig: () => Promise<Config>;
  setConfig: (config: Config) => Promise<void>;
  createConfigFile: (publication: Config) => Promise<void>;
  updateConfigField: (params: UpdateConfigFieldParams) => Promise<void>;
}

const createConfigFileHandler = (options: {
  dirPath: string;
  name: string;
}): ConfigFileHandler => {
  const logger = createLogger();
  const { dirPath, name } = options;
  const configPath = path.join(dirPath, name, CONFIG_NAME);
  const io = createFileIO();

  return {
    async getConfig() {
      try {
        logger.appendLog(`Reading ${CONFIG_NAME}...`);
        const data = await io.readJSON<Config>(configPath);
        logger.appendLog(`Reading ${CONFIG_NAME} successful.`);
        return data;
      } catch (error) {
        logger.appendError(`Reading ${CONFIG_NAME} failed.`);
        logger.appendError(`${error}`);
        throw new Error('Placeholder for config open error');
      }
    },
    async setConfig(config) {
      try {
        logger.appendLog(`Writing ${CONFIG_NAME}...`);
        await io.writeJSON(configPath, config);
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
        await this.setConfig(publication);
        logger.appendLog('Creating publication configuration file successful.');
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
  };
};

export default createConfigFileHandler;
