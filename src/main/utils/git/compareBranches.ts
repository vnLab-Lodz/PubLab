import { RestEndpointMethodTypes } from '@octokit/rest';
import { ReadCommitResult } from 'isomorphic-git';
import path from 'path';
import { mainStore as store } from 'src/main';
import { MAIN_BRANCH } from '../../../shared/constants';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { BranchComparison, LocalPublication } from '../../../shared/types';
import createGitHubHandler from '../../lib/gitHubHandler';
import createGitRepoHandler from '../../lib/gitRepoHandler';
import { createLogger } from '../../logger';

const compareBranches = async ({
  referenceBranch,
  targetBranch,
  useRemote,
}: {
  referenceBranch?: string;
  targetBranch?: string;
  useRemote?: boolean;
}): Promise<BranchComparison> => {
  const logger = createLogger();
  try {
    const publication = activePublication(store.getState()) as LocalPublication;
    const token = store.getState().currentUser.auth.accessToken?.value;
    if (!publication) {
      throw new Error('No active publication!');
    }
    if (!token) {
      throw new Error('No user is logged in!');
    }

    const repoHandler = createGitRepoHandler(publication);
    const githubHandler = createGitHubHandler(token);
    const [commitsA, commitsB] = await Promise.all([
      (await repoHandler.log(referenceBranch)).map(normalizeCommitData),
      (useRemote
        ? await githubHandler.getCommits(
            {
              owner: publication.owner,
              name: path.basename(publication.dirPath),
            },
            targetBranch
          )
        : await repoHandler.log(targetBranch || MAIN_BRANCH)
      ).map(normalizeCommitData),
    ]);

    const result = {
      ahead: commitsB.filter(
        (commitB) => !commitsA.some((commitA) => commitA.sha === commitB.sha)
      ).length,
      behind: commitsA.filter(
        (commitA) => !commitsB.some((commitB) => commitA.sha === commitB.sha)
      ).length,
    };
    return result;
  } catch (err) {
    logger.appendError(err as string);
    return { ahead: 0, behind: 0 };
  }
};

export default compareBranches;

function normalizeCommitData(
  data:
    | ReadCommitResult
    | RestEndpointMethodTypes['repos']['listCommits']['response']['data'][0]
) {
  if ('oid' in data) {
    return {
      sha: data.oid,
    };
  }
  return {
    sha: data.sha,
  };
}
