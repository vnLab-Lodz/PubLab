import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, ThemeProvider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SupportedLangCode } from 'src/renderer/internationalisation/i18next';
import { VIEWS } from '../../constants/Views';
import {
  selectCurrentView,
  updateCurrentView,
} from '../../../shared/redux/slices/currentViewSlice';
import * as Styled from './style';
import { altTheme } from '../../theme';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';

interface IButton {
  abbreviation: string;
  view: VIEWS;
}

const PROJECT_BUTTON: IButton = {
  abbreviation: 'P',
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
  const activeProject = useSelector(activePublication);
  const { t, i18n } = useTranslation();

  const onNavigationButtonClick = (button: IButton) => () => {
    dispatch(updateCurrentView(button.view));
  };

  const isButtonActive = (button: IButton) => button.view === currentView.view;

  const renderButton = (button: IButton, isProjectButton?: boolean) => {
    const view: string = t(`views.${button.view.toLowerCase()}` as any);
    const abbreviation =
      view.split(' ').reduce((p, c) => p + c[0].toUpperCase(), '') ??
      button.abbreviation;

    return (
      <Styled.NavButton
        key={button.abbreviation}
        onClick={onNavigationButtonClick(button)}
        isActive={isButtonActive(button)}
        startIcon={
          isProjectButton ? (
            <Avatar src={activeProject?.imagePath} alt='Project'>
              {activeProject?.name.charAt(0) || '-'}
            </Avatar>
          ) : (
            <Typography variant='subtitle1'>{abbreviation}</Typography>
          )
        }
      >
        <Typography variant='subtitle1'>{view}</Typography>
      </Styled.NavButton>
    );
  };

  const expandNav = () => {
    const newIsExpandLocked = !isExpandLocked;
    if (!newIsExpandLocked) setIsExpanded(false);
    setIsExpandLocked(newIsExpandLocked);
  };

  const renderListOfButtons = (buttons: IButton[]) =>
    buttons.map((button) => renderButton(button));

  const isNavBarWide = (i18n.language as SupportedLangCode) === 'pl';

  return (
    <ThemeProvider theme={altTheme}>
      <Styled.NavBar
        component='nav'
        isExpanded={isExpanded}
        wider={isNavBarWide}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          if (!isExpandLocked) {
            setIsExpanded(false);
          }
        }}
      >
        <Box width='100%'>
          {renderButton(PROJECT_BUTTON, true)}
          {renderListOfButtons(TOP_BUTTONS)}
        </Box>
        <Box width='100%'>{renderListOfButtons(BOTTOM_BUTTONS)}</Box>
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
