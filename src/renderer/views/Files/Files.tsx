import React from 'react';
import { useSelector } from 'react-redux';
import path from 'path';
import { TreeView } from '@mui/lab';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import FileTreeItem, {
  parseNodeId,
} from './subcomponents/FileTreeItem/FileTreeItem';
import ViewContent from '../../components/ViewContent/ViewContent';
import { Header } from '../../components/FileDisplay/Columns';
import Section from '../../components/Section/Section';
import { TreeItem } from './subcomponents/FileTreeItem/style';
import ToParentFolder from './subcomponents/ToParentFolder/ToParentFolder';
import {
  isClickEvent,
  isKeyboardEvent,
} from '../../../shared/types/eventTypeguards';
import { openInDefaultApp } from '../../ipc';
import Breadcrumbs from './subcomponents/Breadcrumbs/Breadcrumbs';

const Files = () => {
  const project = useSelector(activePublication) as LocalPublication;
  const [focused, setFocused] = React.useState<string>('');
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [currentDirectory, setCurrentDirectory] = React.useState(
    path.join(project.dirPath, 'publication')
  );

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
    <ViewContent sx={{ overflowY: 'scroll' }}>
      <Typography variant='h1'>{project.name}</Typography>
      <Breadcrumbs
        projectRootPath={project.dirPath}
        dirPath={currentDirectory}
        onClick={setCurrentDirectory}
      />
      <Section>
        <Header />
        <TreeView
          expanded={expanded}
          selected='' // disable default selection behavior
          defaultCollapseIcon={<ArrowDropDown />}
          defaultExpandIcon={<ArrowRight />}
          onNodeFocus={(e, value) => {
            setFocused(value);
          }}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          <TreeItem
            label={<ToParentFolder />}
            nodeId='..'
            treeLevel={0}
            disabled={currentDirectory === project.dirPath}
          />
          <FileTreeItem
            entry={{
              name: project.name,
              directory: { isDirectory: true, content: undefined },
              details: { dateModifiedMs: 0 },
            }}
            dirPath={currentDirectory}
            depth={1}
            preload
            treeLevel={0}
            expandedNodes={expanded}
          />
        </TreeView>
      </Section>
    </ViewContent>
  );
};

export default Files;

function isOpenInteraction(event: React.SyntheticEvent) {
  return (
    (isKeyboardEvent(event) && event?.key === 'Enter') ||
    (isClickEvent(event) && event.detail === 2)
  );
}
