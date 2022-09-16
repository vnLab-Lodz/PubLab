import { ThemeProvider } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import Terminal from 'src/renderer/components/Terminal/Terminal';
import { isLocalPublication } from 'src/shared/utils/typeChecks';
import { updateSubview } from '../../../shared/redux/slices/currentViewSlice';
import { Publication } from '../../../shared/types';
import { SUBVIEWS } from '../../constants/Views';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme, mainTheme } from '../../theme';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import * as Styled from './style';
import { updatePublicationField } from '../../../shared/redux/slices/loadPublicationsSlice';
import Snippets from '../../components/Snippets/Snippets';

interface Props {
  project: Publication;
  useMainTheme?: boolean;
  showAllSubsections?: boolean;
}

const ProjectInfo = ({ project, useMainTheme, showAllSubsections }: Props) => {
  const dispatch = useDispatch();

  const isTerminalVisible =
    isLocalPublication(project) &&
    project.keepServerVisible &&
    !showAllSubsections;

  return (
    <ThemeProvider theme={useMainTheme ? mainTheme : altTheme}>
      <ViewContent isSubview>
        {showAllSubsections && (
          <Styled.CloseButton
            onClick={() => dispatch(updateSubview({ element: SUBVIEWS.NONE }))}
          />
        )}
        {(showAllSubsections || project.keepDescriptionVisible) && (
          <Styled.Section>
            {!showAllSubsections && project.keepDescriptionVisible && (
              <Styled.CloseButton
                onClick={() =>
                  dispatch(
                    updatePublicationField({
                      id: project.id,
                      field: 'keepDescriptionVisible',
                      value: false,
                    })
                  )
                }
              />
            )}

            <ProjectDetails project={project} />
          </Styled.Section>
        )}
        {(showAllSubsections || project.keepSnippetsVisible) && (
          <Styled.Section>
            {!showAllSubsections && project.keepSnippetsVisible && (
              <Styled.CloseButton
                onClick={() =>
                  dispatch(
                    updatePublicationField({
                      id: project.id,
                      field: 'keepSnippetsVisible',
                      value: false,
                    })
                  )
                }
              />
            )}

            <Snippets project={project} />
          </Styled.Section>
        )}
        {isTerminalVisible && (
          <Styled.Section>
            <Styled.CloseButton
              onClick={() =>
                dispatch(
                  updatePublicationField({
                    id: project.id,
                    field: 'keepServerVisible',
                    value: false,
                  })
                )
              }
            />
            <Terminal project={project} />
          </Styled.Section>
        )}
      </ViewContent>
    </ThemeProvider>
  );
};

ProjectInfo.defaultProps = {
  showAllSubsections: false,
  useMainTheme: false,
};

export default ProjectInfo;
