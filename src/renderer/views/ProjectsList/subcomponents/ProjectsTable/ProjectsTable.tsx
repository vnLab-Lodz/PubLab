import { Table, TableBody } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentView,
  updateSubview,
} from '../../../../../shared/redux/slices/currentViewSlice';
import { Publication } from '../../../../../shared/types';
import { SUBVIEWS } from '../../../../constants/Views';
import ProjectRow from './ProjectRow';
import SideviewIndicatorRow from './SideviewIndicatorRow';
import TableHeader from './TableHeaders';

interface Props {
  publications: Publication[];
}

const ProjectTable: React.FC<Props> = ({ publications }) => {
  const dispatch = useDispatch();

  const selectedProject = (useSelector(selectCurrentView).subview.props
    ?.project || null) as Publication | null;

  const selectProject = (project: Publication | null) => {
    dispatch(
      updateSubview({
        element: project ? SUBVIEWS.PROJECT_INFO : SUBVIEWS.NONE,
        props: { project },
      })
    );
  };

  return (
    <Table sx={{ position: 'relative', zIndex: 1 }}>
      <TableHeader />

      {publications.map((publication) => {
        const isSelected = selectedProject?.id === publication.id;
        return (
          <TableBody key={publication.id}>
            <ProjectRow publication={publication} isSelected={isSelected} />
            <SideviewIndicatorRow
              isSelected={isSelected}
              onClick={
                isSelected
                  ? () => selectProject(null)
                  : () => selectProject(publication)
              }
            />
          </TableBody>
        );
      })}
    </Table>
  );
};

export default ProjectTable;
