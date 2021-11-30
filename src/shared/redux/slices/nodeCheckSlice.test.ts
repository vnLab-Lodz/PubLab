import reducer, {
  checkingInstallation,
  nodeInstalled,
  nodeNotInstalled,
} from './nodeCheckSlice';

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
});
