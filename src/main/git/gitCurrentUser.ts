import { Octokit } from '@octokit/rest';

/**
 * TODO: @deprecated This should be moved to the api in the near future
 */
export async function fetchUserData(token: string) {
  const octokit = new Octokit({ auth: token });
  const { getAuthenticated } = octokit.rest.users;
  const { listMembershipsForAuthenticatedUser } = octokit.rest.orgs;

  try {
    const { data: user } = await getAuthenticated();
    const { data: orgs } = await listMembershipsForAuthenticatedUser();

    const { login: nick, avatar_url: avatar } = user;
    const organizations = orgs.map(({ organization }) => organization.login);

    return { nick, avatar, organizations };
  } catch (error: any) {
    console.error(error.response);
    return undefined;
  }
}
