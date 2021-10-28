import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type CollaboratorElement = {
  githubUsername: string;
  role: string;
};

type PublicationListElement = {
  id: string;
  dirPath: string;
  projectName: string;
  description: string;
  collaborators: [CollaboratorElement];
  packageManager: string;
  useSass: boolean,
  useTypescript: boolean,
};

type PublicationList = {
  list: [PublicationListElement];
};

const initialState: PublicationList = {
  list: [
    {
      id: '',
      dirPath: '',
      projectName: '',
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
    addPublication: (
      state: PublicationList,
      action: PayloadAction<PublicationListElement>
    ) => {
      state.list.push(action.payload);
    },
    deletePublication: (
      state: PublicationList,
      action: PayloadAction<string>
    ) => {
      state.list.filter(element => element.id !== action.payload);
    },
    setPublicationList: (
      state: PublicationList,
      action: PayloadAction<[PublicationListElement]>
    ) => {
      state.list = action.payload;
    },
  },
});

export const { addPublication, deletePublication, setPublicationList } = publicationsSlice.actions;

export const selectPublicationList = (state: RootState) =>
  state.publications.list;

export default publicationsSlice.reducer;
