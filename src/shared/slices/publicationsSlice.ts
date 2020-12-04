import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';



type PublicationListElement = {
    id: number, 
    dirPath: string, 
    publicationName: string
    };

type PublicationList = {
        list: [PublicationListElement]
    };


  const initialState: PublicationList = {list:[{id: 0, dirPath:"", publicationName: ""}]};

  const publicationsSlice = createSlice({
    name: 'publications',
    initialState: initialState,
    reducers: {
      addPublication: (state: PublicationList, action: PayloadAction<PublicationListElement>) => {
        state.list.push(action.payload);
      },
      setPublicationList: (state: PublicationList, action: PayloadAction<[PublicationListElement]>) => {
          state.list = action.payload;
      }
    },
  });

  export const { addPublication, setPublicationList } = publicationsSlice.actions;

  export const selectPublicationList = (state: RootState) => state.publications.list;

  export default publicationsSlice.reducer;