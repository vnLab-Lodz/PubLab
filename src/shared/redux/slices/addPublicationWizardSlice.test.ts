import { v4 as uuidv4 } from 'uuid';
import { Collaborator, USER_ROLES } from '../../types';
import reducer, {
  deleteDraft,
  setPublicationField,
  addCollaborator,
  deleteCollaborator,
  increaseStep,
  decreaseStep,
  PublicationModification,
  AddPublicationWizard,
} from './addPublicationWizardSlice';

describe('addPublicationWizardSlice', () => {
  it('handles deleteDraft action', () => {
    const { data, step } = reducer(undefined, deleteDraft());
    const { id, ...result } = data;
    expect(id).toBeDefined();
    expect(step).toBe(1);
    expect(result).toEqual({
      name: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
    });
  });

  it('handles setPublicationField action', () => {
    const pubMob: PublicationModification = {
      field: 'useSass',
      value: true,
    };
    const { data, step } = reducer(undefined, setPublicationField(pubMob));
    const { id, ...result } = data;
    expect(id).toBeDefined();
    expect(step).toBe(1);
    expect(result).toEqual({
      name: '',
      description: '',
      collaborators: [],
      packageManager: 'npm',
      useSass: true,
      useTypescript: false,
    });
  });

  it('handles addCollaborator action', () => {
    const collaborator: Collaborator = {
      id: 'id',
      githubUsername: 'github_user',
      role: USER_ROLES.DEVELOPER,
    };
    const { data, step } = reducer(undefined, addCollaborator(collaborator));
    const { id, ...result } = data;
    expect(id).toBeDefined();
    expect(step).toBe(1);
    expect(result).toEqual({
      name: '',
      description: '',
      collaborators: [collaborator],
      packageManager: 'npm',
      useSass: false,
      useTypescript: false,
    });
  });

  it('handles deleteCollaborator action', () => {
    const collaborator: Collaborator = {
      id: 'id',
      githubUsername: 'github_user',
      role: USER_ROLES.DEVELOPER,
    };
    const id = uuidv4();
    const initialState: AddPublicationWizard = {
      data: {
        name: '',
        id,
        description: '',
        collaborators: [collaborator],
        packageManager: 'npm',
        useSass: false,
        useTypescript: false,
        multilingual: false,
      },
      step: 1,
    };
    expect(reducer(initialState, deleteCollaborator('id'))).toEqual({
      data: {
        id,
        name: '',
        description: '',
        collaborators: [],
        packageManager: 'npm',
        useSass: false,
        useTypescript: false,
      },
      step: 1,
    });
  });

  it('handles increaseStep action', () => {
    const id = uuidv4();
    const initialState: AddPublicationWizard = {
      data: {
        id,
        name: '',
        description: '',
        collaborators: [],
        packageManager: 'npm',
        useSass: false,
        useTypescript: false,
        multilingual: false,
      },
      step: 3,
    };
    expect(reducer(initialState, increaseStep())).toEqual({
      data: {
        id,
        name: '',
        description: '',
        collaborators: [],
        packageManager: 'npm',
        useSass: false,
        useTypescript: false,
        multilingual: false,
      },
      step: 4,
    });
  });

  it('handles decreaseStep action', () => {
    const id = uuidv4();
    const initialState: AddPublicationWizard = {
      data: {
        id,
        name: '',
        description: '',
        collaborators: [],
        packageManager: 'npm',
        useSass: false,
        useTypescript: false,
        multilingual: false,
      },
      step: 3,
    };
    expect(reducer(initialState, decreaseStep())).toEqual({
      data: {
        id,
        name: '',
        description: '',
        collaborators: [],
        packageManager: 'npm',
        useSass: false,
        useTypescript: false,
      },
      step: 2,
    });
  });
});
