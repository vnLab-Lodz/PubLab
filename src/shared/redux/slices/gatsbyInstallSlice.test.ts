import reducer, {
  installExecuting,
  installFulfilled,
  installRejected,
  checkRejected,
  checkingInstall,
} from './gatsbyInstallSlice';

describe('gatsbyInstallSlice', () => {
  it('handles installExecuting action', () => {
    expect(reducer(undefined, installExecuting())).toEqual({
      installing: true,
      installSuccess: null,
      checkingInstall: false,
    });
  });

  it('handles installFulfilled action', () => {
    expect(reducer(undefined, installFulfilled())).toEqual({
      installing: false,
      installSuccess: true,
      checkingInstall: false,
    });
  });

  it('handles installRejected action', () => {
    expect(reducer(undefined, installRejected())).toEqual({
      installing: false,
      installSuccess: false,
      checkingInstall: false,
    });
  });

  it('handles checkRejected action', () => {
    expect(reducer(undefined, checkRejected())).toEqual({
      installing: false,
      installSuccess: null,
      checkingInstall: false,
    });
  });

  it('handles checkingInstall action', () => {
    expect(reducer(undefined, checkingInstall())).toEqual({
      installing: false,
      installSuccess: null,
      checkingInstall: true,
    });
  });
});
