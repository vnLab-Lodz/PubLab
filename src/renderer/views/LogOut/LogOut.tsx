import React from "react";
import logo from '../../assets/publab.png';
import { Typography } from '@mui/material';
import { terminateSessionAsync } from "../../../shared/redux/slices/currentUserSlice";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import './LogOut.scss';

const LogOut = () => {
  const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    return (
      <div className='background'>
        <div className='container'>
          <img src={logo} alt='Logo' />
          <Typography variant='h4' className='text'>
            <p>{t('log-out-view.message')} </p>
          </Typography>
          <div className='button'>
            <Button
              variant='text'
              className='button'
              onClick={() => {
                dispatch(terminateSessionAsync());
              }}
            >
               <p>{t('log-out-view.button')} </p>
            </Button>
          </div>
        </div>
      </div>
    );
};
export default LogOut;