/**
 * DO NOT MOVE THIS INTO RouterComponents.ts
 * The app will crash for some reason with
 * ReferenceError: $RefreshSig$ is not defined
 */
export enum COMPONENTS {
  PROJECT = 'PROJECT',
  FILES = 'FILES',
  CHANGES = 'CHANGES',
  SETTINGS = 'SETTINGS',

  PROJECTS_LIST = 'PROJECTS_LIST',
  APP_SETTINGS = 'APP_SETTINGS',
}
