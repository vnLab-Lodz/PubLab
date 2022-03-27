import { Table, TableBody } from '@mui/material';
import React, { useState } from 'react';
import { Publication } from '../../../../../shared/types';
import ProjectRow from './ProjectRow';
import SideviewIndicatorRow from './SideviewIndicatorRow';
import TableHeader from './TableHeaders';

interface Props {
  publications: Publication[];
}

const ProjectTable: React.FC<Props> = ({ publications }) => {
  const [selectedProject, selectProject] = useState<Publication | null>(null);

  return (
    <Table>
      <TableHeader />

      {publications.map((publication) => {
        const isSelected = selectedProject?.id === publication.id;
        return (
          <TableBody>
            <ProjectRow publication={publication} />
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
