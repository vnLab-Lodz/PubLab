import React from 'react';
import { useSelector } from 'react-redux';
import path from 'path';
import { TreeView } from '@mui/lab';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import FileTreeItem from './subcomponents/FileTreeItem/FileTreeItem';
import ViewContent from '../../components/ViewContent/ViewContent';
import { Header } from '../../components/FileDisplay/Columns';
import Section from '../../components/Section/Section';

const Files = () => {
  const project = useSelector(activePublication) as LocalPublication;
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };
  return (
    <ViewContent>
      <Typography variant='h1' mb={4}>
        {project.name}
      </Typography>
      <Section>
        <Header />
        <TreeView
          expanded={expanded}
          selected={selected}
          defaultCollapseIcon={<ArrowDropDown />}
          defaultExpandIcon={<ArrowRight />}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          <FileTreeItem
            entry={{
              name: project.name,
              directory: { isDirectory: true, content: undefined },
              details: { dateModifiedMs: 0 },
            }}
            dirPath={path.join(project.dirPath)}
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
