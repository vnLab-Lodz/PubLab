import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PublicationGenerationSlice,
  PUBLICATION_GENERATION_STATUS,
  RootState,
} from 'src/shared/types/redux';

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
