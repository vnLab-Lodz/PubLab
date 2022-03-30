import { useSelector } from 'react-redux';
import { CurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { VIEWS } from '../../constants/Views';

const useViewRedirects = (currentView: CurrentView): CurrentView => {
  let redirectedView = currentView;

  const isProjectActive = Boolean(useSelector(activePublication));
  if (
    [VIEWS.FILES, VIEWS.CHANGES, VIEWS.SETTINGS, VIEWS.PROJECT].includes(
      currentView.view
    ) &&
    !isProjectActive
  ) {
    redirectedView = { ...currentView, view: VIEWS.NO_ACTIVE_PROJECT };
  }

  return redirectedView;
};

export default useViewRedirects;
