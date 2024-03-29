import React, { useEffect, useMemo, useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { ipcRenderer } from 'electron';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectPublicationGenerationStatus,
  setStatus,
  PUBLICATION_GENERATION_STATUS,
} from 'src/shared/redux/slices/publicationGenerationSlice';
import { updateCurrentView } from 'src/shared/redux/slices/currentViewSlice';
import { VIEWS } from 'src/renderer/constants/Views';
import { v4 } from 'uuid';
import { USER_ROLES } from 'src/shared/types';
import { selectCurrentUserData } from 'src/shared/redux/slices/currentUserSlice';
import { CHANNELS } from '../../../shared/types/api';
import GenerationOverlay from './subcomponents/GenerationOverlay/GenerationOverlay';
import StepControls from './subcomponents/StepControls/StepControls';
import useUnmountEffect from '../../hooks/useUnmountEffect';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import {
  addCollaborator,
  currentStep as stepSelector,
  decreaseStep,
  deleteDraft,
  increaseStep,
  newPublication,
  setPublicationField,
} from '../../../shared/redux/slices/addPublicationWizardSlice';
import steps from './subcomponents/Steps/Steps';

const { IDLE, FAILURE, SUCCESS } = PUBLICATION_GENERATION_STATUS;

const AddProject = () => {
  const currentStep = useSelector(stepSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const status = useSelector(selectPublicationGenerationStatus);
  const user = useSelector(selectCurrentUserData);
  const publication = useSelector(newPublication);

  useUnmountEffect(() => {
    dispatch(deleteDraft());
    dispatch(setStatus(IDLE));
  }, []);

  useEffect(() => {
    if (status === SUCCESS) dispatch(updateCurrentView(VIEWS.PROJECT));
  }, [status]);

  useEffect(() => {
    if (!user) return;

    dispatch(setPublicationField({ field: 'owner', value: user.nick }));

    dispatch(
      addCollaborator({
        id: v4(),
        role: USER_ROLES.DEVELOPER,
        githubUsername: user.nick,
      })
    );
  }, [user]);

  const handleFinish = () => {
    ipcRenderer.invoke(CHANNELS.PUBLICATIONS.GENERATE, publication);
  };

  const Step = useMemo(() => steps[currentStep - 1], [currentStep]);

  const isGenerationInProgress = ![IDLE, FAILURE, SUCCESS].includes(status);

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography variant='h1'>
          {t('AddProject.header.newProject')}
          {publication.name ? `: ${publication.name}` : ''}
        </Typography>
        <Typography>
          {t('AddProject.header.step')} {currentStep}/{steps.length}
        </Typography>
        <Box sx={{ mt: 4, mb: 3 }}>
          <Step
            publication={publication}
            onValidationStateChange={setNextButtonEnabled}
          />
        </Box>
        <StepControls
          onClickPrevious={() =>
            dispatch(
              currentStep === 1
                ? updateCurrentView(VIEWS.PROJECTS_LIST)
                : decreaseStep()
            )
          }
          onClickNext={() => dispatch(increaseStep())}
          onClickFinished={handleFinish}
          isNextButtonDisabled={!nextButtonEnabled}
          isStepLast={currentStep === steps.length}
        />
      </ViewContent>
      {isGenerationInProgress && <GenerationOverlay />}
    </ThemeProvider>
  );
};

export default AddProject;
