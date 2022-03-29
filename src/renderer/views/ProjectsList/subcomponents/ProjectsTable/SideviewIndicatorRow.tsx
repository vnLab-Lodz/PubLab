import { Box, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TableCell from '../../../../components/TableCell/TableCell';

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

const SideviewIndicatorRow: React.FC<Props> = ({ isSelected, onClick }) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell align='right' colSpan={99}>
        <Box mb='4.5rem' onClick={() => onClick()} sx={{ cursor: 'pointer' }}>
          <Typography variant='caption'>
            {`
            ${t(isSelected ? 'common.hide' : 'common.view').toLocaleUpperCase()}
            ${t('ProjectList.projectDetails').toLocaleUpperCase()} 
            ${isSelected ? '<-' : '->'}
            `}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default SideviewIndicatorRow;
