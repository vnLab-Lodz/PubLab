import { Table, TableBody } from '@mui/material';
import React from 'react';
import LoaderOverlay from 'src/renderer/components/LoaderOverlay/LoaderOverlay';
import { Publication } from '../../../../../shared/types';
import ProjectRow from './ProjectRow';
import ButtonRow from './ButtonRow';
import TableHeader from './TableHeaders';
import useSelectedProject from './hooks/useSelectedProject';
import useActivePublication from './hooks/useActivePublication';
import useProcessedProjectsList from './hooks/useProcessedProjectList';

interface Props {
  publications: Publication[];
}

const ProjectTable: React.FC<Props> = ({ publications }) => {
  const [selectedProject, selectProject] = useSelectedProject();
  const { activePublicationData, activatePublication, loaderId } =
    useActivePublication();
  const { projectsList, setSortParams, setFilterParams } =
    useProcessedProjectsList(publications);
  return (
    <>
      <Table sx={{ position: 'relative', zIndex: 1 }}>
        <TableHeader />

        {projectsList.map((publication) => {
          const isDescriptionVisible = selectedProject?.id === publication.id;
          const isActive = activePublicationData?.id === publication.id;

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
      <LoaderOverlay id={loaderId} />
    </>
  );
};

export default ProjectTable;
