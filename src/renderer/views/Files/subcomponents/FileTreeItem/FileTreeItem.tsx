import path from 'path';
import React, { useEffect, useState } from 'react';
import { DirectoryEntryInfo } from '../../../../../shared/types/api';
import { readDirectory } from '../../../../ipc';
import FileDisplay from '../../../../components/FileDisplay/FileDisplay';
import * as Styled from './style';

interface Props {
  entry: Required<DirectoryEntryInfo>;
  dirPath: string;
  expandedNodes: string[];
  treeLevel: number;
  depth?: number;
  preload?: boolean;
}

const FileTreeItem = ({
  entry,
  dirPath,
  depth,
  preload,
  expandedNodes,
  treeLevel,
}: Props) => {
  const nodeId = createNodeId(dirPath, entry.directory.isDirectory);
  const dirContent = entry.directory.isDirectory
    ? (entry.directory.content as Required<DirectoryEntryInfo>[])
    : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(
    [] as Required<DirectoryEntryInfo>[] | undefined
  );

  useEffect(() => {
    if (entry.directory.isDirectory && !dirContent && preload) {
      setIsLoading(true);
      readDirectory(dirPath, { depth, withDetails: true }).then((value) => {
        setContent(value as Required<DirectoryEntryInfo>[]);
        setIsLoading(false);
      });
    } else setContent(dirContent);
  }, [preload, dirContent, dirPath]);

  const renderContent = () =>
    contentMap(nodeId, content, {
      dirPath,
      depth,
      expandedNodes,
      treeLevel,
    });

  if (treeLevel === 0) return <>{isLoading ? 'Loading' : renderContent()}</>;
  return (
    <Styled.TreeItem
      nodeId={nodeId}
      treeLevel={treeLevel}
      label={<FileDisplay entry={entry} treeLevel={treeLevel} />}
    >
      {isLoading ? 'Loading' : renderContent()}
    </Styled.TreeItem>
  );
};

FileTreeItem.defaultProps = {
  depth: 1,
  preload: false,
};

export default FileTreeItem;

export function contentMap(
  parentNodeId: string,
  content: Required<DirectoryEntryInfo>[] | undefined,
  props: Pick<Props, 'depth' | 'dirPath' | 'expandedNodes' | 'treeLevel'>
) {
  if (!content) return [];
  return content.map((entry) => {
    const entryPath = path.join(props.dirPath, entry.name);
    const preload =
      props.expandedNodes.includes(parentNodeId) || props.treeLevel === 0;
    return (
      <FileTreeItem
        entry={entry}
        key={entryPath}
        depth={props.depth}
        dirPath={entryPath}
        preload={preload}
        expandedNodes={props.expandedNodes}
        treeLevel={props.treeLevel + 1}
      />
    );
  });
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
