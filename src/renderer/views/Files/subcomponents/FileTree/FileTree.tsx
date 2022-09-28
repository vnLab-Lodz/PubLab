import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { TreeView } from '@mui/lab';
import path from 'path';
import React from 'react';
import { openInDefaultApp } from 'src/renderer/ipc';
import {
  isClickEvent,
  isKeyboardEvent,
} from 'src/shared/types/eventTypeguards';
import { parseNodeId } from '../FileTreeItem/FileTreeItem';

type Props = {
  currentDirectory: string;
  setCurrentDirectory: React.Dispatch<React.SetStateAction<string>>;
};

const FileTree: React.FC<Props> = ({
  children,
  currentDirectory,
  setCurrentDirectory,
}) => {
  const [focused, setFocused] = React.useState<string>('');
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    const node = parseNodeId(focused);
    if (isOpenInteraction(event)) setCurrentDirectory(node.dirPath);
    else setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent) => {
    if (isOpenInteraction(event) && focused === '..') {
      setCurrentDirectory(path.join(currentDirectory, focused));
      return;
    }
    const node = parseNodeId(focused);
    if (isOpenInteraction(event) && !node.isDirectory)
      openInDefaultApp(node.dirPath);
  };

  return (
    <TreeView
      expanded={expanded}
      selected='' // disable default selection behavior
      defaultCollapseIcon={<ArrowDropDown />}
      defaultExpandIcon={<ArrowRight />}
      onNodeFocus={(e, value) => setFocused(value)}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      {children}
    </TreeView>
  );
};

export default FileTree;

function isOpenInteraction(event: React.SyntheticEvent) {
  return (
    (isKeyboardEvent(event) && event?.key === 'Enter') ||
    (isClickEvent(event) && event.detail === 2)
  );
}
