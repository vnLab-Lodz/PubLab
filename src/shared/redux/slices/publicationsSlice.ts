import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type CollaboratorElement = {
  githubUsername: string;
  role: string;
};

type PublicationListElement = {
  projectName: string;
  collaborators: [CollaboratorElement];
  pmPreference: string;
  description: string;
  dirPath: string;
};

type PublicationList = {
  list: [PublicationListElement];
};

const initialState: PublicationList = {
  list: [
    {
      projectName: '',
      collaborators: [{ githubUsername: '', role: '' }],
      pmPreference: '',
      description: '',
      dirPath: '',
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
    setPublicationList: (
      state: PublicationList,
      action: PayloadAction<[PublicationListElement]>
    ) => {
      state.list = action.payload;
    },
  },
});

export const { addPublication, setPublicationList } = publicationsSlice.actions;

export const selectPublicationList = (state: RootState) =>
  state.publications.list;

export default publicationsSlice.reducer;
