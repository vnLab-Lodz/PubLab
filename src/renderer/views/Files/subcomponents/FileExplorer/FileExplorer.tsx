import React from 'react';
import { LocalPublication } from 'src/shared/types';
import { findByPath } from 'src/shared/utils/repoStatus/tree';
import { GitRepoTreeItem } from 'src/shared/types/api';
import path from 'path';
import { Header } from '../../../../components/FileDisplay/Columns';
import Section from '../../../../components/Section/Section';
import { TreeItem } from '../FileTreeItem/style';
import ToParentFolder from '../ToParentFolder/ToParentFolder';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import FileTreeItem from '../FileTreeItem/FileTreeItem';
import FileTree from '../FileTree/FileTree';

type Props = {
  project: LocalPublication;
  RepoTree: GitRepoTreeItem;
};

const FileExplorer: React.FC<Props> = ({ project, RepoTree }) => {
  const getPath = () => path.join(project.dirPath, 'publication');
  const [currentDirectory, setCurrentDirectory] = React.useState(getPath);

  return (
    <>
      <Breadcrumbs
        projectRootPath={project.dirPath}
        dirPath={currentDirectory}
        onClick={setCurrentDirectory}
      />
      <Section>
        <Header />
        <FileTree
          currentDirectory={currentDirectory}
          setCurrentDirectory={setCurrentDirectory}
        >
          <TreeItem
            label={<ToParentFolder />}
            nodeId='..'
            treeLevel={0}
            disabled={currentDirectory === project.dirPath}
          />
          <FileTreeItem
            item={findByPath(RepoTree, currentDirectory) || RepoTree}
            treeLevel={0}
            dirPath={project.dirPath}
            notRendered
          />
        </FileTree>
      </Section>
    </>
  );
};

export default FileExplorer;
