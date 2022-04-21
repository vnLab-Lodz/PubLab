import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collaborator, Publication } from 'src/shared/types';
import { RootState } from '../rootReducer';

// type created to avoid an issue with both unclear modification type
// and index access writes on union of keys, which would complicate the
// code significantly more
type PublicationModification =
  | {
      id: string;
      field: keyof Omit<
        Publication,
        | 'useTypescript'
        | 'useSass'
        | 'collaborators'
        | 'creationDate'
        | 'status'
      >;
      value: string;
    }
  | {
      id: string;
      field: keyof Pick<Publication, 'useTypescript' | 'useSass'>;
      value: boolean;
    }
  | {
      id: string;
      field: keyof Pick<Publication, 'status'>;
      value: 'cloned' | 'remote';
    };

type CollaboratorListModification<T> = {
  id: string;
  value: T;
};

export interface PublicationsState {
  publications: Publication[];
  activePublicationId: string | null;
}

const initialState: PublicationsState = {
  publications: [],
  activePublicationId: null,
};

const loadPublicationsSlice = createSlice({
  name: 'loadPublications',
  initialState,
  reducers: {
    setPublicationsList: (state, action: PayloadAction<Publication[]>) => {
      state.publications = action.payload;
    },
    setActivePublication: (state, action: PayloadAction<string | null>) => {
      state.activePublicationId = action.payload;
    },
    loadPublication: (
      state: PublicationsState,
      action: PayloadAction<Publication>
    ) => {
      state.publications.push(action.payload);
    },
    deletePublication: (
      state: PublicationsState,
      action: PayloadAction<string>
    ) => {
      state.publications = state.publications.filter(
        (publication) => publication.id !== action.payload
      );
      return state;
    },
    updatePublicationField: (
      state: PublicationsState,
      action: PayloadAction<PublicationModification>
    ) => {
      const chosenPubIndex = state.publications.findIndex(
        (publication) => publication.id === action.payload.id
      );
      (state.publications[chosenPubIndex][action.payload.field] as any) =
        action.payload.value;
    },
    addCollaborator: (
      state: PublicationsState,
      action: PayloadAction<CollaboratorListModification<Collaborator>>
    ) => {
      const chosenPubIndex = state.publications.findIndex(
        (publication) => publication.id === action.payload.id
      );
      const collaborator = action.payload.value as Collaborator;
      state.publications[chosenPubIndex].collaborators.push(collaborator);
    },
    deleteCollaborator: (
      state: PublicationsState,
      action: PayloadAction<CollaboratorListModification<string>>
    ) => {
      const chosenPubIndex = state.publications.findIndex(
        (publication) => publication.id === action.payload.id
      );
      const collaboratorId = action.payload.value as string;
      const updatedCollaborators = state.publications[
        chosenPubIndex
      ].collaborators.filter(
        (collaborator) => collaborator.id !== collaboratorId
      );
      state.publications[chosenPubIndex].collaborators = updatedCollaborators;
    },
  },
});

export const {
  setPublicationsList,
  setActivePublication,
  loadPublication,
  deletePublication,
  updatePublicationField,
  addCollaborator,
  deleteCollaborator,
} = loadPublicationsSlice.actions;

export const loadedPublicationsList = (state: RootState) =>
  state.loadedPublications.publications;

export const activePublication = (state: RootState) => {
  const { publications, activePublicationId } = state.loadedPublications;
  return publications.find(
    (publication) => publication.id === activePublicationId
  );
};

export default loadPublicationsSlice.reducer;

export type { PublicationModification, CollaboratorListModification };
