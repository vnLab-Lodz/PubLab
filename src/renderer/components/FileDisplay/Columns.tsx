import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const widths = ['50%', '25%', '25%'];

interface Props {
  nameSubstitute?: React.ReactNode;
}

const Header: React.FC<Props> = ({ nameSubstitute }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', margin: '1rem 0' }}>
      <Box sx={{ width: widths[0], paddingLeft: '1rem' }}>
        {nameSubstitute || (
          <Typography variant='caption'>
            {t('common.name').toLocaleUpperCase()}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: widths[1], textAlign: 'center' }}>
        <Typography variant='caption'>
          {t('common.change_date').toLocaleUpperCase()}
        </Typography>
      </Box>
      <Box sx={{ width: widths[2], textAlign: 'center' }}>
        <Typography variant='caption'>
          {'status'.toLocaleUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};

Header.defaultProps = {
  nameSubstitute: undefined,
};

export { Header };
