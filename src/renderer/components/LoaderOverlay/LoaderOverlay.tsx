import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'src/shared/redux/rootReducer';
import { Loader, selectLoader } from 'src/shared/redux/slices/loadersSlice';
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';

type Props = {
  id: string;
  position?: 'fixed' | 'absolute';
};

const LoaderOverlay: React.FC<Props> = ({ id, position }) => {
  const { t } = useTranslation();
  const loader = useSelector((state: RootState) => selectLoader(state, id));

  if (!loader) return null;

  const getLoaderMessage = ({ message, i18n }: Loader) => {
    if (message) return message;
    if (i18n) return t(i18n.key as any, i18n.default, i18n.params);
    return '';
  };

  return (
    <LoadingOverlay position={position}>
      <Typography
        variant='body1'
        sx={{
          mt: (theme) => theme.spacing(3),
          color: (theme) => theme.palette.green.main,
          textAlign: 'center',
          width: '70%',
        }}
      >
        {getLoaderMessage(loader)}
      </Typography>
    </LoadingOverlay>
  );
};

LoaderOverlay.defaultProps = {
  position: 'fixed',
};

export default LoaderOverlay;
