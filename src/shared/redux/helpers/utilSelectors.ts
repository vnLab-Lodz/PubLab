import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentUser } from '../slices/currentUserSlice';
import { selectDefaultDirPath } from '../slices/settingsSlice';

export const selectReadPublicationsOptions = createSelector<
  [typeof selectDefaultDirPath, typeof selectCurrentUser],
  { findLocal: boolean; findRemote: boolean }
>([selectDefaultDirPath, selectCurrentUser], (path, { auth }) => {
  const isTokenValid = !!auth.accessToken?.value;

  return {
    findLocal: isTokenValid && !!path,
    findRemote: isTokenValid,
  };
});
