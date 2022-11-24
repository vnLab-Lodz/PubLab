import {
  Box,
  Button,
  MenuItem,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { Publication } from 'src/shared/types';
import TableCell from '../../../../components/TableCell/TableCell';
import { SORTABLE_FIELD, SortParams } from '../../types';
import { HeaderFilterSelect } from './style';

interface Props {
  sortParams: SortParams;
  statusFilterValue: Publication['status'] | null;
  setSortParams: (params: SortParams) => void;
  setStatusFilterValue: (params: Publication['status'] | null) => void;
}

const orderSymbols: { [key in SortParams['direction']]: string } = {
  ascending: '↑',
  descending: '↓',
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
        <TableCell
          key={field}
          sx={{
            paddingLeft: '1rem',
            textAlign: field === 'title' ? 'left' : 'center',
          }}
        >
          <Button
            variant='text'
            sx={{
              padding: 0,
              minWidth: 0,
              textAlign: field === 'title' ? 'left' : 'center',
            }}
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
            <Box display='flex'>
              <Typography
                variant='caption'
                pl={field === 'title' ? undefined : '1em'}
              >
                {t(`publication.${field}`)}
              </Typography>
              <Typography
                variant='caption'
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{ minWidth: '1em' }}
              >
                {sortParams.field === field &&
                  orderSymbols[sortParams.direction]}
              </Typography>
            </Box>
          </Button>
        </TableCell>
      ))}
      <TableCell
        sx={{
          paddingLeft: '1rem',
          textAlign: 'center',
        }}
      >
        <HeaderFilterSelect
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
              {t(`publication.${value}`).toLocaleUpperCase()}
            </MenuItem>
          ))}
          <MenuItem value='any'>{t('common.all').toLocaleUpperCase()}</MenuItem>
        </HeaderFilterSelect>
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;

function reverseDirection(direction: SortParams['direction']) {
  return direction === 'ascending' ? 'descending' : 'ascending';
}
