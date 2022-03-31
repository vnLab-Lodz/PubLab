import { useSelector } from 'react-redux';
import { CurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { VIEWS } from '../../constants/Views';

const { FILES, CHANGES, SETTINGS, PROJECT } = VIEWS;
const projectViews = [FILES, CHANGES, SETTINGS, PROJECT];

const useViewRedirects = (currentView: CurrentView): CurrentView => {
  let redirectedView = currentView;

  const isProjectActive = Boolean(useSelector(activePublication));
  const isProjectView = projectViews.includes(currentView.view);

  if (isProjectView && !isProjectActive) {
    redirectedView = { ...currentView, view: VIEWS.NO_ACTIVE_PROJECT };
  }

  return redirectedView;
};

export default useViewRedirects;
