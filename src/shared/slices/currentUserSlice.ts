import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  };
  loading: boolean;
};

const initialState: CurrentUser = {
  data: null,
  auth: {
    code: null,
    accessToken: null,
    error: null,
  },
  loading: false,
};

export const authorizeGitHubUserAsync = createAsyncActionMain<string>(
  'currentUser/authWithGitHub',
  (clientId) => {
    return async (dispatch) => {
      dispatch(authStarted());
      authorizeWithGithub(clientId, ({ code, error }) => {
        code ? dispatch(authFulfilled(code)) : dispatch(authRejected(error));
      });
    };
  }
);

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
    },
    authRejected: (state: CurrentUser, action: PayloadAction<any>) => {
      state.loading = false;
      state.auth.error = action.payload;
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
    },
    tokenRequestRejected: (state: CurrentUser, action: PayloadAction<any>) => {
      state.loading = false;
      state.auth.error = action.payload;
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
