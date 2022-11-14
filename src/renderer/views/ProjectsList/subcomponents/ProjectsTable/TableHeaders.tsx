import {
  Button,
  MenuItem,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import Select from 'src/renderer/components/Select/Select';
import { Publication } from 'src/shared/types';
import TableCell from '../../../../components/TableCell/TableCell';
import { SORTABLE_FIELD, SortParams } from '../../types';

interface Props {
  sortParams: SortParams;
  statusFilterValue: Publication['status'] | null;
  setSortParams: (params: SortParams) => void;
  setStatusFilterValue: (params: Publication['status'] | null) => void;
}

const orderSymbols: { [key in SortParams['direction']]: string } = {
  ascending: ' ↑',
  descending: ' ↓',
};

const TableHeader = ({
  sortParams,
  statusFilterValue,
  setSortParams,
  setStatusFilterValue,
}: Props) => (
  <TableHead>
    <TableRow>
      <TableCell />
      {(Object.values(SORTABLE_FIELD) as SORTABLE_FIELD[]).map((field) => (
        <TableCell key={field}>
          <Button
            variant='text'
            onClick={() =>
              setSortParams({
                field,
                direction:
                  sortParams.field === field
                    ? reverseDirection(sortParams.direction)
                    : 'ascending',
              })
            }
          >
            <Typography variant='caption' component='p'>
              {t(`publication.${field}`)}
              {sortParams.field === field && orderSymbols[sortParams.direction]}
            </Typography>
          </Button>
        </TableCell>
      ))}
      <TableCell>
        <Select
          placeholder={t(`publication.status`).toLocaleUpperCase()}
          value={statusFilterValue || undefined}
          onChange={(e) => {
            const val = e.target.value;
            setStatusFilterValue(
              val === 'any' ? null : (val as 'cloned' | 'remote')
            );
          }}
        >
          {['cloned', 'remote'].map((value) => (
            <MenuItem key={value} value={value}>
              {t(`publication.${value}`)}
            </MenuItem>
          ))}
          <MenuItem value='any'>Any</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;

function reverseDirection(direction: SortParams['direction']) {
  return direction === 'ascending' ? 'descending' : 'ascending';
}
