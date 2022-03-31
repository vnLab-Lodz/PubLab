import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, Typography, Box } from '@mui/material';
import { mainTheme } from '../../theme';
import ViewContent from '../../components/ViewContent/ViewContent';
import Button from '../../components/Button/Button';
import { updateCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { VIEWS } from '../../constants/Views';

const NoActiveProject = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={mainTheme}>
      <ViewContent contentBoxProps={{ sx: { paddingBottom: '2rem' } }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='body1' my={3}>
            {t('NoActiveProject.message')}
          </Typography>
          <Button
            variant='contained'
            textCase='sentence-case'
            sx={{ width: '18em' }}
            onClick={() => dispatch(updateCurrentView(VIEWS.PROJECTS_LIST))}
          >
            {t('NoActiveProject.buttonText')}
          </Button>
        </Box>
      </ViewContent>
    </ThemeProvider>
  );
};
export default NoActiveProject;
