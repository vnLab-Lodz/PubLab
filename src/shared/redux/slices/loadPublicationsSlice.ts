import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collaborator, Publication } from 'src/shared/types';
import { RootState } from '../rootReducer';

// type created to avoid an issue with both unclear modification type
// and index access writes on union of keys, which would complicate the
// code significantly more

type PublicationModification = Exclude<
  {
    [FieldName in keyof Publication]: {
      id: string;
      field: FieldName;
      value: Publication[FieldName];
    };
  }[keyof Publication],
  undefined
>;

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
    convertPublicationToLocal: (
      state,
      { payload }: PayloadAction<{ id: string; dir: string }>
    ) => {
      state.publications = state.publications.map((publication) => {
        if (publication.id !== payload.id || publication.status === 'cloned') {
          return publication;
        }

        const { repoName, cloneUrl, status, ...rest } = publication;
        return { ...rest, status: 'cloned', dirPath: payload.dir };
      });
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
  convertPublicationToLocal,
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
