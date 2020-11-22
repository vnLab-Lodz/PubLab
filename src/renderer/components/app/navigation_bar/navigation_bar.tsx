import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { COMPONENTS_LIST } from '../../../constants/componentsEnum';
import { selectCurrentPage, updateCurrentPage } from '../../../../shared/slices/currentPageSlice';
import './navigation_bar.scss';

const dispatch = useDispatch();

const onNavigationButtonClick = (buttonKey: string) => () => {
  return dispatch(updateCurrentPage(buttonKey))
}

const renderListOfButtons = () => {
  var listOfButtons:JSX.Element[] = [];
  Object.keys(COMPONENTS_LIST).map((key) => {
    const buttonKey = getKeyValue(key)(COMPONENTS_LIST);
    listOfButtons.push(<button onClick={onNavigationButtonClick(buttonKey)}>{buttonKey}</button>)
  })
  return listOfButtons;
}
const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

const NavigationBar = () => {

  return (
    <div className='navbar'>
      {renderListOfButtons()}
    </div>
  );
};

export default NavigationBar;