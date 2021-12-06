import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseStep,
  increaseStep,
} from '../../../shared/redux/slices/addPublicationSlice';
import { RootState } from '../../../shared/redux/rootReducer';
import { altTheme } from '../../theme';
import ViewContent from '../../components/ViewContent/ViewContent';
import * as Styled from './style';

const AddProject = () => {
  const currentStep = useSelector(
    (state: RootState) => state.newPublication.step
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const renderStepComponent = () => {
    switch (currentStep) {
      // substitute cases with components created for the issues,
      // delete this comment after it becomes obsolete
      case 1:
        return 'Insert component 1';
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
        <Styled.StepContainer>{renderStepComponent()}</Styled.StepContainer>
        <div>
          <Styled.BlackButton
            textCase='uppercase'
            fontWeight='bold'
            typographyVariant='h3'
            variant='outlined'
            onClick={() => {
              if (currentStep > 1) dispatch(decreaseStep());
            }}
          >
            {t('AddProject.buttons.back')}
          </Styled.BlackButton>
          <Styled.GreenButton
            textCase='uppercase'
            fontWeight='bold'
            typographyVariant='h3'
            color='green'
            onClick={() => {
              if (currentStep < 5) dispatch(increaseStep());
            }}
          >
            {t('AddProject.buttons.next')}
          </Styled.GreenButton>
        </div>
      </ViewContent>
    </ThemeProvider>
  );
};

export default AddProject;
