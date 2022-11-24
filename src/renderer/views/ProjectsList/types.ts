export enum SORTABLE_FIELD {
  TITLE = 'title',
  CREATED_ON = 'created_on',
  CHANGE_DATE = 'change_date',
}

export interface SortParams {
  field: SORTABLE_FIELD;
  direction: 'ascending' | 'descending';
}
