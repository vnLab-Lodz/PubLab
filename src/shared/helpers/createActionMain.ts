import { createAliasedAction } from 'electron-redux';

const createActionMain = <T>(type: string) => {
  return createAliasedAction(type, (payload: T) => ({
    type: type,
    payload: payload,
  }));
};

export default createActionMain;
