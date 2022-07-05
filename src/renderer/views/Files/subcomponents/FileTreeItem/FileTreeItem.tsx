import path from 'path';
import React from 'react';
import { GitRepoTreeItem } from '../../../../../shared/types/api';
import FileDisplay from '../../../../components/FileDisplay/FileDisplay';
import * as Styled from './style';

interface Props {
  item: GitRepoTreeItem;
  treeLevel: number;
  dirPath: string;
  notRendered?: boolean;
}

const FileTreeItem = ({ item, treeLevel, dirPath, notRendered }: Props) => {
  const nodeId = createNodeId(
    path.join(dirPath, item.filepath),
    item.isDirectory
  );

  if (notRendered) return <>{contentMap(item.children, treeLevel, dirPath)}</>;

  return (
    <Styled.TreeItem
      nodeId={nodeId}
      treeLevel={treeLevel}
      label={<FileDisplay item={item} treeLevel={treeLevel} />}
    >
      {contentMap(item.children, treeLevel, dirPath)}
    </Styled.TreeItem>
  );
};
FileTreeItem.defaultProps = {
  notRendered: false,
};

export default FileTreeItem;

export function contentMap(
  children: GitRepoTreeItem[],
  treeLevel: number,
  dirPath: string
) {
  return children.map((item) => (
    <FileTreeItem
      item={item}
      key={item.filepath}
      treeLevel={treeLevel + 1}
      dirPath={dirPath}
    />
  ));
}

const idStrings = { directory: 'dir|', file: 'fil|' };

export function createNodeId(dirPath: string, isDirectory?: boolean) {
  return `${isDirectory ? idStrings.directory : idStrings.file}${dirPath}`;
}

export function parseNodeId(id: string) {
  return {
    dirPath: id.slice(4),
    isDirectory: id.slice(0, 4) === idStrings.directory,
  };
}
