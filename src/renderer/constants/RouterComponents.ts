import Description from "../components/RouterComponents/Description/Description";
import Files from "../components/RouterComponents/Files/Files";
import Changes from "../components/RouterComponents/Changes/Changes";
import Settings from "../components/RouterComponents/Settings/Settings";
import ProjectsList from "../components/RouterComponents/ProjectsList/ProjectsList";
import AppSettings from "../components/RouterComponents/AppSettings/AppSettings";


export type RouterComponents = {
  [key in COMPONENTS]: React.FC;
};

// This can be changed when we introduce some i18n
export const COMPONENTS_TRANSLATIONS = {
  PROJECT: 'Project',
  FILES: 'Files',
  CHANGES: 'Changes',
  SETTINGS: 'Settings',

  PROJECTS_LIST: 'Projects list',
  APP_SETTINGS: 'App settings',
}

export enum COMPONENTS {
  PROJECT = 'PROJECT',
  FILES = 'FILES',
  CHANGES = 'CHANGES',
  SETTINGS = 'SETTINGS',

  PROJECTS_LIST = 'PROJECTS_LIST',
  APP_SETTINGS = 'APP_SETTINGS',
}

export const routerComponents: RouterComponents = {
  [COMPONENTS.PROJECT]: Description,
  [COMPONENTS.FILES]: Files,
  [COMPONENTS.CHANGES]: Changes,
  [COMPONENTS.SETTINGS]: Settings,
  [COMPONENTS.PROJECTS_LIST]: ProjectsList,
  [COMPONENTS.APP_SETTINGS]: AppSettings,
};