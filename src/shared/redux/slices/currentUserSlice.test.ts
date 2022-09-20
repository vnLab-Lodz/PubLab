import reducer, {
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
  AUTH_STATES,
  CurrentUser,
} from './currentUserSlice';

describe('currentUserSlice', () => {
  it('handles authStarted action', () => {
    expect(reducer(undefined, authStarted())).toEqual({
      data: null,
      auth: {
        code: null,
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.PRE_AUTHORIZE,
      loading: true,
    });
  });

  it('handles authFulfilled action', () => {
    const string = 'code';
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: null,
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.PRE_AUTHORIZE,
      loading: true,
    };
    expect(reducer(initialState, authFulfilled(string))).toEqual({
      data: null,
      auth: {
        code: string,
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.CODE_REQUESTED,
      loading: false,
    });
  });

  it('handles authRejected action', () => {
    const string = 'code';
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: null,
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.PRE_AUTHORIZE,
      loading: true,
    };
    expect(reducer(initialState, authRejected(string))).toEqual({
      data: null,
      auth: {
        code: null,
        accessToken: null,
        error: string,
      },
      status: AUTH_STATES.AUTH_FAILED,
      loading: false,
    });
  });

  it('handles tokenRequestStarted action', () => {
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: 'code',
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.CODE_REQUESTED,
      loading: false,
    };

    expect(reducer(initialState, tokenRequestStarted())).toEqual({
      data: null,
      auth: {
        code: 'code',
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.CODE_REQUESTED,
      loading: true,
    });
  });

  it('handles tokenRequestFulfilled action', () => {
    const AccessToken = {
      access_token: 'token',
      token_type: 'type',
      scope: 'scope',
      test: 'test',
    };
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: 'code',
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.CODE_REQUESTED,
      loading: true,
    };

    expect(
      reducer(
        initialState,
        tokenRequestFulfilled({
          value: AccessToken.access_token,
          type: AccessToken.token_type,
          scope: AccessToken.scope,
        })
      )
    ).toEqual({
      data: null,
      auth: {
        code: 'code',
        accessToken: {
          value: AccessToken.access_token,
          type: AccessToken.token_type,
          scope: AccessToken.scope,
        },
        error: null,
      },
      status: AUTH_STATES.TOKEN_REQUESTED,
      loading: false,
    });
  });

  it('handles tokenRequestRejected action', () => {
    const data = {
      error_I_guess: 'error I guess?',
    };
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: 'code',
        accessToken: null,
        error: null,
      },
      status: AUTH_STATES.CODE_REQUESTED,
      loading: true,
    };
    expect(reducer(initialState, tokenRequestRejected(data))).toEqual({
      data: null,
      auth: {
        code: 'code',
        accessToken: null,
        error: data,
      },
      status: AUTH_STATES.AUTH_FAILED,
      loading: false,
    });
  });

  it('handles fetchUserDataStarted action', () => {
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: 'code',
        accessToken: {
          value: 'token',
          type: 'type',
          scope: 'scope',
        },
        error: null,
      },
      status: AUTH_STATES.TOKEN_REQUESTED,
      loading: false,
    };
    expect(reducer(initialState, fetchUserDataStarted())).toEqual({
      data: null,
      auth: {
        code: 'code',
        accessToken: {
          value: 'token',
          type: 'type',
          scope: 'scope',
        },
        error: null,
      },
      status: AUTH_STATES.TOKEN_REQUESTED,
      loading: true,
    });
  });

  it('handles fetchUserDataFulfilled action', () => {
    const userData = {
      nick: 'user',
      avatar: 'http://google.com',
      organizations: [],
    };
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: 'code',
        accessToken: {
          value: 'token',
          type: 'type',
          scope: 'scope',
        },
        error: null,
      },
      status: AUTH_STATES.TOKEN_REQUESTED,
      loading: true,
    };
    expect(reducer(initialState, fetchUserDataFulfilled(userData))).toEqual({
      data: {
        nick: 'user',
        avatar: 'http://google.com',
        organizations: [],
      },
      auth: {
        code: 'code',
        accessToken: {
          value: 'token',
          type: 'type',
          scope: 'scope',
        },
        error: null,
      },
      status: AUTH_STATES.AUTHED,
      loading: false,
    });
  });

  it('handles fetchUserDataRejected action', () => {
    const initialState: CurrentUser = {
      data: null,
      auth: {
        code: 'code',
        accessToken: {
          value: 'token',
          type: 'type',
          scope: 'scope',
        },
        error: null,
      },
      status: AUTH_STATES.TOKEN_REQUESTED,
      loading: true,
    };
    expect(reducer(initialState, fetchUserDataRejected())).toEqual({
      data: null,
      auth: {
        code: 'code',
        accessToken: {
          value: 'token',
          type: 'type',
          scope: 'scope',
        },
        error: null,
      },
      status: AUTH_STATES.TOKEN_REQUESTED,
      loading: false,
    });
  });

  it('handles terminateSessionFulfilled action', () => {
    const initialState: CurrentUser = {
      data: {
        nick: 'user',
        avatar: 'http://google.com',
        organizations: [],
      },
      auth: {
        code: 'code',
        accessToken: {
          value: 'token',
          type: 'type',
          scope: 'scope',
        },
        error: null,
      },
      status: AUTH_STATES.AUTHED,
      loading: false,
    };
    expect(reducer(initialState, terminateSessionFulfilled())).toEqual({
      data: null,
      auth: {
        code: null,
        error: null,
        accessToken: null,
        attempted: {
          code: true,
          token: true,
        },
      },

      status: AUTH_STATES.PRE_AUTHORIZE,
      loading: false,
    });
  });
});
