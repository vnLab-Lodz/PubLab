import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collaborator, PublicationBase } from 'src/shared/types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../rootReducer';

export type AddPublicationWizard = {
  step: number;
  data: PublicationBase;
};

// type created to avoid an issue with both unclear modification type
// and index access writes on union of keys, which would complicate the
// code significantly more
type PublicationModification = Exclude<
  {
    [FieldName in keyof PublicationBase]: {
      field: FieldName;
      value: PublicationBase[FieldName];
    };
  }[keyof PublicationBase],
  undefined
>;
const initialState = (): AddPublicationWizard => ({
  data: {
    id: uuidv4(),
    collaborators: [],
    description: '',
    name: '',
    packageManager: 'npm',
    useSass: false,
    useTypescript: false,
  },
  step: 1,
});

const addPublicationSlice = createSlice({
  name: 'addPublicationWizard',
  initialState: initialState(),
  reducers: {
    deleteDraft: () => initialState(),
    setPublicationField: (
      state: AddPublicationWizard,
      action: PayloadAction<PublicationModification>
    ) => {
      (state.data[action.payload.field] as any) = action.payload.value;
    },
    addCollaborator: (
      state: AddPublicationWizard,
      action: PayloadAction<Collaborator>
    ) => {
      const collaborator = action.payload;
      state.data.collaborators.push(collaborator);
    },
    deleteCollaborator: (
      state: AddPublicationWizard,
      action: PayloadAction<string>
    ) => {
      const collaboratorId = action.payload;
      const updatedCollaborators = state.data.collaborators.filter(
        (collaborator) => collaborator.id !== collaboratorId
      );
      state.data.collaborators = updatedCollaborators;
    },
    increaseStep: (state: AddPublicationWizard) => {
      if (state.step < 5) state.step += 1;
    },
    decreaseStep: (state: AddPublicationWizard) => {
      if (state.step > 1) state.step -= 1;
    },
  },
});

export const {
  deleteDraft,
  setPublicationField,
  addCollaborator,
  deleteCollaborator,
  increaseStep,
  decreaseStep,
} = addPublicationSlice.actions;

export const newPublication = (state: RootState) =>
  state.addPublicationWizard.data;

export const currentStep = (state: RootState) =>
  state.addPublicationWizard.step;

export const collaborators = (state: RootState) =>
  state.addPublicationWizard.data.collaborators;

export default addPublicationSlice.reducer;

export type { PublicationModification };
