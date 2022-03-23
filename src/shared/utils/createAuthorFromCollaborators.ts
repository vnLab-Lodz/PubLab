import { Collaborator } from '../types';

const createAuthorFromCollaborators = (
  collaborators: Collaborator[] = []
): string =>
  collaborators.reduce(
    (acc, { githubUsername }, index, { length }) =>
      `${acc}${githubUsername}${index !== length - 1 ? ', ' : ''}`,
    ''
  );

export default createAuthorFromCollaborators;
