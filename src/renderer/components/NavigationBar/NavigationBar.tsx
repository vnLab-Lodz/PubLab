import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPONENTS_TRANSLATIONS } from '../../constants/RouterComponents';
import {
  selectCurrentView,
  updateCurrentView,
} from '../../../shared/slices/currentViewSlice';
import './NavigationBar.scss';
import { Views } from '../../constants/Views';
import { terminateSessionAsync } from '../../../shared/slices/currentUserSlice';
import PlaceholderProjectImage from '../../assets/placeholder-project-image.png';

interface IButton {
  abbreviation: string;
  view: Views;
}

interface IImageButton extends IButton {
  src: any;
}

const PROJECT_BUTTON: IImageButton = {
  abbreviation: 'P',
  src: PlaceholderProjectImage,
  view: Views.PROJECT,
};

const TOP_BUTTONS: IButton[] = [
  { abbreviation: 'F', view: Views.FILES },
  { abbreviation: 'C', view: Views.CHANGES },
  { abbreviation: 'S', view: Views.SETTINGS },
];

const BOTTOM_BUTTONS: IButton[] = [
  { abbreviation: 'PL', view: Views.PROJECTS_LIST },
  { abbreviation: 'AS', view: Views.APP_SETTINGS },
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
        key={button.abbreviation}
        className='navbar__button'
        onClick={onNavigationButtonClick(button)}
      >
        <div className={iconClassName}>
          {isImageButton(button) ? (
            <img src={button.src} alt='Project image' />
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
        <button
          className='navbar__button'
          onClick={() => dispatch(terminateSessionAsync())}
        >
          <div className='navbar__button__icon'>LO</div>
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
