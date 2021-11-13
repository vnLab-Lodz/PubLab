import { Dispatch } from '@reduxjs/toolkit';
import { createAliasedAction } from 'electron-redux';
import { RootState } from '../rootReducer';

type ThunkFunction<T> = (
  payload: T
) => (dispatch: Dispatch<any>, getState: () => RootState) => Promise<void>;

interface AliasedThunkAction<T> {
  type: 'ALIASED';
  payload: T;
  meta: { trigger: string };
}

type AsyncActionMainCreator = <T>(
  type: string,
  thunk: ThunkFunction<T>
) => (payload: T) => AliasedThunkAction<T>;

export const createActionMain = <T>(type: string) =>
  createAliasedAction(type, (payload: T) => ({
    type,
    payload,
  }));

export const createAsyncActionMain: AsyncActionMainCreator = (type, thunk) =>
  // @ts-expect-error
  createAliasedAction(type, thunk);
