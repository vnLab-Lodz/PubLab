import React from 'react';
import { useDispatch } from 'react-redux';
import { components } from '../../../constants/RouterComponents';
import { updateCurrentView } from '../../../../shared/slices/currentViewSlice';
import './navigation_bar.scss';




const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

const NavigationBar = () => {

  const dispatch = useDispatch();

  const onNavigationButtonClick = (buttonKey: string) => () => {
    dispatch(updateCurrentView(buttonKey))
  }
  
  const renderListOfButtons = () => {
    return Object.keys(components).map((key) => {
      const buttonKey = getKeyValue(key)(components);
      return (
        <button key={key} onClick={onNavigationButtonClick(buttonKey)}>
          {buttonKey}
        </button>
      );
    });
  };

  return (
    <div className='navbar'>
      {renderListOfButtons()}
    </div>
  );
};

export default NavigationBar;