import React from 'react';
import { styled } from '@mui/system';
import { useStore } from 'react-redux';
import { increaseStep } from './../../../shared/redux/slices/addPublicationSlice';
import { TextField } from '@mui/material';
import { useEffect } from 'hoist-non-react-statics/node_modules/@types/react';

const StyledContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.black.main,
}));

const AddProject = () => {
  const store = useStore();
  const storeState = store.getState();

  useEffect(() => {}, []);

  return (
    <StyledContainer>
      <TextField>New Project</TextField>
      <TextField>step {storeState.newPublication.step}/4</TextField>
      <button onClick={() => store.dispatch(increaseStep())}>next</button>
    </StyledContainer>
  );
};

export default AddProject;
