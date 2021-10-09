import React from 'react';
import { Subviews, Views } from './Views';
import AppSettings from '../views/AppSettings/AppSettings';
import Description from '../views/Description/Description';
import Files from '../views/Files/Files';
import Changes from '../views/Changes/Changes';
import Settings from '../views/Settings/Settings';
import ProjectsList from '../views/ProjectsList/ProjectsList';
import ProjectInfo from '../views/ProjectInfo/ProjectInfo';
import NoProjects from '../views/NoProjects/NoProjects';

export type RouterComponents = {
  [key in Views | Subviews]: React.FC<any>;
};

// This can be changed when we introduce some i18n
export const COMPONENTS_TRANSLATIONS: Record<Views, string> = {
  PROJECT: 'Project',
  FILES: 'Files',
  CHANGES: 'Changes',
  SETTINGS: 'Settings',

  PROJECTS_LIST: 'Projects list',
  APP_SETTINGS: 'App settings',
};

export const routerComponents: RouterComponents = {
  [Views.PROJECT]: Description,
  [Views.FILES]: Files,
  [Views.CHANGES]: Changes,
  [Views.SETTINGS]: Settings,
  [Views.PROJECTS_LIST]: ProjectsList,
  [Views.APP_SETTINGS]: AppSettings,
  [Subviews.PROJECT_INFO]: ProjectInfo,
  [Subviews.NO_PROJECTS]: NoProjects,
  [Subviews.NONE]: () => null,
};
