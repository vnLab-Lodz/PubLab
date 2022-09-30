import { Octokit } from '@octokit/rest';
import { MAIN_BRANCH } from '../../shared/constants';
import { Collaborator, USER_ROLES } from '../../shared/types';
import { createLogger } from '../logger';

export interface RepoParams {
  name: string;
  owner: string;
}

class GitHubHandler {
  private logger = createLogger();

  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getPublicUserData(username: string) {
    try {
      const userData = await this.octokit.rest.users.getByUsername({
        username,
      });
      return userData;
    } catch (error) {
      this.logger.appendError(
        `Failed fetching GitHub data of "${username}" \nError:\n ${error}`
      );
      return Promise.reject(error);
    }
  }

  async createRepo(name: string) {
    try {
      const repo = await this.octokit.rest.repos.createForAuthenticatedUser({
        name,
      });
      return repo;
    } catch (error) {
      this.logger.appendError(
        `Failed creating GitHub repository "${name}" \nError:\n ${error}`
      );
      return Promise.reject(error);
    }
  }

  async getRepo({ name, owner }: RepoParams) {
    try {
      const repoData = await this.octokit.rest.repos.get({
        owner,
        repo: name,
      });
      return repoData;
    } catch (error) {
      this.logger.appendError(
        `Failed fetching data of GitHub repository "${name}" \nError:\n ${error}`
      );
      return Promise.reject(error);
    }
  }

  async createBranch(name: string, repo: RepoParams, baseBranch = 'main') {
    try {
      const mainBranch = await this.octokit.rest.git.getRef({
        owner: repo.owner,
        repo: repo.name,
        ref: `heads/${baseBranch}`,
      });
      await this.octokit.rest.git.createRef({
        owner: repo.owner,
        repo: repo.name,
        ref: `refs/heads/${name}`,
        sha: mainBranch.data.object.sha,
      });
      return true;
    } catch (error) {
      this.logger.appendError(
        `Failed creating GitHub branch "${name}" \nError:\n ${error}`
      );
      return Promise.reject(error);
    }
  }

  async getCommits(repo: RepoParams, ref?: string) {
    try {
      const commits = await this.octokit.rest.repos.listCommits({
        owner: repo.owner,
        repo: repo.name,
        sha: ref || MAIN_BRANCH,
      });
      return commits.data;
    } catch (error) {
      this.logger.appendError(
        `Failed fetching commits of repository "${repo.name}" \nError:\n ${error}`
      );
      return Promise.reject(error);
    }
  }

  async updateCollaborators(collaborators: Collaborator[], repo: RepoParams) {
    try {
      const [{ data: existingCollaborators }, pendingInvitations] =
        await Promise.all([
          this.octokit.rest.repos.listCollaborators({
            owner: repo.owner,
            repo: repo.name,
          }),
          this.octokit.rest.repos.listInvitations({
            owner: repo.owner,
            repo: repo.name,
          }),
        ]);

      const toRemove = existingCollaborators.filter(
        (collaborator) =>
          !collaborators.some(
            ({ githubUsername }) => githubUsername === collaborator.login
          )
      );
      const invitationsToRemove = pendingInvitations.data.filter(
        (invitation) =>
          !collaborators.some(
            ({ githubUsername }) => githubUsername === invitation.invitee?.login
          )
      );

      const toAdd = collaborators.filter(
        (collaborator) =>
          !existingCollaborators.some(
            ({ login }) => login === collaborator.githubUsername
          )
      );
      await Promise.allSettled([
        ...toRemove.map((collaborator) =>
          this.octokit.rest.repos.removeCollaborator({
            owner: repo.owner,
            repo: repo.name,
            username: collaborator.login,
          })
        ),
        ...invitationsToRemove.map((invitation) =>
          this.octokit.rest.repos.deleteInvitation({
            owner: repo.owner,
            repo: repo.name,
            invitation_id: invitation.id,
          })
        ),
        ...toAdd.map((collaborator) =>
          this.octokit.rest.repos.addCollaborator({
            username: collaborator.githubUsername,
            owner: repo.owner,
            repo: repo.name,
          })
        ),
        ...toAdd
          .filter((collaborator) => collaborator.role === USER_ROLES.EDITOR)
          .map((collaborator) =>
            this.createBranch(`editor-${collaborator.githubUsername}`, repo)
          ),
      ]);
      return true;
    } catch (error) {
      this.logger.appendError(
        `Failed updating GitHub collaborators of "${repo.name}" \nError:\n ${error}`
      );
      return Promise.reject(error);
    }
  }
}

export default function createGitHubHandler(authToken: string) {
  return new GitHubHandler(authToken);
}
