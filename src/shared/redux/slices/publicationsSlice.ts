import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type CollaboratorElement = {
  githubUsername: string;
  role: string;
};

type PublicationListElement = {
  id: string;
  dirPath: string;
  publicationName: string;
  description: string;
  collaborators: [CollaboratorElement];
  packageManager: string;
  useSass: boolean,
  useTypescript: boolean,
};

type PublicationsList = {
  list: [PublicationListElement];
};

type ModifiedPublication<T> = {
  id: string;
  value: T;
};

const initialState: PublicationsList = {
  list: [
    {
      id: '',
      dirPath: '',
      publicationName: '',
      description: '',
      collaborators: [{ githubUsername: '', role: '' }],
      packageManager: '',
      useSass: false,
      useTypescript: false,
    },
  ],
};

const publicationsSlice = createSlice({
  name: 'publications',
  initialState,
  reducers: {
    setPublicationsList: (
      state: PublicationsList,
      action: PayloadAction<[PublicationListElement]>
    ) => {
      state.list = action.payload;
    },
    addPublication: (
      state: PublicationsList,
      action: PayloadAction<PublicationListElement>
    ) => {
      state.list.push(action.payload);
    },
    deletePublication: (
      state: PublicationsList,
      action: PayloadAction<string>
    ) => {
      state.list.filter(element => element.id !== action.payload);
    },
    setProjectName: (
      state: PublicationsList,
      action: PayloadAction<ModifiedPublication<string>>
    ) => {
      const changedProjectIndex = state.list.findIndex(element => element.id === action.payload.id);
      state.list[changedProjectIndex].publicationName = action.payload.value;
    },
  },
});

export const { addPublication, deletePublication, setPublicationsList } = publicationsSlice.actions;

export const selectPublicationList = (state: RootState) =>
  state.publications.list;

export default publicationsSlice.reducer;
