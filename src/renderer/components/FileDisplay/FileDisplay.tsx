import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileIcon from 'src/renderer/assets/FileIcon/FileIcon';
import FolderIcon from 'src/renderer/assets/FolderIcon/FolderIcon';
import path from 'path';
import { GitRepoTreeItem } from '../../../shared/types/api';
import * as Styled from './style';
import { widths } from './Columns';
import getDateString from '../../utils/getDateString';
import i18n, { SupportedLangCode } from '../../internationalisation/i18next';
import {
  colorMap,
  isChanged,
  toStatusString,
} from '../../../shared/utils/repoStatus/statusChecks';
import { search } from '../../../shared/utils/repoStatus/tree';

interface Props {
  item: GitRepoTreeItem;
  treeLevel?: number;
}

const FileDisplay = ({ item, treeLevel }: Props) => {
  const { t } = useTranslation();
  const status = toStatusString(
    item.isDirectory
      ? search(item, (child) => isChanged(child.status))[0]?.status ||
          'unchanged'
      : item.status
  );
  const color = useTheme().palette[colorMap[status]].main;
  return (
    <Styled.DataContainer>
      <Styled.DataField
        sx={{
          width: widths[0],
          justifyContent: 'start',
          paddingLeft: `${treeLevel! * 2}rem`,
        }}
      >
        {item.isDirectory ? (
          <FolderIcon color={color} />
        ) : (
          <FileIcon color={color} />
        )}
        <Typography ml='0.75rem'>{path.basename(item.filepath)}</Typography>
      </Styled.DataField>
      <Styled.DataField sx={{ width: widths[1] }}>
        <Typography variant='body2'>
          {item.stats &&
            getDateString(
              item.stats.mtimeSeconds * 1000,
              i18n.language as SupportedLangCode
            )}
        </Typography>
      </Styled.DataField>
      <Styled.DataField sx={{ width: widths[2] }}>
        <Typography color={color} variant='body2'>
          {t(`Files.status.${status}`)}
        </Typography>
      </Styled.DataField>
    </Styled.DataContainer>
  );
};

FileDisplay.defaultProps = {
  treeLevel: 0,
};

export default FileDisplay;
