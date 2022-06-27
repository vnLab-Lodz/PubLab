import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import path from 'path';
import { TreeView } from '@mui/lab';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { ipcRenderer } from 'electron';
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
import { selectRepoTree } from '../../../shared/redux/slices/repoStatusSlice';
import { findByPath } from '../../../shared/utils/repoStatus/tree';
import { CHANNELS } from '../../../shared/types/api';

const Files = () => {
  const project = useSelector(activePublication) as LocalPublication;
  const RepoTree = useSelector(selectRepoTree);
  const [focused, setFocused] = React.useState<string>('');
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [currentDirectory, setCurrentDirectory] = React.useState(
    path.join(project.dirPath, 'publication')
  );

  useEffect(() => {
    ipcRenderer.invoke(CHANNELS.FILES.WATCH_PROJECT_DIR.START);
    return () => {
      ipcRenderer.invoke(CHANNELS.FILES.WATCH_PROJECT_DIR.STOP);
    };
  }, []);

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
  if (RepoTree === undefined) return <></>;
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
            item={
              findByPath(
                RepoTree,
                path.join(path.relative(project.dirPath, currentDirectory))
              ) || RepoTree
            }
            treeLevel={0}
            dirPath={project.dirPath}
            notRendered
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
