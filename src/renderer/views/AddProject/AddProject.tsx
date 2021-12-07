import React, { useEffect } from 'react';
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
import AddColaborators from './subcomponents/AddCollaborators/AddColaborators';

const AddProject = () => {
  const currentStep = useSelector(stepSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        return <AddColaborators />;
      case 2:
        return 'Insert component 2';
      case 3:
        return 'Insert component 3';
      case 4:
        return 'Insert component 4';
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
          variant='h4'
          sx={{
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {t('AddProject.header.step')} {currentStep}/5
        </Typography>
        <Box
          sx={{
            margin: ({ spacing }) => `${spacing(10)} 0px ${spacing(8)} 0px`,
          }}
        >
          {renderStepComponent()}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Button
            sx={{ flex: 1, height: '6rem' }}
            textCase='uppercase'
            fontWeight='bold'
            typographyVariant='h3'
            variant='outlined'
            onClick={() => dispatch(decreaseStep())}
          >
            {t('AddProject.buttons.back')}
          </Button>
          <Button
            sx={{ flex: 1, height: '6rem' }}
            textCase='uppercase'
            fontWeight='bold'
            typographyVariant='h3'
            color='green'
            variant='contained'
            onClick={() => dispatch(increaseStep())}
          >
            {t('AddProject.buttons.next')}
          </Button>
        </Box>
      </ViewContent>
    </ThemeProvider>
  );
};

export default AddProject;
