import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type Collaborator = {
  githubUsername: string;
  role: string;
};

type Publication = {
  id: string;
  dirPath: string;
  publicationName: string;
  description: string;
  collaborators: [Collaborator];
  packageManager: string;
  useSass: string,
  useTypescript: string,
};

// type created to exclude collaborator type to avoid an issue with
// index access writes on union of keys, which would complicate the
// code significantly more
type PublicationPrimitives = Omit<Publication, "collaborators">;

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
  value: Collaborator;
};


const initialState: [Publication] = [
  {
    id: '',
    dirPath: '',
    publicationName: '',
    description: '',
    collaborators: [{ githubUsername: '', role: '' }],
    packageManager: '',
    useSass: 'false',
    useTypescript: 'false',
  },
];

const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    setPublicationsList: (
      state: [Publication],
      action: PayloadAction<[Publication]>
    ) => {
      state = action.payload;
    },
    addPublication: (
      state: [Publication],
      action: PayloadAction<Publication>
    ) => {
      state.push(action.payload);
    },
    deletePublication: (
      state: [Publication],
      action: PayloadAction<string>
    ) => {
      const newState = state.filter(publication => publication.id !== action.payload) as [Publication];
      state = newState;
    },
    setPublicationField: (
      state: [Publication],
      action: PayloadAction<PublicationModification>
    ) => {
      const chosenPubIndex = state.findIndex(publication => publication.id === action.payload.id);
      state[chosenPubIndex][action.payload.field] = action.payload.value;
    },
    addCollaborator: (
      state: [Publication],
      action: PayloadAction<CollaboratorListModification>
    ) => {
      const chosenPubIndex = state.findIndex(publication => publication.id === action.payload.pubId);
      const collaborator = action.payload.value as Collaborator;
      state[chosenPubIndex].collaborators.push(collaborator);
    },
    deleteCollaborator: (
      state: [Publication],
      action: PayloadAction<CollaboratorListModification>
    ) => {
      const chosenPubIndex = state.findIndex(publication => publication.id === action.payload.pubId);
      const collaborator = action.payload.value;
      const updatedCollaborators = state[chosenPubIndex].collaborators.filter(element => element !== collaborator) as [Collaborator];
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
  deleteCollaborator
} = publicationsSlice.actions;

export const selectPublicationList = (state: RootState) =>
  state.publications;

export default publicationsSlice.reducer;
