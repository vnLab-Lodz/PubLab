import { TableHead, TableRow, Typography } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import TableCell from '../../../../components/TableCell/TableCell';

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell />
      <TableCell>
        <Typography variant='caption' component='p'>
          {t('publication.title').toLocaleUpperCase()}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='caption' component='p'>
          {t('publication.created_on').toLocaleUpperCase()}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='caption' component='p'>
          {t('publication.change_date').toLocaleUpperCase()}
        </Typography>
      </TableCell>
      <TableCell align='center'>
        <Typography variant='caption' component='p'>
          {t('publication.status').toLocaleUpperCase()}
        </Typography>
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
