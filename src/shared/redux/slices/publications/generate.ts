import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../rootReducer';

export enum PUBLICATION_GENERATION_STATUS {
  IDLE,
  GENERATING_GATSBY_PROJECT,
  CREATING_CONFIGURATION_FILE,
  MODIFYING_PACKAGE_JSON,
  MODIFYING_GATSBY_CONFIG,
  SUCCESS,
  FAILURE,
}

export interface PublicationGenerationSlice {
  status: PUBLICATION_GENERATION_STATUS;
}

const initialState: PublicationGenerationSlice = {
  status: PUBLICATION_GENERATION_STATUS.IDLE,
};

const publicationGenerationSlice = createSlice({
  name: 'publicationGeneration',
  initialState,
  reducers: {
    setStatus: (
      state,
      action: PayloadAction<PUBLICATION_GENERATION_STATUS>
    ) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = publicationGenerationSlice.actions;

export const selectPublicationGenerationStatus = (state: RootState) =>
  state.publicationGeneration.status;

export default publicationGenerationSlice.reducer;
