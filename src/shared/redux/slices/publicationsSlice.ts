import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type Collaborator = {
  id: string;
  githubUsername: string;
  role: string;
};

type Publication = {
  id: string;
  dirPath: string;
  publicationName: string;
  description: string;
  collaborators: Collaborator[];
  packageManager: string;
  useSass: string;
  useTypescript: string;
};

type PublicationList = {
  list: Publication[];
};

// type created to exclude collaborator type to avoid an issue with
// index access writes on union of keys, which would complicate the
// code significantly more
type PublicationPrimitives = Omit<Publication, 'collaborators'>;

// type created to define payload structure for actions on
// publication primitive fields
type PublicationModification = {
  id: string;
  field: keyof PublicationPrimitives;
  value: string;
};

// type created to define payload structure for actions on
// publication collaborators
type CollaboratorListModification = {
  pubId: string;
  value: Collaborator | string;
};

const initialState: PublicationList = {
  list: [
    {
      id: '',
      dirPath: '',
      publicationName: '',
      description: '',
      collaborators: [{ id: '', githubUsername: '', role: '' }],
      packageManager: '',
      useSass: 'false',
      useTypescript: 'false',
    },
  ],
};

const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    setPublicationsList: (
      state: PublicationList,
      action: PayloadAction<PublicationList>
    ) => {
      state = action.payload;
    },
    addPublication: (
      state: PublicationList,
      action: PayloadAction<Publication>
    ) => {
      state.list.push(action.payload);
    },
    deletePublication: (
      state: PublicationList,
      action: PayloadAction<string>
    ) => {
      const updatedPublications = state.list.filter(
        (publication) => publication.id !== action.payload
      );
      state.list = updatedPublications;
    },
    setPublicationField: (
      state: PublicationList,
      action: PayloadAction<PublicationModification>
    ) => {
      const chosenPubIndex = state.list.findIndex(
        (publication) => publication.id === action.payload.id
      );
      state.list[chosenPubIndex][action.payload.field] = action.payload.value;
    },
    addCollaborator: (
      state: PublicationList,
      action: PayloadAction<CollaboratorListModification>
    ) => {
      const chosenPubIndex = state.list.findIndex(
        (publication) => publication.id === action.payload.pubId
      );
      const collaborator = action.payload.value as Collaborator;
      state.list[chosenPubIndex].collaborators.push(collaborator);
    },
    deleteCollaborator: (
      state: PublicationList,
      action: PayloadAction<CollaboratorListModification>
    ) => {
      const chosenPubIndex = state.list.findIndex(
        (publication) => publication.id === action.payload.pubId
      );
      const collaboratorId = action.payload.value as string;
      const updatedCollaborators = state.list[
        chosenPubIndex
      ].collaborators.filter(
        (collaborator) => collaborator.id !== collaboratorId
      );
      state.list[chosenPubIndex].collaborators = updatedCollaborators;
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
