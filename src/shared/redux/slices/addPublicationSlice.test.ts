import { v4 as uuidv4 } from 'uuid';
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
    const { id, ...result } = reducer(undefined, deleteDraft());
    expect(id).toBeDefined();
    expect(result).toEqual({
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
    const { id, ...result } = reducer(undefined, setPublicationField(pubMob));
    expect(id).toBeDefined();
    expect(result).toEqual({
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

    const { id, ...result } = reducer(undefined, addCollaborator(collaborator));
    expect(id).toBeDefined();
    expect(result).toEqual({
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
    const id = uuidv4();
    const initialState: NewPublication = {
      publicationName: '',
      id,
      description: '',
      collaborators: [collaborator],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 1,
    };
    expect(reducer(initialState, deleteCollaborator('id'))).toEqual({
      id,
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
    const id = uuidv4();
    const initialState: NewPublication = {
      id,
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 3,
    };
    expect(reducer(initialState, increaseStep())).toEqual({
      id,
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
    const id = uuidv4();
    const initialState: NewPublication = {
      id,
      publicationName: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
      step: 3,
    };
    expect(reducer(initialState, decreaseStep())).toEqual({
      id,
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
