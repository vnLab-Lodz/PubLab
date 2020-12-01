import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccessToken, getUserData, getUserOctokitData } from '../../main/git/gitCurrentUser';
import {
  authorizeWithGithub,
  requestAccessToken,
} from '../../main/git/gitAuthorization';
import { createAsyncActionMain } from '../helpers/createActionMain';
import { RootState } from '../rootReducer';

type AccessToken = {
  value: string;
  type: string;
  scope: string;
};

type CurrentUser = {
  data: {
    nick: string;
  } | null;
  auth: {
    code: string | null;
    accessToken: AccessToken | null;
    error: any;
    attempted: { code: boolean; token: boolean };
  };
  loading: boolean;
};

const initialState: CurrentUser = {
  data: null,
  auth: {
    code: null,
    accessToken: null,
    error: null,
    attempted: { code: false, token: false },
  },
  loading: false,
};

export const authorizeGitHubUserAsync = createAsyncActionMain<{
  clientId: string;
  silent: boolean;
}>('currentUser/authWithGitHub', ({ clientId, silent = false }) => {
  return async (dispatch) => {
    dispatch(authStarted());
    authorizeWithGithub(clientId, silent, ({ code, error }) => {
      code ? dispatch(authFulfilled(code)) : dispatch(authRejected(error));
    });
  };
});

export const requestAccesTokenAsync = createAsyncActionMain<{
  clientId: string;
  clientSecret: string;
  code: string;
}>('auth/github', ({ clientId, clientSecret, code }) => {
  return async (dispatch) => {
    dispatch(tokenRequestStarted());
    const data = await requestAccessToken(clientId, clientSecret, code);
    if ('access_token' in data) {
      dispatch(
        tokenRequestFulfiled({
          value: data.access_token,
          type: data.token_type,
          scope: data.scope,
        })
      );
    } else {
      dispatch(tokenRequestRejected(data));
    }
  };
});
export var acUserToken = "";

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    authStarted: (state: CurrentUser) => {
      state.loading = true;
    },
    authFulfilled: (state: CurrentUser, action: PayloadAction<string>) => {
      state.loading = false;
      state.auth.code = action.payload;
      state.auth.attempted.code = true;
    },
    authRejected: (state: CurrentUser, action: PayloadAction<any>) => {
      state.loading = false;
      state.auth.error = action.payload;
      state.auth.attempted.code = true;
    },
    tokenRequestStarted: (state: CurrentUser) => {
      state.loading = true;
    },
    tokenRequestFulfiled: (
      state: CurrentUser,
      action: PayloadAction<AccessToken>
    ) => {
      state.loading = false;
      state.auth.accessToken = action.payload;
      state.auth.error = null;
      state.auth.attempted.token = true;
      acUserToken = state.auth.accessToken.value;
    },
    tokenRequestRejected: (state: CurrentUser, action: PayloadAction<any>) => {
      state.loading = false;
      state.auth.error = action.payload;
      state.auth.attempted.token = true;
    },
  },
});

// export actions from slice
export const {
  authStarted,
  authFulfilled,
  authRejected,
  tokenRequestStarted,
  tokenRequestFulfiled,
  tokenRequestRejected,
} = currentUserSlice.actions;


// selector for current user | note the use of RootState type here, it's necessary as selectors access whole state of the store
export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
