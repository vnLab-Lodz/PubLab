import { ThemeProvider } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSubview } from '../../../shared/redux/slices/currentViewSlice';
import { Publication } from '../../../shared/types';
import { SUBVIEWS } from '../../constants/Views';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme, mainTheme } from '../../theme';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';
import * as Styled from './style';

interface Props {
  project: Publication;
  useMainTheme?: boolean;
  showAllSubsections?: boolean;
}

const ProjectInfo = ({ project, useMainTheme, showAllSubsections }: Props) => {
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={useMainTheme ? mainTheme : altTheme}>
      <ViewContent isSubview>
        {showAllSubsections && (
          <Styled.CloseButton
            onClick={() => dispatch(updateSubview({ element: SUBVIEWS.NONE }))}
          />
        )}
        <ProjectDetails project={project} />
      </ViewContent>
    </ThemeProvider>
  );
};

ProjectInfo.defaultProps = {
  showAllSubsections: false,
  useMainTheme: false,
};

export default ProjectInfo;
