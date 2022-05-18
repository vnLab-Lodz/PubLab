import React from 'react';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { FolderOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { DirectoryEntryInfo } from '../../../shared/types/api';
import * as Styled from './style';

interface Props {
  entry: Required<DirectoryEntryInfo>;
  treeLevel?: number;
}

const [statuses, colors] = [
  ['added', 'modified', 'deleted', ''],
  ['green', 'blue', 'red', 'primary'],
]; // placeholder

const FileDisplay = ({ entry, treeLevel }: Props) => {
  const dateM = new Date(entry.details.dateModifiedMs);
  const statusIndex = Math.floor(Math.random() * 4);
  return (
    <Styled.DataContainer>
      <Styled.DataField
        sx={{ width: '50%', paddingLeft: `${treeLevel! * 2}rem` }}
      >
        {entry.directory.isDirectory ? <FolderOutlined /> : <FileIcon />}
        {entry.name}
      </Styled.DataField>
      <Styled.DataField>{`${dateM.getDay()}/${dateM.getMonth()}/${dateM.getFullYear()}`}</Styled.DataField>
      <Styled.DataField>
        <Typography
          color={
            // @ts-expect-error placeholder
            (theme) => theme.palette[colors[statusIndex]].main
          }
        >
          {statuses[statusIndex]}
        </Typography>
      </Styled.DataField>
    </Styled.DataContainer>
  );
};

FileDisplay.defaultProps = {
  treeLevel: 0,
};

export default FileDisplay;
