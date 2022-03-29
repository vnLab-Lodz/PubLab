import { ThemeProvider } from '@emotion/react';
import { Avatar, TableRow } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Publication } from '../../../../../shared/types';
import TableCell from '../../../../components/TableCell/TableCell';
import { SupportedLangCode } from '../../../../internationalisation/i18next';
import { mainTheme, altTheme } from '../../../../theme';
import getDateString from '../../../../utils/getDateString';
import { HighlightBox } from './style';

interface Props {
  publication: Publication;
  isSelected: boolean;
}

const ProjectRow: React.FC<Props> = ({ publication, isSelected }) => {
  const { t, i18n } = useTranslation();

  return (
    <ThemeProvider theme={isSelected ? mainTheme : altTheme}>
      <TableRow>
        <TableCell
          align='left'
          sx={{ overflow: 'visible', width: '6rem', position: 'relative' }}
        >
          {isSelected && <HighlightBox />}
          <Avatar
            sx={{
              width: '6rem',
              height: '6rem',
              margin: '-3rem -0.5rem -3rem',
              fontSize: '2rem',
            }}
          >
            {publication.name.charAt(0)}
          </Avatar>
        </TableCell>
        <TableCell border sx={{ wordBreak: 'break-all', paddingLeft: '1rem' }}>
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
    </ThemeProvider>
  );
};

export default ProjectRow;
