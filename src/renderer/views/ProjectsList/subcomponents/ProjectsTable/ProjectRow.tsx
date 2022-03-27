import { Avatar, TableRow } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../../../shared/types';
import TableCell from '../../../../components/TableCell/TableCell';
import { SupportedLangCode } from '../../../../internationalisation/i18next';
import getDateString from '../../../../utils/getDateString';

interface Props {
  publication: Publication;
}

const ProjectRow: React.FC<Props> = ({ publication }) => {
  const { t, i18n } = useTranslation();

  return (
    <TableRow>
      <TableCell sx={{ overflow: 'visible', width: '6rem' }}>
        <Avatar
          sx={{
            width: '6rem',
            height: '6rem',
            margin: '-3rem -0.5rem -3rem 0',
            fontSize: '2rem',
          }}
        >
          {publication.name.charAt(0)}
        </Avatar>
      </TableCell>
      <TableCell border sx={{ wordBreak: 'break-all' }}>
        {publication.name}
      </TableCell>
      <TableCell border align='center'>
        {getDateString(
          publication.creationDate,
          i18n.language as SupportedLangCode
        )}
      </TableCell>
      <TableCell border align='center'>
        {getDateString(
          publication.lastUpdate,
          i18n.language as SupportedLangCode
        )}
      </TableCell>
      <TableCell border align='center'>
        {t(`publication.${publication.status}` as const)}
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
