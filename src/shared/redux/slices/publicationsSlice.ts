import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export type Collaborator = {
  id: string;
  githubUsername: string;
  role: string;
};

export type Publication = {
  id: string;
  dirPath: string;
  publicationName: string;
  description: string;
  collaborators: Collaborator[];
  packageManager: string;
  useSass: boolean;
  useTypescript: boolean;
};

// type created to avoid an issue with both unclear modification type
// and index access writes on union of keys, which would complicate the
// code significantly more
type PublicationModification =
  | {
      id: string;
      field: keyof Omit<
        Publication,
        'useTypescript' | 'useSass' | 'collaborators'
      >;
      value: string;
    }
  | {
      id: string;
      field: keyof Pick<Publication, 'useTypescript' | 'useSass'>;
      value: boolean;
    };

type CollaboratorListModification<T> = {
  id: string;
  value: T;
};

const initialState: Publication[] = [];

const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    setPublicationsList: (
      state: Publication[],
      action: PayloadAction<Publication[]>
    ) => action.payload,
    addPublication: (
      state: Publication[],
      action: PayloadAction<Publication>
    ) => {
      state.push(action.payload);
    },
    deletePublication: (
      state: Publication[],
      action: PayloadAction<string>
    ) => {
      const updatedState = state.filter(
        (publication) => publication.id !== action.payload
      );
      return updatedState;
    },
    setPublicationField: (
      state: Publication[],
      action: PayloadAction<PublicationModification>
    ) => {
      const chosenPubIndex = state.findIndex(
        (publication) => publication.id === action.payload.id
      );
      (state[chosenPubIndex][action.payload.field] as any) =
        action.payload.value;
    },
    addCollaborator: (
      state: Publication[],
      action: PayloadAction<CollaboratorListModification<Collaborator>>
    ) => {
      const chosenPubIndex = state.findIndex(
        (publication) => publication.id === action.payload.id
      );
      const collaborator = action.payload.value as Collaborator;
      state[chosenPubIndex].collaborators.push(collaborator);
    },
    deleteCollaborator: (
      state: Publication[],
      action: PayloadAction<CollaboratorListModification<string>>
    ) => {
      const chosenPubIndex = state.findIndex(
        (publication) => publication.id === action.payload.id
      );
      const collaboratorId = action.payload.value as string;
      const updatedCollaborators = state[chosenPubIndex].collaborators.filter(
        (collaborator) => collaborator.id !== collaboratorId
      );
      state[chosenPubIndex].collaborators = updatedCollaborators;
    },
  },
});

export const {
  setPublicationsList,
  addPublication,
  deletePublication,
  setPublicationField,
  addCollaborator,
  deleteCollaborator,
} = publicationsSlice.actions;

export const selectPublicationList = (state: RootState) => state.publications;

export default publicationsSlice.reducer;
