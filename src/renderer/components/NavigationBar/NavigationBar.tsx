import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPONENTS_TRANSLATIONS } from '../../constants/RouterComponents';
import {
  selectCurrentView,
  updateCurrentView,
} from '../../../shared/slices/currentViewSlice';
import './NavigationBar.scss';
import { COMPONENTS } from '../../constants/Components';

const TOP_BUTTONS: COMPONENTS[] = [
  COMPONENTS.PROJECT,
  COMPONENTS.FILES,
  COMPONENTS.CHANGES,
  COMPONENTS.SETTINGS,
];
const BOTTOM_BUTTONS: COMPONENTS[] = [
  COMPONENTS.PROJECTS_LIST,
  COMPONENTS.APP_SETTINGS,
];

const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isExpandLocked, setIsExpandLocked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentView = useSelector(selectCurrentView);

  const onNavigationButtonClick = (buttonKey: COMPONENTS) => () => {
    dispatch(updateCurrentView(buttonKey));
  };

  const isButtonActive = (key: COMPONENTS) => key === currentView.view;
  const renderListOfButtons = (buttons: COMPONENTS[]) => {
    return buttons.map((key: COMPONENTS) => {
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
