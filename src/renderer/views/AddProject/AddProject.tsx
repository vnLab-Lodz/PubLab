import React from 'react';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseStep,
  increaseStep,
} from '../../../shared/redux/slices/addPublicationSlice';
import { RootState } from '../../../shared/redux/rootReducer';

const StyledBackground = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.background,
}));

const StyledContainer = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  background: theme.palette.background,
  paddingTop: theme.spacing(4),
}));

const StepContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(8),
}));

const StyledButtonBlack = styled('button')(({ theme }) => ({
  width: '50%',
  height: '60px',
  border: '1px solid',
  borderColor: theme.palette.text.primary,
  outline: 'none',
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  fontSize: '15px',
  fontWeight: 'bold',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const StyledButtonGreen = styled('button')(({ theme }) => ({
  width: '50%',
  height: '60px',
  border: 'none',
  outline: 'none',
  background: theme.palette.green.main,
  fontSize: '15px',
  fontWeight: 'bold',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const AddProject = () => {
  const currentStep = useSelector(
    (state: RootState) => state.newPublication.step
  );
  const dispatch = useDispatch();

  const renderStepComponent = () => {
    switch (currentStep) {
	  // substitute cases with components created for the issues,
	  // then delete this comment after it becomes obsolete
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
    <StyledBackground>
      <StyledContainer>
        <Typography variant='h1' style={{ fontWeight: 'bold' }}>
          New Project
        </Typography>
        <Typography variant='h4'>step {currentStep}/5</Typography>
        <StepContainer>{renderStepComponent()}</StepContainer>
        <div>
          <StyledButtonBlack
            onClick={() => {
              if (currentStep > 1) dispatch(decreaseStep());
            }}
          >
            BACK
          </StyledButtonBlack>
          <StyledButtonGreen
            onClick={() => {
              if (currentStep < 5) dispatch(increaseStep());
            }}
          >
            NEXT
          </StyledButtonGreen>
        </div>
      </StyledContainer>
    </StyledBackground>
  );
};

export default AddProject;
