import React from "react";
import logo from '../../assets/publab.png';
import { Typography } from '@mui/material';
import { terminateSessionAsync } from "../../../shared/redux/slices/currentUserSlice";
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
import { SupportedLangCode } from "../../internationalisation/i18next";
import { useDispatch } from "react-redux";
import { saveSettingsAsync } from "../../../shared/redux/slices/settingsSlice";


const LogOut = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
  
    const changeLanguage = (locale: SupportedLangCode) => {
      dispatch(saveSettingsAsync({ currentLocale: locale }));
    };
  
    return (
      <div className='background'>
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
                dispatch(terminateSessionAsync());
              }}
            >
               <p>{t('login-screen.button')} </p>
            </Button>
          </div>
        </div>
      </div>
    );
};
export default LogOut;