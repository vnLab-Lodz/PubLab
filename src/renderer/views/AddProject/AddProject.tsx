import React, { useEffect, useMemo, useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { ipcRenderer } from 'electron';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  selectPublicationGenerationStatus,
  setStatus,
  PUBLICATION_GENERATION_STATUS,
} from 'src/shared/redux/slices/publications/generate';
import { updateCurrentView } from 'src/shared/redux/slices/currentViewSlice';
import { VIEWS } from 'src/renderer/constants/Views';
import { CHANNELS } from '../../../shared/types/api';
import CollaboratorsPicker from './subcomponents/CollaboratorsPicker/CollaboratorsPicker';
import GenerationOverlay from './subcomponents/GenerationOverlay/GenerationOverlay';
import PackageManagerPicker from './subcomponents/PackageManagerPicker/PackageManagerPicker';
import ProjectDetailsInput from './subcomponents/ProjectDetailsInput/ProjectDetailsInput';
import StepControls from './subcomponents/StepControls/StepControls';
import TechnologiesPicker from './subcomponents/TechnologiesPicker/TechnologiesPicker';
import useUnmountEffect from '../../hooks/useUnmountEffect';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import {
  currentStep as stepSelector,
  decreaseStep,
  deleteDraft,
  increaseStep,
  newPublication,
} from '../../../shared/redux/slices/addPublicationSlice';

const { IDLE, FAILURE, SUCCESS } = PUBLICATION_GENERATION_STATUS;

const steps = [
  ProjectDetailsInput,
  PackageManagerPicker,
  TechnologiesPicker,
  CollaboratorsPicker,
];

const AddProject = () => {
  const currentStep = useSelector(stepSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const status = useSelector(selectPublicationGenerationStatus);
  const publication = useSelector(newPublication);

  useUnmountEffect(() => {
    dispatch(deleteDraft());
    dispatch(setStatus(IDLE));
  }, []);

  useEffect(() => {
    if (status === SUCCESS) dispatch(updateCurrentView(VIEWS.PROJECT));
  }, [status]);

  const handleFinish = () => {
    const { step, publicationName: name, ...rest } = publication;
    ipcRenderer.invoke(CHANNELS.PUBLICATIONS.GENERATE, { ...rest, name });
  };

  const Step = useMemo(() => steps[currentStep - 1], [currentStep]);

  const isGenerationInProgress = ![IDLE, FAILURE, SUCCESS].includes(status);

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography variant='h1'>
          {t('AddProject.header.newProject')}
          {publication.publicationName
            ? `: ${publication.publicationName}`
            : ''}
        </Typography>
        <Typography>
          {t('AddProject.header.step')} {currentStep}/{steps.length}
        </Typography>
        <Box sx={{ mt: 4, mb: 3 }}>
          <Step setNextButtonEnabled={setNextButtonEnabled} />
        </Box>
        <StepControls
          onClickPrevious={() => dispatch(decreaseStep())}
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
