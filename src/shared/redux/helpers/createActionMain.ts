import { Dispatch } from '@reduxjs/toolkit';
import { createAliasedAction } from 'electron-redux';

type ThunkFunction<T> = (
  payload: T
) => (dispatch: Dispatch<any>) => Promise<void>;

type AsyncActionMainCreator = <T>(type: string, thunk: ThunkFunction<T>) => any;

export const createActionMain = <T>(type: string) =>
  createAliasedAction(type, (payload: T) => ({
    type,
    payload,
  }));

export const createAsyncActionMain: AsyncActionMainCreator = (type, thunk) =>
  // @ts-expect-error
  createAliasedAction(type, thunk);
