import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPONENTS_TRANSLATIONS } from '../../constants/RouterComponents';
import {
  selectCurrentView,
  updateCurrentView,
} from '../../../shared/redux/slices/currentViewSlice';
import './NavigationBar.scss';
import { VIEWS } from '../../constants/Views';
import { terminateSessionAsync } from '../../../shared/redux/slices/currentUserSlice';
import PlaceholderProjectImage from '../../assets/placeholder-project-image.png';

interface IButton {
  abbreviation: string;
  view: VIEWS;
}

interface IImageButton extends IButton {
  src: any;
}

const PROJECT_BUTTON: IImageButton = {
  abbreviation: 'P',
  src: PlaceholderProjectImage,
  view: VIEWS.PROJECT,
};

const TOP_BUTTONS: IButton[] = [
  { abbreviation: 'F', view: VIEWS.FILES },
  { abbreviation: 'C', view: VIEWS.CHANGES },
  { abbreviation: 'S', view: VIEWS.SETTINGS },
];

const BOTTOM_BUTTONS: IButton[] = [
  { abbreviation: 'PL', view: VIEWS.PROJECTS_LIST },
  { abbreviation: 'AS', view: VIEWS.APP_SETTINGS },
  { abbreviation: 'LO', view: VIEWS.LOGOUT },
];

const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isExpandLocked, setIsExpandLocked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentView = useSelector(selectCurrentView);

  const onNavigationButtonClick = (button: IButton) => () => {
    dispatch(updateCurrentView(button.view));
  };

  const isButtonActive = (button: IButton) => button.view === currentView.view;
  const isImageButton = (
    button: IButton | IImageButton
  ): button is IImageButton => (button as IImageButton).src !== undefined;

  const renderButton = (button: IButton | IImageButton) => {
    const iconClassName = isButtonActive(button)
      ? 'navbar__button__icon navbar__button__icon--active'
      : 'navbar__button__icon';
    return (
      <button
        type='button'
        key={button.abbreviation}
        className='navbar__button'
        onClick={onNavigationButtonClick(button)}
      >
        <div className={iconClassName}>
          {isImageButton(button) ? (
            <img src={button.src} alt='Project' />
          ) : (
            button.abbreviation
          )}
        </div>
        <span className='navbar__button__text'>
          {COMPONENTS_TRANSLATIONS[button.view]}
        </span>
      </button>
    );
  };

  const expandNav = () => {
    const newIsExpandLocked = !isExpandLocked;
    if (!newIsExpandLocked) setIsExpanded(false);
    setIsExpandLocked(newIsExpandLocked);
  };

  const renderListOfButtons = (buttons: IButton[]) => buttons.map(renderButton);

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
      <div>
        {renderButton(PROJECT_BUTTON)}
        {renderListOfButtons(TOP_BUTTONS)}
      </div>
      <div>
        {renderListOfButtons(BOTTOM_BUTTONS)}

      </div>
      {isExpanded && (
        <div
          className='navbar__expand-handle'
          role='button'
          aria-label='Expand'
          tabIndex={0}
          onClick={expandNav}
          onKeyPress={({ key }) => {
            if (key === 'Enter') expandNav();
          }}
        />
      )}
    </div>
  );
};

export default NavigationBar;
