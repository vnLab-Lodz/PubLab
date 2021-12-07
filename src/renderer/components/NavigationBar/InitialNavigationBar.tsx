import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPONENTS_TRANSLATIONS } from '../../constants/RouterComponents';
import {
  selectCurrentView,
  updateCurrentView,
} from '../../../shared/redux/slices/currentViewSlice';
import './NavigationBar.scss';
import { VIEWS } from '../../constants/Views';
import { saveFirstTimeFlag } from '../../../shared/redux/helpers/localStorage';

interface IButton {
  abbreviation: string;
  view: VIEWS;
}

interface IImageButton extends IButton {
  src: any;
}

const BOTTOM_BUTTON: IButton = { abbreviation: 'AS', view: VIEWS.APP_SETTINGS };

const InitialNavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isExpandLocked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentView = useSelector(selectCurrentView);

  const onNavigationButtonClick = (button: IButton) => () => {
    saveFirstTimeFlag(false);
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

  const renderNavabrButton = (button: IButton) => renderButton(button);

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
      <div />
      <div>
        {renderNavabrButton(BOTTOM_BUTTON)}
        <div className='navbar__button__icon' />
      </div>
    </div>
  );
};

export default InitialNavigationBar;
