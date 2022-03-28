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
import FirstTime from '../views/FirstTime/FirstTime';
import LogOut from '../views/LogOut/LogOut';

export type RouterComponents = {
  [key in VIEWS | SUBVIEWS]: React.FC<any>;
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
  [SUBVIEWS.NONE]: () => null,
};
