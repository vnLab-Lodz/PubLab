import React from 'react';
import { ThemeProvider, Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ipcRenderer } from 'electron';
import { CHANNELS } from 'src/shared/types/api';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import logo from '../../assets/publab.png';
import {
  SupportedLangCode,
  supportedLocales,
} from '../../internationalisation/i18next';
import * as Styled from './style';
import { altTheme } from '../../theme';
import Button from '../Button/Button';

const LoginComponent = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (locale: SupportedLangCode) => {
    ipcRenderer.invoke(CHANNELS.SETTINGS.SAVE, { currentLocale: locale });
  };

  return (
    <ThemeProvider theme={altTheme}>
      <Styled.ViewContent contentBoxProps={{ sx: { m: 0 } }}>
        <Styled.LangBox>
          {supportedLocales.map((locale) => (
            <Button
              key={locale}
              variant='text'
              isMajor
              onClick={() => changeLanguage(locale)}
              sx={{
                p: 0,
                m: 0,
                '& span': {
                  fontWeight: i18n.language === locale ? '700' : '400',
                },
              }}
            >
              {t(`AppSettings.language.${locale}` as const)}
            </Button>
          ))}
        </Styled.LangBox>

        <Styled.ContainerBox>
          <img src={logo} alt='Logo' />
          <Typography>{t('login-screen.message')}</Typography>
          <Button
            variant='contained'
            textCase='sentence-case'
            isMajor
            sx={{ m: 0 }}
            startIcon={<FaGithub className='icon' />}
            onClick={() => {
              dispatch(authorizeGitHubUserAsync(false));
            }}
          >
            {t('login-screen.button')}
          </Button>
        </Styled.ContainerBox>

        <Typography variant='caption' textAlign='center'>
          <b> {t('login-screen.created')} </b> Marlon Brando, Al Pacino, James
          Caan, Richard Castellano, Robert Duvall, Sterling Hayden, John Marley,
          Richard Conte, and Diane Keaton
        </Typography>
      </Styled.ViewContent>
    </ThemeProvider>
  );
};

export default LoginComponent;
