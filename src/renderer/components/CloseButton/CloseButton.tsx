import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { t } from 'i18next';
import React from 'react';

interface Props {
  onClick: () => void;
}

const CloseButton: React.FC<Props> = ({ onClick, ...rest }) => (
  <IconButton
    aria-label={t('common.close')}
    onClick={onClick}
    size='small'
    sx={{ borderRadius: 0, padding: 0 }}
  >
    <Close sx={{ height: '1.2em', width: '1.2em' }} />
  </IconButton>
);

export default CloseButton;
