import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { altTheme } from '../../theme';
import ViewContent from '../../components/ViewContent/ViewContent';
import {
  currentStep as stepSelector,
  decreaseStep,
  deleteDraft,
  increaseStep,
  newPublication,
} from '../../../shared/redux/slices/addPublicationSlice';
import ProjectDetailsInput from './subcomponents/ProjectDetailsInput/ProjectDetailsInput';
import CollaboratorsPicker from './subcomponents/CollaboratorsPicker/CollaboratorsPicker';
import TechnologiesPicker from './subcomponents/TechnologiesPicker/TechnologiesPicker';
import StepControls from './subcomponents/StepControls/StepControls';

const steps = [
  ProjectDetailsInput,
  () => <>To be implemented</>,
  TechnologiesPicker,
  CollaboratorsPicker,
];

const AddProject = () => {
  const currentStep = useSelector(stepSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const { publicationName } = useSelector(newPublication);

  useEffect(
    () => () => {
      dispatch(deleteDraft());
    },
    []
  );

  const Step = useMemo(() => steps[currentStep - 1], [currentStep]);

  return (
    <ThemeProvider theme={altTheme}>
      <ViewContent>
        <Typography variant='h1'>
          {t('AddProject.header.newProject')}
          {publicationName ? `: ${publicationName}` : ''}
          {}
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
          onClickFinished={() => console.log('To be implemented')}
          isNextButtonDisabled={!nextButtonEnabled}
          isStepLast={currentStep === steps.length}
        />
      </ViewContent>
    </ThemeProvider>
  );
};

export default AddProject;
