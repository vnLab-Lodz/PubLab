import React from 'react';
import { Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import { saveSettingsAsync } from '../../../shared/redux/slices/settingsSlice';
import logo from '../../assets/publab.png';
import './LoginComponent.scss';
import {
  SupportedLangCode,
  supportedLocales,
} from '../../internationalisation/i18next';

const LoginComponent = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (locale: SupportedLangCode) => {
    dispatch(saveSettingsAsync({ currentLocale: locale }));
  };

  return (
    <div className='background'>
      <div className='language-box'>
        {supportedLocales.map((locale) => (
          <Button
            key={locale}
            variant='text'
            className='language'
            onClick={() => changeLanguage(locale)}
          >
            <Typography
              sx={{ fontWeight: i18n.language === locale ? 'bold' : '100' }}
            >
              {t(`AppSettings.language.${locale}` as const)}
            </Typography>
          </Button>
        ))}
      </div>

      <div className='container'>
        <img src={logo} alt='Logo' />
        <Typography variant='h4' className='text'>
          <p>{t('login-screen.message')} </p>
        </Typography>
        {/* // TODO: Replace with styled Button */}
        <div className='button'>
          <Button
            variant='text'
            className='button'
            onClick={() => {
              dispatch(authorizeGitHubUserAsync(false));
            }}
          >
            <FaGithub className='icon' /> <p>{t('login-screen.button')} </p>
          </Button>
        </div>
      </div>

      <div className='footer'>
        <Typography variant='h4' textAlign='center'>
          <p>
            {t('login-screen.created')} Marlon Brando, Al Pacino, James Caan,
            Richard Castellano, Robert Duvall, Sterling Hayden, John Marley,
            Richard Conte, and Diane Keaton
          </p>
        </Typography>
      </div>
    </div>
  );
};

export default LoginComponent;
