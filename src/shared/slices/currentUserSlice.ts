import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  authorizeWithGithub,
  requestAccessToken,
} from '../../main/git/gitAuthorization';
import { createAsyncActionMain } from '../helpers/createActionMain';
import { RootState } from '../rootReducer';
import Axios from 'axios';

type AccessToken = {
  value: string;
  type: string;
  scope: string;
};

type CurrentUserData = {
    nick: string;
    avatar: string;
    company: string;
}

type CurrentUser = {
  data: CurrentUserData;
  auth: {
    code: string | null;
    accessToken: AccessToken | null;
    error: any;
    attempted: { code: boolean; token: boolean };
  };
  loading: boolean;
};

const initialState: CurrentUser = {
  data: {
    nick: '',
    avatar: '',
    company: '',
},
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

export const displayUserData = createAsyncActionMain<void>('getUser', (token) => 
{
  return async (dispatch) => 
  {
    try{
      const response = await Axios.get("https://api.github.com/user", {
      headers:
      {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${token}`,
      }
      });
    
      const userData = {
        login: response.data.login,
        avatar: response.data.avatar_url,
        company: response.data.company,
      }
      //console.log(userData);
      console.log(userData.login);
      console.log(userData.avatar);
      console.log(userData.company);
  }
  catch(error){
      console.log(error.response);
   }
  }
}
)


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
      state.auth.attempted.token = true
    },
    tokenRequestRejected: (state: CurrentUser, action: PayloadAction<any>) => {
      state.loading = false;
      state.auth.error = action.payload;
      state.auth.attempted.token = true;
    },
    userLoggedIn: (state: CurrentUser, action: PayloadAction<CurrentUserData>) => {
       state.data.nick = action.payload.nick;
       state.data.avatar = action.payload.avatar;
       state.data.company = action.payload.company;
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
  userLoggedIn,
} = currentUserSlice.actions;


// selector for current user | note the use of RootState type here, it's necessary as selectors access whole state of the store
export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
