import React from 'react';
import { useDispatch } from 'react-redux';
import { COMPONENTS_LIST } from '../../../constants/componentsEnum';
import { updateCurrentView } from '../../../../shared/slices/currentViewSlice';
import './navigation_bar.scss';




const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

const NavigationBar = () => {

  const dispatch = useDispatch();

  const onNavigationButtonClick = (buttonKey: string) => () => {
    dispatch(updateCurrentView(buttonKey))
  }
  
  const renderListOfButtons = () => {
    var listOfButtons:JSX.Element[] = [];
    Object.keys(COMPONENTS_LIST).forEach((key) => {
      const buttonKey = getKeyValue(key)(COMPONENTS_LIST);
      listOfButtons.push(<button onClick={onNavigationButtonClick(buttonKey)}>{buttonKey}</button>)
    })
    return listOfButtons;
  }

  return (
    <div className='navbar'>
      {renderListOfButtons()}
    </div>
  );
};

export default NavigationBar;