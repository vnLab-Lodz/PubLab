import { ipcRenderer } from 'electron';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRepoTree } from '../../../shared/redux/slices/repoStatusSlice';
import { CHANNELS } from '../../../shared/types/api';
import * as checkStatus from '../../../shared/utils/repoStatus/statusChecks';
import * as repoTree from '../../../shared/utils/repoStatus/tree';
import FileDisplay from '../../components/FileDisplay/FileDisplay';
import ViewContent from '../../components/ViewContent/ViewContent';

const Changes = () => {
  const tree = useSelector(selectRepoTree);
  return (
    <ViewContent>
      {tree &&
        repoTree
          .search(tree, (node) => checkStatus.isModified(node.status))
          .map((item) => checkStatus.toStatusString())}
    </ViewContent>
  );
};

export default Changes;
