import reducer, {
  checkingInstallation,
  checkNode,
  nodeInstalled,
  nodeNotInstalled,
} from './nodeCheckSlice';

const initState = {
  installed: null,
  checkingInstall: true,
};

jest.mock('../../../main/node/nodeCheck', () => {
  const originalModule = jest.requireActual('../../../main/node/nodeCheck');
  return {
    __esModule: true,
    ...originalModule,
    checkForNode: jest
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValue(true),
  };
});

describe('nodeCheckSlice', () => {
  it('dispatches nodeNotInstalled action if node is not globally installed', () => {
    checkNode();
    // checkForNode() will resolve to false here
    // how can I check if nodeNotInstalled was dispatched?
  });
  it('dispatches nodeInstalled action if node is truly globally installed', () => {
    checkNode();
    // checkForNode() will resolve to true here
    // how can I check if nodeInstalled was dispatched?
  });
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
