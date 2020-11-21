import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { getAccessToken } from '../../main/git/index';
import { createAsyncActionMain } from '../helpers/createActionMain';

type GithubLogIn = {
    
}

export const githubLogIn = createAsyncActionMain<void>('getAccessToken', () => {
    return async(dispatch) => {
        
    }
}); 