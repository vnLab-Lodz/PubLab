import React, { useEffect, useState } from 'react';
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

  const renderStepComponent = () => {
    switch (currentStep) {
      // substitute cases with components created for the issues,
      // delete this comment after it becomes obsolete
      case 1:
        return (
          <ProjectDetailsInput setNextButtonEnabled={setNextButtonEnabled} />
        );
      case 2:
        return 'Insert component 2';
      case 3:
        return <TechnologiesPicker />;
      case 4:
        return <CollaboratorsPicker />;
      case 5:
        return 'Insert component 5';
      default:
        return 'Insert component 1';
    }
  };

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
          {t('AddProject.header.step')} {currentStep}/5
        </Typography>
        <Box sx={{ mt: 4, mb: 3 }}>{renderStepComponent()}</Box>
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
