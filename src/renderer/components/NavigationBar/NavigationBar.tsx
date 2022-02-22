import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, Typography } from '@mui/material';
import { COMPONENTS_TRANSLATIONS } from '../../constants/RouterComponents';
import { VIEWS } from '../../constants/Views';
import PlaceholderProjectImage from '../../assets/placeholder-project-image.png';
import {
  selectCurrentView,
  updateCurrentView,
} from '../../../shared/redux/slices/currentViewSlice';
import * as Styled from './style';
import { altTheme } from '../../theme';

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
  { abbreviation: 'AP', view: VIEWS.ADD_PROJECT },
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

  const renderButton = (button: IButton | IImageButton) => (
    <Styled.NavButton
      key={button.abbreviation}
      onClick={onNavigationButtonClick(button)}
      isActive={isButtonActive(button)}
      startIcon={
        isImageButton(button) ? (
          <img src={button.src} alt='Project' />
        ) : (
          <Typography variant='subtitle1'>{button.abbreviation}</Typography>
        )
      }
    >
      <Typography variant='subtitle1'>
        {COMPONENTS_TRANSLATIONS[button.view]}
      </Typography>
    </Styled.NavButton>
  );

  const expandNav = () => {
    const newIsExpandLocked = !isExpandLocked;
    if (!newIsExpandLocked) setIsExpanded(false);
    setIsExpandLocked(newIsExpandLocked);
  };

  const renderListOfButtons = (buttons: IButton[]) => buttons.map(renderButton);

  return (
    <ThemeProvider theme={altTheme}>
      <Styled.NavBar
        component='nav'
        isExpanded={isExpanded}
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
        <div>{renderListOfButtons(BOTTOM_BUTTONS)}</div>
        {isExpanded && (
          <Styled.ExpandHandle
            role='button'
            aria-label='Expand'
            tabIndex={0}
            onClick={expandNav}
            onKeyPress={({ key }) => {
              if (key === 'Enter') expandNav();
            }}
          />
        )}
      </Styled.NavBar>
    </ThemeProvider>
  );
};

export default NavigationBar;
