import reducer, {
  deleteDraft,
  setPublicationField,
  addCollaborator,
  deleteCollaborator,
  increaseStep,
  decreaseStep,
  PublicationModification,
  NewPublication,
} from './addPublicationSlice';
import { Collaborator } from './loadPublicationsSlice';

describe('addPublicationSlice', () => {
  it('handles deleteDraft action', () => {
    expect(reducer(undefined, deleteDraft())).toEqual({
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 1,
    });
  });

  it('handles setPublicationField action', () => {
    const pubMob: PublicationModification = {
      field: 'useSass',
      value: true,
    };
    expect(reducer(undefined, setPublicationField(pubMob))).toEqual({
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: true,
      useTypescript: false,
      step: 1,
    });
  });

  it('handles addCollaborator action', () => {
    const collaborator: Collaborator = {
      id: 'id',
      githubUsername: 'github_user',
      role: 'role',
    };

    expect(reducer(undefined, addCollaborator(collaborator))).toEqual({
      publicationName: '',
      description: '',
      collaborators: [collaborator],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 1,
    });
  });

  it('handles deleteCollaborator action', () => {
    const collaborator: Collaborator = {
      id: 'id',
      githubUsername: 'github_user',
      role: 'role',
    };
    const initialState: NewPublication = {
      publicationName: '',
      description: '',
      collaborators: [collaborator],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 1,
    };
    expect(reducer(initialState, deleteCollaborator('id'))).toEqual({
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 1,
    });
  });

  it('handles increaseStep action', () => {
    const initialState: NewPublication = {
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 3,
    };
    expect(reducer(initialState, increaseStep())).toEqual({
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 4,
    });
  });

  it('handles decreaseStep action', () => {
    const initialState: NewPublication = {
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 3,
    };
    expect(reducer(initialState, decreaseStep())).toEqual({
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 2,
    });
  });
});
