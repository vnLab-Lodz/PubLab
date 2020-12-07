import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPONENTS_TRANSLATIONS } from '../../constants/RouterComponents';
import {
  selectCurrentView,
  updateCurrentView,
} from '../../../shared/slices/currentViewSlice';
import './NavigationBar.scss';
import { Views } from '../../constants/VIEWS';

const TOP_BUTTONS: Views[] = [
  Views.PROJECT,
  Views.FILES,
  Views.CHANGES,
  Views.SETTINGS,
];
const BOTTOM_BUTTONS: Views[] = [
  Views.PROJECTS_LIST,
  Views.APP_SETTINGS,
];

const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isExpandLocked, setIsExpandLocked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentView = useSelector(selectCurrentView);

  const onNavigationButtonClick = (buttonKey: Views) => () => {
    dispatch(updateCurrentView(buttonKey));
  };

  const isButtonActive = (key: Views) => key === currentView.view;
  const renderListOfButtons = (buttons: Views[]) => {
    return buttons.map((key: Views) => {
      const iconClassName = isButtonActive(key)
        ? 'navbar__button__icon navbar__button__icon--active'
        : 'navbar__button__icon';
      return (
        <button
          key={key}
          className='navbar__button'
          onClick={onNavigationButtonClick(key)}
        >
          <div className={iconClassName}>{COMPONENTS_TRANSLATIONS[key][0]}</div>
          <span className='navbar__button__text'>
            {COMPONENTS_TRANSLATIONS[key]}
          </span>
        </button>
      );
    });
  };

  const navbarClassName = isExpanded ? 'navbar navbar--expanded' : 'navbar';

  return (
    <div
      className={navbarClassName}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        if (!isExpandLocked) {
          setIsExpanded(false);
        }
      }}
    >
      <div>{renderListOfButtons(TOP_BUTTONS)}</div>
      <div>
        {renderListOfButtons(BOTTOM_BUTTONS)}
        <button
          className='navbar__button'
          onClick={() => console.log('TODO: implement logout')}
        >
          <div className='navbar__button__icon'>L</div>
          <span className='navbar__button__text'>Log out</span>
        </button>
      </div>
      {isExpanded && (
        <div
          className='navbar__expand-handle'
          onClick={() => {
            const newIsExpandLocked = !isExpandLocked;
            setIsExpandLocked(newIsExpandLocked);
            if (!newIsExpandLocked) {
              setIsExpanded(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default NavigationBar;
