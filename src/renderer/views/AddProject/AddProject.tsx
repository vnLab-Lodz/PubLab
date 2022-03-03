import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { altTheme } from '../../theme';
import ViewContent from '../../components/ViewContent/ViewContent';
import {
  currentStep as stepSelector,
  decreaseStep,
  deleteDraft,
  increaseStep,
} from '../../../shared/redux/slices/addPublicationSlice';
import ProjectDetailsInput from './subcomponents/ProjectDetailsInput/ProjectDetailsInput';
import CollaboratorsPicker from './subcomponents/CollaboratorsPicker/CollaboratorsPicker';
import TechnologiesPicker from './subcomponents/TechnologiesPicker/TechnologiesPicker';

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
        <Typography
          variant='h1'
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontWeight: 'bold',
          }}
        >
          {t('AddProject.header.newProject')}
        </Typography>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {t('AddProject.header.step')} {currentStep}/{steps.length}
        </Typography>
        <Box sx={{ mt: 4, mb: 3 }}>
          <Step setNextButtonEnabled={setNextButtonEnabled} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            variant='outlined'
            isMajor
            fullWidth
            onClick={() => dispatch(decreaseStep())}
          >
            {t('AddProject.buttons.back')}
          </Button>
          <Button
            id='next-button'
            color='green'
            variant='contained'
            isMajor
            fullWidth
            onClick={() => {
              if (nextButtonEnabled) dispatch(increaseStep());
            }}
          >
            {t('AddProject.buttons.next')}
          </Button>
        </Box>
      </ViewContent>
    </ThemeProvider>
  );
};

export default AddProject;
