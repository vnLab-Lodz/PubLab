import React from 'react';
import './FirstTime.scss';
import { ThemeProvider } from '@mui/material';
import ViewContent from '../../components/ViewContent/ViewContent';
import { altTheme } from '../../theme';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';

const FirstTime = () => {
    const { t, i18n } = useTranslation();

    return (
        <ThemeProvider theme={altTheme}>
            <ViewContent>
                <Typography variant='h4' 
                    sx={{ color: (theme) => theme.palette.text.primary,
                    marginTop: '20px',
                    fontWeight: 'bold'
                }}>
                    {t('first-time-view.title')}
                </Typography>
                <Typography variant='h4' sx={{
                    color: (theme) => theme.palette.text.primary,
                    marginTop: '102px'
                    }}>
                    {t('first-time-view.welcome')} 
                </Typography>
                <Typography variant='h4' sx={{
                    color: (theme) => theme.palette.text.primary,
                    marginTop: '27.25px'
                    }}>
                    {t('first-time-view.message')} 
                </Typography>

                <Button variant='contained' textCase='uppercase' fontWeight='light' fullWidth={true} sx={{
                    marginTop: '78px',
                    height: '45px',
                    fontSize: '13px'
                    }}>{t('first-time-view.button')}</Button>
            </ViewContent>
        </ThemeProvider>
    );
};

export default FirstTime;