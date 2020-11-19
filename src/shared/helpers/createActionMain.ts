import { Dispatch } from '@reduxjs/toolkit';
import { createAliasedAction } from 'electron-redux';

type ThunkFunction<T> = (
  payload: T
) => (dispatch: Dispatch<any>) => Promise<void>;

type AsyncActionMainCreator = <T>(type: string, thunk: ThunkFunction<T>) => any;

export const createActionMain = <T>(type: string) => {
  return createAliasedAction(type, (payload: T) => ({
    type: type,
    payload: payload,
  }));
};

export const createAsyncActionMain: AsyncActionMainCreator = (type, thunk) => {
  // @ts-expect-error
  return createAliasedAction(type, thunk);
};
