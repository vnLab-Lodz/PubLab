import React, { useMemo } from 'react';
import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileIcon from 'src/renderer/assets/FileIcon/FileIcon';
import FolderIcon from 'src/renderer/assets/FolderIcon/FolderIcon';
import { DirectoryEntryInfo } from '../../../shared/types/api';
import * as Styled from './style';
import { widths } from './Columns';
import getDateString from '../../utils/getDateString';
import i18n, { SupportedLangCode } from '../../internationalisation/i18next';

interface Props {
  entry: Required<DirectoryEntryInfo>;
  treeLevel?: number;
}

const [statuses, colors] = [
  ['added', 'modified', 'deleted', 'moved', 'unchanged'],
  ['green', 'blue', 'red', 'orange', 'primary'],
] as const; // placeholder

const FileDisplay = ({ entry, treeLevel }: Props) => {
  const { t } = useTranslation();
  const statusIndex = useMemo(() => Math.floor(Math.random() * 5), []);
  const statusColor = useTheme().palette[colors[statusIndex]].main;
  return (
    <Styled.DataContainer>
      <Styled.DataField
        sx={{
          width: widths[0],
          justifyContent: 'start',
          paddingLeft: `${treeLevel! * 2}rem`,
        }}
      >
        {entry.directory.isDirectory ? (
          <FolderIcon color={statusColor} />
        ) : (
          <FileIcon color={statusColor} />
        )}
        <Typography ml='0.75rem'>{entry.name}</Typography>
      </Styled.DataField>
      <Styled.DataField sx={{ width: widths[1] }}>
        <Typography variant='body2'>
          {getDateString(
            entry.details.dateModifiedMs,
            i18n.language as SupportedLangCode
          )}
        </Typography>
      </Styled.DataField>
      <Styled.DataField sx={{ width: widths[2] }}>
        <Typography color={statusColor} variant='body2'>
          {t(`Files.status.${statuses[statusIndex]}`)}
        </Typography>
      </Styled.DataField>
    </Styled.DataContainer>
  );
};

FileDisplay.defaultProps = {
  treeLevel: 0,
};

export default FileDisplay;
