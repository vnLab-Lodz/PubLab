import { RestEndpointMethodTypes } from '@octokit/rest';
import { ReadCommitResult } from 'isomorphic-git';
import path from 'path';
import { mainStore as store } from 'src/main';
import { MAIN_BRANCH } from '../../../shared/constants';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { BranchComparison, LocalPublication } from '../../../shared/types';
import createGitHubHandler from '../../lib/gitHubHandler';
import createGitRepoHandler from '../../lib/gitRepoHandler';

const compareBranches = async (
  branchA?: string,
  branchB?: string,
  opts?: { useRemote?: boolean }
): Promise<BranchComparison> => {
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
    (await repoHandler.log(branchA)).map(normalizeCommitData),
    (opts?.useRemote
      ? await githubHandler.getCommits(
          {
            owner: publication.owner,
            name: path.basename(publication.dirPath),
          },
          branchB
        )
      : await repoHandler.log(branchB || MAIN_BRANCH)
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
