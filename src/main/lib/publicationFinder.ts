import { Publication } from 'src/shared/types';
import { promises as fs, Dirent } from 'fs';
import { Octokit } from '@octokit/rest';
import { CONFIG_NAME } from 'src/shared/constants';
import { sendNotification } from 'src/shared/redux/slices/notificationsSlice';
import path from 'path';
import { mainStore as store } from '..';
import createConfigFileHandler, { Config } from './configurationFileHandler';
import { createLogger } from '../logger';

interface Repository {
  name: string;
  owner: string;
  cloneUrl: string;
}

export interface PublicationFinder {
  findLocalPublications(): Promise<Publication[]>;
  findRemotePublications(): Promise<Publication[]>;
}

const createPublicationFinder = (): PublicationFinder => {
  const logger = createLogger();

  return {
    async findLocalPublications() {
      const { appSettings, currentUser } = store.getState();
      const { defaultDirPath: dirPath } = appSettings;
      const user = currentUser.data;

      try {
        const options = { withFileTypes: true } as const;
        const contents = await fs.readdir(dirPath, options);
        const directories = contents.filter((d) => d.isDirectory());
        const publications = [] as Publication[];

        const read = async ({
          name,
        }: Dirent): Promise<Publication | undefined> => {
          const handler = createConfigFileHandler({ dirPath, name });
          const configExists = await handler.checkIfConfigExists();
          if (!configExists) return;

          const config = await handler.getConfig();
          if (
            config.collaborators.find((c) => c.githubUsername === user?.nick)
          ) {
            // TODO: handle the last update parameter
            publications.push({
              ...config,
              status: 'cloned',
              lastUpdate: 0,
              dirPath: path.join(dirPath, name),
              keepDescriptionVisible: false,
              keepSnippetsVisible: false,
              keepServerVisible: false,
            });
          }
        };

        await Promise.all(directories.map(read));

        return publications;
      } catch (error: any) {
        logger.appendLog(error);
        store.dispatch(
          sendNotification({
            type: 'error',
            i18n: {
              key: 'notifications.directory_not_existing',
              params: { dir: dirPath },
            },
          })
        );
        return [];
      }
    },
    async findRemotePublications() {
      const token = store.getState().currentUser.auth.accessToken?.value;
      const { appSettings } = store.getState();
      const { syncLocations } = appSettings;
      const publications: Publication[] = [];

      if (!token) return publications;

      const { repos } = new Octokit({ auth: token }).rest;

      const repositoryPromises = syncLocations
        .filter(({ enabled }) => enabled)
        .map(async ({ name }) => {
          const repositories: Repository[] = [];

          const request = async () => {
            if (name === 'Profile') return repos.listForAuthenticatedUser();
            return repos.listForOrg({ org: name, type: 'member' });
          };

          const { data } = await request();
          data.forEach((r) =>
            repositories.push({
              name: r.name,
              owner: r.owner.login,
              cloneUrl: r.clone_url!,
            })
          );

          const contentPromises = repositories.map(async (repo) => {
            try {
              const { data: contents } = await repos.getContent({
                owner: repo.owner,
                repo: repo.name,
                path: CONFIG_NAME,
              });

              if ('content' in contents && contents.encoding === 'base64') {
                const buffer = Buffer.from(contents.content, contents.encoding);
                const decoded = buffer.toString('ascii');
                const config: Config = JSON.parse(decoded);
                // TODO: handle the last update parameter
                publications.push({
                  ...config,
                  status: 'remote',
                  lastUpdate: 0,
                  cloneUrl: repo.cloneUrl,
                  repoName: repo.name,
                  keepDescriptionVisible: false,
                  keepSnippetsVisible: false,
                  keepServerVisible: false,
                });
              } else {
                logger.appendLog(
                  `Could not read concents of ${CONFIG_NAME} for ${repo.name} repository.`
                );
              }
            } catch (error) {
              logger.appendLog(`${repo.name} is not a publication repository.`);
            }
          });

          await Promise.all(contentPromises);
        });

      await Promise.all(repositoryPromises);

      return publications;
    },
  };
};

export default createPublicationFinder;
