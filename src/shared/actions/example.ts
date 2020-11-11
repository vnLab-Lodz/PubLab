import {createAliasedAction} from "electron-redux";

export const EXAMPLE = 'EXAMPLE';

export function exampleAction(text: string) {
  return {
    type: 'EXAMPLE',
    payload: {text}
  }
}

export function exampleLocalAction(text: string) {
  return {
    type: 'EXAMPLE',
    payload: {text},
    meta: {
      scope: 'local'
    }
  }
}

export const exampleAliasedAction = createAliasedAction(
  'EXAMPLE', (text: string) => ({
    type: 'EXAMPLE',
    payload: {text}
  })
)