import { useSelector } from 'react-redux';
import { CurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { activePublication as activePublicationSelector } from '../../../shared/redux/slices/loadPublicationsSlice';
import { SUBVIEWS, VIEWS } from '../../constants/Views';

const { FILES, CHANGES, SETTINGS, PROJECT } = VIEWS;
const projectViews = [FILES, CHANGES, SETTINGS, PROJECT];

const useViewRedirects = (currentView: CurrentView): CurrentView => {
  let redirectedView = currentView;

  const activePublication = useSelector(activePublicationSelector);

  const isProjectActive = Boolean(activePublication);
  const isProjectView = projectViews.includes(currentView.view);
  const isProjectInfoDisplayed =
    activePublication?.keepDescriptionVisible ||
    activePublication?.keepSnippetsVisible;

  if (isProjectView && !isProjectActive) {
    redirectedView = { ...currentView, view: VIEWS.NO_ACTIVE_PROJECT };
  }

  if (isProjectView && isProjectActive && isProjectInfoDisplayed) {
    redirectedView = {
      ...redirectedView,
      subview: {
        element: SUBVIEWS.PROJECT_INFO,
        props: { project: activePublication },
      },
    };
  }
  return redirectedView;
};

export default useViewRedirects;
