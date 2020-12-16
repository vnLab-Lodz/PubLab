import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type CollaboratorElement = {
  github_username: string;
  role: string;
};

type PublicationListElement = {
  project_name: string;
  collaborators: [CollaboratorElement];
  pm_preference: string;
  description: string;
  dirPath: string;
};

type PublicationList = {
  list: [PublicationListElement];
};

const initialState: PublicationList = {
  list: [
    {
      project_name: '',
      collaborators: [{ github_username: '', role: '' }],
      pm_preference: '',
      description: '',
      dirPath: '',
    },
  ],
};

const publicationsSlice = createSlice({
  name: 'publications',
  initialState: initialState,
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
