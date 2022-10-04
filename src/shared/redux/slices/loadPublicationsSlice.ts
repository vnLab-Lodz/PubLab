import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import path from 'path';
import { Collaborator, Publication } from 'src/shared/types';
import storage from 'electron-settings';
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
      state.publications = action.payload.map(assignKeepStatuses);
    },
    setActivePublication: (state, action: PayloadAction<string | null>) => {
      state.activePublicationId = action.payload;
    },
    loadPublication: (
      state: PublicationsState,
      action: PayloadAction<Publication>
    ) => {
      state.publications.push(assignKeepStatuses(action.payload));
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
    updatePublication: (
      state: PublicationsState,
      action: PayloadAction<Publication>
    ) => {
      const index = state.publications.findIndex(
        (publication) => publication.id === action.payload.id
      );
      state.publications[index] = action.payload;
    },
    updatePublicationField: (
      state: PublicationsState,
      action: PayloadAction<PublicationModification>
    ) => {
      const { id, value, field } = action.payload;
      const index = state.publications.findIndex((p) => p.id === id);
      if (!state.publications[index]) return;

      (state.publications[index][field] as any) = value;

      const { id: pid } = state.publications[index];
      if (!field.includes('keep') || typeof value !== 'boolean') return;

      storage.set(`${pid}.${field}`, value);
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

        const { repoName, cloneUrl, status, imagePath, ...rest } = publication;
        return {
          ...rest,
          status: 'cloned',
          dirPath: payload.dir,
          imagePath: imagePath ? path.join(payload.dir, imagePath) : undefined,
        };
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
  updatePublication,
  updatePublicationField,
  addCollaborator,
  deleteCollaborator,
  convertPublicationToLocal,
} = loadPublicationsSlice.actions;

export const loadedPublicationsList = createSelector(
  [(state: RootState) => state.loadedPublications.publications],
  (publications) => {
    const collator = new Intl.Collator([], { numeric: true });
    const list = [...publications];
    return list.sort((a, b) => collator.compare(a.name, b.name));
  }
);

export const activePublication = (state: RootState) => {
  const { publications, activePublicationId } = state.loadedPublications;
  return publications.find(
    (publication) => publication.id === activePublicationId
  );
};

export default loadPublicationsSlice.reducer;

export type { PublicationModification, CollaboratorListModification };

function assignKeepStatuses(base: Publication) {
  const publication = { ...base };

  const stored = storage.getSync(publication.id) as any;
  publication.keepDescriptionVisible = !!stored?.keepDescriptionVisible;
  publication.keepSnippetsVisible = !!stored?.keepSnippetsVisible;
  publication.keepServerVisible = !!stored?.keepServerVisible;

  return publication;
}
