import { TableRow, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TableCell from '../../../../components/TableCell/TableCell';
import { RowButton } from './style';

interface Props {
  isDescriptionVisible: boolean;
  onClickDescription: () => void;
  isProjectActive: boolean;
  onClickActivePublication: () => void;
}

const ButtonRow: React.FC<Props> = ({
  isDescriptionVisible,
  onClickDescription,
  isProjectActive,
  onClickActivePublication,
}) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell />
      <TableCell>
        {isProjectActive ? (
          <Typography
            variant='caption'
            component='div'
            sx={{
              textTransform: 'uppercase',
              mb: '4.5rem',
            }}
          >
            {t('publication.active')}
          </Typography>
        ) : (
          <RowButton
            onClick={() => onClickActivePublication()}
            sx={{ justifyContent: 'left' }}
          >
            <Typography variant='caption'>
              {t('ProjectList.set_active')}
            </Typography>
          </RowButton>
        )}
      </TableCell>
      <TableCell align='right' colSpan={99}>
        <RowButton onClick={() => onClickDescription()}>
          <Typography variant='caption'>
            {`
            ${t(isDescriptionVisible ? 'common.hide' : 'common.view')}
            ${t('ProjectList.projectDetails')} 
            ${isDescriptionVisible ? '<-' : '->'}
            `}
          </Typography>
        </RowButton>
      </TableCell>
    </TableRow>
  );
};

export default ButtonRow;
