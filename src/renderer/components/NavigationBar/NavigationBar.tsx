import React from 'react';
import { useDispatch } from 'react-redux';
import { COMPONENTS_LIST } from '../../constants/ComponentsList';
import { updateCurrentView } from '../../../shared/slices/currentViewSlice';
import './NavigationBar.scss';

const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

const NavigationBar = () => {

  const dispatch = useDispatch();

  const onNavigationButtonClick = (buttonKey: string) => () => {
    dispatch(updateCurrentView(buttonKey))
  }
  
  const renderListOfButtons = () => {
    return Object.keys(COMPONENTS_LIST).map((key) => {
      const buttonKey = getKeyValue(key)(COMPONENTS_LIST);
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