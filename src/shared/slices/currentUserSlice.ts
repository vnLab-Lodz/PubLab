import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  authorizeWithGithub,
  requestAccessToken,
  terminateSession,
} from '../../main/git/gitAuthorization';
import { createAsyncActionMain } from '../helpers/createActionMain';
import { RootState } from '../rootReducer';
import { fetchUserData } from '../../main/git/gitCurrentUser';

export enum AUTH_STATES {
  PRE_AUTHORIZE = 'PRE_AUTHORIZE',
  CODE_REQUESTED = 'CODE_REQUESTED',
  TOKEN_REQUESTED = 'TOKEN_REQUESTED',
  AUTH_FAILED = 'AUTH_FAILED',
  AUTHED = 'AUTHED',
}

type AccessToken = {
  value: string;
  type: string;
  scope: string;
};

type CurrentUserData = {
  nick: string;
  avatar: string;
  company: string;
};

type CurrentUser = {
  data: CurrentUserData | null;
  auth: {
    code: string | null;
    accessToken: AccessToken | null;
    error: any;
  };
  status: AUTH_STATES;

  loading: boolean;
};

const initialState: CurrentUser = {
  data: null,
  auth: {
    code: null,
    accessToken: null,
    error: null,
  },
  status: AUTH_STATES.PRE_AUTHORIZE,
  loading: false,
};

export const authorizeGitHubUserAsync = createAsyncActionMain<boolean>(
  'currentUser/authWithGitHub',
  (silent = false) => {
    return async (dispatch) => {
      dispatch(authStarted());
      authorizeWithGithub(silent, ({ code, error }) => {
        code ? dispatch(authFulfilled(code)) : dispatch(authRejected(error));
      });
    };
  }
);

export const requestAccesTokenAsync = createAsyncActionMain<string>(
  'auth/github',
  (code) => {
    return async (dispatch) => {
      dispatch(tokenRequestStarted());
      const data = await requestAccessToken(code);

      if ('access_token' in data) {
        dispatch(
          tokenRequestFulfilled({
            value: data.access_token,
            type: data.token_type,
            scope: data.scope,
          })
        );
      } else {
        dispatch(tokenRequestRejected(data));
      }
    };
  }
);

export const fetchUserDataAsync = createAsyncActionMain<string>(
  'getUser',
  (token) => {
    return async (dispatch) => {
      dispatch(fetchUserDataStarted());
      const data = await fetchUserData(token);

      if (data) {
        dispatch(fetchUserDataFulfilled(data));
      } else {
        dispatch(fetchUserDataRejected());
      }
    };
  }
);

export const terminateSessionAsync = createAsyncActionMain<void>(
  'currentUser/terminateSession',
  () => {
    return async (dispatch) => {
      await terminateSession();
      dispatch(terminateSessionFulfilled());
    };
  }
);

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
      state.status = AUTH_STATES.CODE_REQUESTED;
    },
    authRejected: (state: CurrentUser, action: PayloadAction<any>) => {
      state.loading = false;
      state.auth.error = action.payload;
      state.status = AUTH_STATES.AUTH_FAILED;
    },
    tokenRequestStarted: (state: CurrentUser) => {
      state.loading = true;
    },
    tokenRequestFulfilled: (
      state: CurrentUser,
      action: PayloadAction<AccessToken>
    ) => {
      state.loading = false;
      state.auth.accessToken = action.payload;
      state.auth.error = null;
      state.status = AUTH_STATES.TOKEN_REQUESTED;
    },
    tokenRequestRejected: (state: CurrentUser, action: PayloadAction<any>) => {
      state.loading = false;
      state.auth.error = action.payload;
      state.status = AUTH_STATES.AUTH_FAILED;
    },
    fetchUserDataStarted: (state: CurrentUser) => {
      state.loading = true;
    },
    fetchUserDataFulfilled: (
      state: CurrentUser,
      action: PayloadAction<CurrentUserData>
    ) => {
      state.loading = false;
      state.data = {
        nick: action.payload.nick,
        avatar: action.payload.avatar,
        company: action.payload.company,
      };
      state.status = AUTH_STATES.AUTHED;
    },
    fetchUserDataRejected: (state: CurrentUser) => {
      state.loading = false;
    },
    terminateSessionFulfilled: () => {
      const resetState = {
        ...initialState,
        auth: {
          ...initialState.auth,
          attempted: {
            code: true,
            token: true,
          },
        },
      };

      return resetState as CurrentUser;
    },
  },
});

export const {
  authStarted,
  authFulfilled,
  authRejected,
  tokenRequestStarted,
  tokenRequestFulfilled,
  tokenRequestRejected,
  fetchUserDataStarted,
  fetchUserDataFulfilled,
  fetchUserDataRejected,
  terminateSessionFulfilled,
} = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
