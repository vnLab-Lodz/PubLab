import React from 'react';
import { SUBVIEWS, VIEWS } from './Views';
import AppSettings from '../views/AppSettings/AppSettings';
import Description from '../views/Description/Description';
import Files from '../views/Files/Files';
import Changes from '../views/Changes/Changes';
import Settings from '../views/Settings/Settings';
import ProjectsList from '../views/ProjectsList/ProjectsList';
import ProjectInfo from '../views/ProjectInfo/ProjectInfo';
import NoProjects from '../views/NoProjects/NoProjects';
import FirstTime from '../views/FirstTime/FirstTime';

export type RouterComponents = {
  [key in VIEWS | SUBVIEWS]: React.FC<any>;
};

// This can be changed when we introduce some i18n
export const COMPONENTS_TRANSLATIONS: Record<VIEWS, string> = {
  FIRST_TIME: 'First time',
  PROJECT: 'Project',
  FILES: 'Files',
  CHANGES: 'Changes',
  SETTINGS: 'Settings',

  PROJECTS_LIST: 'Projects list',
  APP_SETTINGS: 'App settings',
};

export const routerComponents: RouterComponents = {
  [VIEWS.FIRST_TIME]: FirstTime,
  [VIEWS.PROJECT]: Description,
  [VIEWS.FILES]: Files,
  [VIEWS.CHANGES]: Changes,
  [VIEWS.SETTINGS]: Settings,
  [VIEWS.PROJECTS_LIST]: ProjectsList,
  [VIEWS.APP_SETTINGS]: AppSettings,
  [SUBVIEWS.PROJECT_INFO]: ProjectInfo,
  [SUBVIEWS.NO_PROJECTS]: NoProjects,
  [SUBVIEWS.NONE]: () => null,
};
