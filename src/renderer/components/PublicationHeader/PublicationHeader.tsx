import { Box, IconButton, SxProps, Theme, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react';
import { useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { CHANNELS } from '../../../shared/types/api';

interface Props {
  sx?: SxProps<Theme>;
  dimmedIcon?: boolean;
}

const PublicationHeader: React.FC<Props> = ({
  children,
  dimmedIcon,
  sx = [],
}) => {
  const publication = useSelector(activePublication);
  return (
    <Box
      sx={[
        { display: 'flex', justifyContent: 'space-between' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant='h1'>{publication?.name}</Typography>
      <Box display='flex' alignItems='center'>
        {children}
        <IconButton
          size='small'
          sx={{ borderRadius: 0, padding: 0, color: 'text.primary' }}
          onClick={() => ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS)}
        >
          <RefreshIcon sx={{ opacity: dimmedIcon ? 0.5 : 1 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

PublicationHeader.defaultProps = {
  sx: [],
  dimmedIcon: true,
};

export default PublicationHeader;
