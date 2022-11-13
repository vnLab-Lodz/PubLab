import { Publication } from 'src/shared/types';

export interface SortParams {
  field: Exclude<FIELD, FIELD.STATUS>;
  direction: 'ascending' | 'descending';
}

export interface FilterParams {
  field: FIELD.STATUS;
  value: Publication['status'];
}

export enum FIELD {
  TITLE = 'title',
  CREATED_ON = 'created_on',
  CHANGE_DATE = 'change_date',
  STATUS = 'status',
}
