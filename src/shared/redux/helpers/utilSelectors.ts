import { createSelector } from '@reduxjs/toolkit';
import { VIEWS } from 'src/renderer/constants/Views';
import { selectCurrentUser } from '../slices/currentUserSlice';
import { selectCurrentView } from '../slices/currentViewSlice';
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

type SelectFirstTimeViewConditionResult = {
  flag: boolean;
  shouldRedirect: boolean;
};
export const selectFirstTimeViewCondition = createSelector<
  [typeof selectDefaultDirPath, typeof selectCurrentView],
  SelectFirstTimeViewConditionResult
>(
  [selectDefaultDirPath, selectCurrentView],
  (dirPath, { view }) => ({
    flag: !!dirPath,
    shouldRedirect: !!dirPath && view === VIEWS.FIRST_TIME,
  }),
  {
    memoizeOptions: {
      resultEqualityCheck: (
        a: SelectFirstTimeViewConditionResult,
        b: SelectFirstTimeViewConditionResult
      ) => a.flag === b.flag && a.shouldRedirect === b.shouldRedirect,
    },
  }
);
