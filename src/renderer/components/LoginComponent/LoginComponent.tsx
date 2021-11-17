import React, { useReducer } from 'react';
import { Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { supportedLocales } from '../../internationalisation/i18next';
import { authorizeGitHubUserAsync } from '../../../shared/redux/slices/currentUserSlice';
import './LoginComponent.scss';
import logo from '../../assets/publab.png';
import {
  selectAllSettings,
  setAllSettings,
  Settings,
} from '../../../shared/redux/slices/settingsSlice';

const LoginComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [settings, changeSetting] = useReducer(
    handleSettingChange,
    useSelector(selectAllSettings)
  );

  function submitChanges() {
    dispatch(setAllSettings(settings));
  }
  function changeLanguage(x: string) {
    if (x === 'EN')
      changeSetting({ currentLocale: 'pl' });
    else
      changeSetting({ currentLocale: 'pl' });
    submitChanges();
  }
  return (
    <div className='background'>
      <div className='language-box'>
        {supportedLocales.map((locale) => (
          <Button key={locale} variant='text' className='language' onClick={() => changeLanguage('EN')}>
            <Typography>{"${locale}"}</Typography>
          </Button>
        ))}
      </div>

      <div className='container'>
        <img src={logo} alt='Logo' />
        <Typography variant='h4' className='text' onClick={() => changeLanguage('PL')}>
          <p>{t('login-screen.message')} </p>
        </Typography>
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
        <Typography variant='h4'>
          <p>
            {' '}
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

function handleSettingChange(
  state: Settings,
  change: Partial<Settings>
): Settings {
  return { ...state, ...change };
}
