/* eslint-disable no-param-reassign */
import fs from 'fs';
import { updateIndex } from 'isomorphic-git';
import path from 'path';
import { IpcEventHandler } from 'src/shared/types/api';
import { CONFIG_NAME, PACKAGE_NAME } from '../../../shared/constants';
import { absoluteToGitPath } from '../../../shared/utils/paths';
import createConfigFileHandler, {
  Config,
} from '../../lib/configurationFileHandler';
import createGatsbyConfigHandler from '../../lib/gatsbyConfigHandler';
import createPackageHandler from '../../lib/packageHandler';

const updateConfig: IpcEventHandler = async (
  _,
  dirPath: string,
  changes: Partial<Config>
) => {
  const configHandler = createConfigFileHandler({ dirPath });
  const oldConfig = await configHandler.getConfig();
  await configHandler.setConfig({ ...oldConfig, ...changes });
  await stageChanges(CONFIG_NAME, dirPath);

  if (changes.name || changes.description) {
    const options = {
      name: path.basename(dirPath),
      dirPath: path.dirname(dirPath),
      usesTypescript: oldConfig.useTypescript,
    };
    const gatsbyConfigHandler = createGatsbyConfigHandler(options);
    await gatsbyConfigHandler.modifyConfig((originalData) => {
      let data = originalData;
      if (changes.name)
        data = data.replace(/title: `(.*?)`,/g, `title: \`${changes.name}\`,`);
      if (changes.description)
        data = data.replace(
          /description: `.*?`,/g,
          `description: \`${changes.description}\`,`
        );
      return data;
    });
    await stageChanges(
      absoluteToGitPath(gatsbyConfigHandler.getPath(), dirPath),
      dirPath
    );

    const packageHandler = createPackageHandler(options);
    await packageHandler.modifyPackage((packageJSON) => {
      if (changes.name)
        packageJSON.name = changes.name.toLowerCase().replaceAll(' ', '-');
      if (changes.description) packageJSON.description = changes.description;
    });

    await stageChanges(PACKAGE_NAME, dirPath);
  }
};

export default updateConfig;

async function stageChanges(filepath: string, dir: string) {
  await updateIndex({
    fs,
    dir,
    filepath,
  });
}
