/**
 * DO NOT MOVE THIS INTO RouterComponents.ts
 * The app will crash for some reason with
 * ReferenceError: $RefreshSig$ is not defined
 */
export enum VIEWS {
  FIRST_TIME = 'FIRST_TIME',
  LOGOUT = 'LOGOUT',
  PROJECT = 'PROJECT',
  NO_ACTIVE_PROJECT = 'NO_ACTIVE_PROJECT',
  FILES = 'FILES',
  CHANGES = 'CHANGES',
  SETTINGS = 'SETTINGS',
  ADD_PROJECT = 'ADD_PROJECT',
  PROJECTS_LIST = 'PROJECTS_LIST',
  APP_SETTINGS = 'APP_SETTINGS',
}

export enum SUBVIEWS {
  PROJECT_INFO = 'PROJECT_INFO',
  NONE = 'NONE',
}
