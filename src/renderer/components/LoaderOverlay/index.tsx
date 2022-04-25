import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/shared/redux/rootReducer';
import { selectLoader } from 'src/shared/redux/slices/loadersSlice';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

type Props = {
  id: string;
};

const LoaderOverlay: React.FC<Props> = ({ id }) => {
  const loader = useSelector((state: RootState) => selectLoader(state, id));

  if (!loader) return null;

  return (
    <LoadingOverlay>
      <Typography
        variant='body1'
        sx={{
          mt: (theme) => theme.spacing(3),
          color: (theme) => theme.palette.green.main,
        }}
      >
        {loader.message}
      </Typography>
    </LoadingOverlay>
  );
};

export default LoaderOverlay;
