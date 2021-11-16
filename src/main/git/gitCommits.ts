import { Octokit } from '@octokit/rest';
import { Commit, CommitDiff } from './gitTypes';
import { appendLog } from '../logger';

/**
 * Returns a list of commits in the given repository of the user
 * @param accessToken - the accessToken
 * @param repo -  name of the repository
 * @param owner - username of the owner of the repository
 */
export function getListOfCommits(
  accessToken: string,
  repo: string,
  owner: string
): Commit[] {
  const commits: Commit[] = [];
  const octokit = new Octokit({
    auth: accessToken,
  });
  octokit.repos.listCommits({ owner, repo }).then((res: any) => {
    res.data.forEach((commit: any) => {
      commits.push({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
      });
    });
  });
  return commits;
}

/**
 * Gets all file changes for the given commit in the repository of the user
 * @param accessToken accessToken
 * @param repo name of the repository in which the commit was made
 * @param owner owner of the repository
 * @param ref sha of the commit
 */
export function getCommitChanges(
  accessToken: string,
  repo: string,
  owner: string,
  ref: string
): CommitDiff[] {
  const diffs: CommitDiff[] = [];
  const octokit = new Octokit({
    auth: accessToken,
  });
  octokit.repos
    .getCommit({
      owner,
      repo,
      ref,
    })
    .then((res: any) => {
      appendLog(res);
      res.data.files.forEach((file: any) => {
        diffs.push({
          filename: file.filename,
          differences: file.patch,
        });
      });
    });
  return diffs;
}
