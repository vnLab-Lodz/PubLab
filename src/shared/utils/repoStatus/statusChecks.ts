import { GitFileStatus } from '../../types/api';

export const colorMap = {
  modified: 'blue',
  deleted: 'red',
  added: 'green',
  unchanged: 'primary',
} as const;

export function toStatusString(status: GitFileStatus): keyof typeof colorMap {
  if (isModified(status)) return 'modified';
  if (isDeleted(status)) return 'deleted';
  if (isAdded(status)) return 'added';
  return 'unchanged';
}

export function isChanged({ head, workdir, stage }: GitFileStatus) {
  return head !== workdir || head !== stage;
}

export function isModified({ head, workdir }: GitFileStatus) {
  return head === 1 && workdir === 2;
}

export function isDeleted({ head, workdir }: GitFileStatus) {
  return head === 1 && workdir === 0;
}

export function isAdded({ head, workdir }: GitFileStatus) {
  return head === 0 && workdir === 1;
}

export function isFullyStaged({ workdir, stage }: GitFileStatus) {
  return workdir === stage;
}

export function isPartiallyStaged({ stage }: GitFileStatus) {
  return stage === 3;
}
