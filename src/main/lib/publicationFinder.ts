import { Publication } from 'src/shared/types';
import { promises as fs, Dirent } from 'fs';
import { mainStore as store } from '..';
import createConfigFileHandler from './configurationFileHandler';

export interface PublicationFinder {
  findLocalPublications(): Promise<Publication[]>;
}

const createPublicationFinder = (): PublicationFinder => ({
  async findLocalPublications() {
    const { defaultDirPath: dirPath } = store.getState().appSettings;

    const options = { withFileTypes: true } as const;
    const contents = await fs.readdir(dirPath, options);
    const directories = contents.filter((d) => d.isDirectory());
    const publications = [] as Publication[];

    const read = async ({ name }: Dirent): Promise<Publication | undefined> => {
      const handler = createConfigFileHandler({ dirPath, name });
      const configExists = await handler.checkIfConfigExists();
      if (!configExists) return;

      const config = await handler.getConfig();
      // TODO: handle the last update parameter
      publications.push({ ...config, status: 'cloned', lastUpdate: 0 });
    };

    await Promise.all(directories.map(read));

    return publications;
  },
});

export default createPublicationFinder;
