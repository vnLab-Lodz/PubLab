import { Table, TableBody } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import {
  selectCurrentView,
  updateCurrentView,
  updateSubview,
} from '../../../../../shared/redux/slices/currentViewSlice';
import {
  activePublication,
  setActivePublication,
} from '../../../../../shared/redux/slices/loadPublicationsSlice';
import { Publication } from '../../../../../shared/types';
import { SUBVIEWS, VIEWS } from '../../../../constants/Views';
import ProjectRow from './ProjectRow';
import ButtonRow from './ButtonRow';
import TableHeader from './TableHeaders';

interface Props {
  publications: Publication[];
}

const ProjectTable: React.FC<Props> = ({ publications }) => {
  const dispatch = useDispatch();

  const selectedProject: Publication | undefined =
    useSelector(selectCurrentView).subview.props?.project;

  const selectProject = (project: Publication | undefined) => {
    dispatch(
      updateSubview({
        element: project ? SUBVIEWS.PROJECT_INFO : SUBVIEWS.NONE,
        props: { project },
      })
    );
  };

  const activatePublication = async (publication: Publication) => {
    if (publication.status === 'remote') {
      await ipcRenderer.invoke(
        CHANNELS.GIT.CLONE,
        publication.id,
        publication.repoName,
        publication.cloneUrl
      );
    }
    dispatch(setActivePublication(publication.id));
    dispatch(updateCurrentView(VIEWS.PROJECT));
  };

  const activePublicationID: string | undefined =
    useSelector(activePublication)?.id;

  return (
    <Table sx={{ position: 'relative', zIndex: 1 }}>
      <TableHeader />

      {publications.map((publication) => {
        const isDescriptionVisible = selectedProject?.id === publication.id;
        const isActive = activePublicationID === publication.id;

        return (
          <TableBody key={publication.id}>
            <ProjectRow
              publication={publication}
              isSelected={isDescriptionVisible}
            />
            <ButtonRow
              isDescriptionVisible={isDescriptionVisible}
              onClickDescription={() => {
                selectProject(isDescriptionVisible ? undefined : publication);
              }}
              isProjectActive={isActive}
              onClickActivePublication={() => {
                activatePublication(publication);
              }}
            />
          </TableBody>
        );
      })}
    </Table>
  );
};

export default ProjectTable;
