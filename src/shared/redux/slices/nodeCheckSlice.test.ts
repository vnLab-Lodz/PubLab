import reducer, {
  checkingInstallation,
  nodeInstalled,
  nodeNotInstalled,
} from './nodeCheckSlice';

const initState = {
  installed: null,
  checkingInstall: true,
};

describe('nodeCheckSlice', () => {
  it('handles checkingInstallation action', () => {
    expect(reducer(undefined, checkingInstallation())).toEqual({
      installed: null,
      checkingInstall: true,
    });
  });
  it('handles nodeInstalled action', () => {
    expect(reducer(undefined, nodeInstalled())).toEqual({
      installed: true,
      checkingInstall: false,
    });
  });
  it('handles nodeInstalled action', () => {
    expect(reducer(undefined, nodeNotInstalled())).toEqual({
      installed: false,
      checkingInstall: false,
    });
  });
  it('updates current state properly', () => {
    expect(reducer(initState, checkingInstallation())).toEqual({
      installed: null,
      checkingInstall: true,
    });
  });
  it('updates current state properly', () => {
    expect(reducer(initState, nodeInstalled())).toEqual({
      installed: true,
      checkingInstall: false,
    });
  });
  it('updates current state properly', () => {
    expect(reducer(initState, nodeNotInstalled())).toEqual({
      installed: false,
      checkingInstall: false,
    });
  });
});
