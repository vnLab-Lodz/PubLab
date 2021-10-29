/**
 * DO NOT MOVE THIS INTO RouterComponents.ts
 * The app will crash for some reason with
 * ReferenceError: $RefreshSig$ is not defined
 */
export enum VIEWS {
  PROJECT = 'PROJECT',
  FILES = 'FILES',
  CHANGES = 'CHANGES',
  SETTINGS = 'SETTINGS',

  PROJECTS_LIST = 'PROJECTS_LIST',
  APP_SETTINGS = 'APP_SETTINGS',
}

export enum SUBVIEWS {
  PROJECT_INFO = 'PROJECT_INFO',
  NO_PROJECTS = 'NO_PROJECTS',
  NONE = 'NONE',
}
