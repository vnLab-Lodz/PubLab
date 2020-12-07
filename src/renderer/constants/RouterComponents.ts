import React from 'react';
import Description from '../components/RouterComponents/Description/Description';
import Files from '../components/RouterComponents/Files/Files';
import Changes from '../components/RouterComponents/Changes/Changes';
import Settings from '../components/RouterComponents/Settings/Settings';
import ProjectsList from '../components/RouterComponents/ProjectsList/ProjectsList';
import AppSettings from '../components/RouterComponents/AppSettings/AppSettings';
import { Subviews, Views } from './VIEWS';
import ProjectInfo from '../components/RouterComponents/ProjectInfo/ProjectInfo';
import NoProjects from '../components/RouterComponents/NoProjects/NoProjects';

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
  [Subviews.NONE]: function () {
    return null;
  },
};
