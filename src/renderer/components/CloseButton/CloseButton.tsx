import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { t } from 'i18next';
import React from 'react';

interface Props {
  onClick: () => void;
}

const CloseButton: React.FC<Props> = ({ onClick }) => (
  <IconButton
    aria-label={t('common.close')}
    onClick={onClick}
    sx={{ p: 1, m: -1 }}
  >
    <ClearIcon fontSize='inherit' sx={{ height: '2rem' }} />
  </IconButton>
);

export default CloseButton;
