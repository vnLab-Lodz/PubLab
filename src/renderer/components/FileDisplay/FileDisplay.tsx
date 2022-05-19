import React, { useMemo } from 'react';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderIcon from '@mui/icons-material/FolderOpenTwoTone';
import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DirectoryEntryInfo } from '../../../shared/types/api';
import * as Styled from './style';
import { widths } from './Columns';

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
  const dateM = new Date(entry.details.dateModifiedMs);
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
          <FolderIcon htmlColor={statusColor} />
        ) : (
          <FileIcon htmlColor={statusColor} />
        )}{' '}
        {entry.name}
      </Styled.DataField>
      <Styled.DataField sx={{ width: widths[1] }}>
        <Typography variant='body2'>
          {`${dateM.getDay()}/${dateM.getMonth()}/${dateM.getFullYear()}`}
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
