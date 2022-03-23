import React from 'react';
import { SUBVIEWS, VIEWS } from './Views';
import AppSettings from '../views/AppSettings/AppSettings';
import Description from '../views/Description/Description';
import Files from '../views/Files/Files';
import Changes from '../views/Changes/Changes';
import Settings from '../views/Settings/Settings';
import AddProject from '../views/AddProject/AddProject';
import ProjectsList from '../views/ProjectsList/ProjectsList';
import ProjectInfo from '../views/ProjectInfo/ProjectInfo';
import NoProjects from '../views/NoProjects/NoProjects';
import FirstTime from '../views/FirstTime/FirstTime';
import LogOut from '../views/LogOut/LogOut';

export type RouterComponents = {
  [key in VIEWS | SUBVIEWS]: React.FC<any>;
};

// TODO: Localize the sidebar
// This can be changed when we introduce some i18n
export const COMPONENTS_TRANSLATIONS: Record<VIEWS, string> = {
  FIRST_TIME: 'First time',
  LOGOUT: 'Log out',
  PROJECT: 'Project',
  FILES: 'Files',
  CHANGES: 'Changes',
  SETTINGS: 'Settings',
  ADD_PROJECT: 'Add project',
  PROJECTS_LIST: 'Projects list',
  APP_SETTINGS: 'App settings',
};

export const FULL_SCREEN_VIEWS = [VIEWS.FIRST_TIME];

export const routerComponents: RouterComponents = {
  [VIEWS.FIRST_TIME]: FirstTime,
  [VIEWS.LOGOUT]: LogOut,
  [VIEWS.PROJECT]: Description,
  [VIEWS.FILES]: Files,
  [VIEWS.CHANGES]: Changes,
  [VIEWS.SETTINGS]: Settings,
  [VIEWS.ADD_PROJECT]: AddProject,
  [VIEWS.PROJECTS_LIST]: ProjectsList,
  [VIEWS.APP_SETTINGS]: AppSettings,
  [SUBVIEWS.PROJECT_INFO]: ProjectInfo,
  [SUBVIEWS.NO_PROJECTS]: NoProjects,
  [SUBVIEWS.NONE]: () => null,
};
