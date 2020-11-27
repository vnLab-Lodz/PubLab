import React from 'react';
import { useDispatch } from 'react-redux';
import {COMPONENTS, COMPONENTS_TRANSLATIONS} from '../../constants/RouterComponents';
import { updateCurrentView } from '../../../shared/slices/currentViewSlice';
import './NavigationBar.scss';

const NavigationBar = () => {

  const dispatch = useDispatch();

  const onNavigationButtonClick = (buttonKey: COMPONENTS) => () => {
    dispatch(updateCurrentView(buttonKey))
  }
  
  const renderListOfButtons = () => {
    return Object.keys(COMPONENTS).map((key: COMPONENTS) => {
      return (
        <button key={key} onClick={onNavigationButtonClick(key)}>
          {COMPONENTS_TRANSLATIONS[key]}
        </button>
      );
    });
  };

  return (
    <div className='navbar'>
      {renderListOfButtons()}
      <button>Log out</button>
    </div>
  );
};

export default NavigationBar;