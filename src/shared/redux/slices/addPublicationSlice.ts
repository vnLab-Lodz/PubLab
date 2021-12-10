import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Collaborator } from './loadPublicationsSlice';

export type NewPublication = {
  // for now there is no image to store, to be added later
  imagePath?: string;
  publicationName: string;
  description: string;
  collaborators: Collaborator[];
  packageManager: string;
  useSass: boolean;
  useTypescript: boolean;
  step: number;
};

// type created to avoid an issue with both unclear modification type
// and index access writes on union of keys, which would complicate the
// code significantly more
type PublicationModification =
  | {
      field: keyof Omit<
        NewPublication,
        'useTypescript' | 'useSass' | 'collaborators' | 'step'
      >;
      value: string;
    }
  | {
      field: keyof Pick<NewPublication, 'useTypescript' | 'useSass'>;
      value: boolean;
    }
  | {
      field: keyof Pick<NewPublication, 'step'>;
      value: number;
    };

const initialState: NewPublication = {
  publicationName: '',
  description: '',
  collaborators: [
    { id: '1', githubUsername: 'karom', role: 'editor' },
    { id: '2', githubUsername: 'karom', role: 'editor' },
  ],
  packageManager: '',
  useSass: false,
  useTypescript: false,
  step: 1,
};

const addPublicationSlice = createSlice({
  name: 'addPublication',
  initialState,
  reducers: {
    deleteDraft: () => initialState,
    setPublicationField: (
      state: NewPublication,
      action: PayloadAction<PublicationModification>
    ) => {
      (state[action.payload.field] as any) = action.payload.value;
    },
    addCollaborator: (
      state: NewPublication,
      action: PayloadAction<Collaborator>
    ) => {
      const collaborator = action.payload;
      state.collaborators.push(collaborator);
    },
    deleteCollaborator: (
      state: NewPublication,
      action: PayloadAction<string>
    ) => {
      const collaboratorId = action.payload;
      const updatedCollaborators = state.collaborators.filter(
        (collaborator) => collaborator.id !== collaboratorId
      );
      state.collaborators = updatedCollaborators;
    },
    increaseStep: (state: NewPublication) => {
      if (state.step < 5) state.step += 1;
    },
    decreaseStep: (state: NewPublication) => {
      if (state.step > 1) state.step -= 1;
    },
  },
});

export const {
  deleteDraft,
  setPublicationField,
  addCollaborator,
  deleteCollaborator,
  increaseStep,
  decreaseStep,
} = addPublicationSlice.actions;

export const newPublication = (state: RootState) => state.newPublication;

export const currentStep = (state: RootState) => state.newPublication.step;

export const collaborators = (state: RootState) =>
  state.newPublication.collaborators;

export default addPublicationSlice.reducer;
