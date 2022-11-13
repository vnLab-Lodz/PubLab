import { useDispatch, useSelector } from 'react-redux';
import { SUBVIEWS } from 'src/renderer/constants/Views';
import {
  selectCurrentView,
  updateSubview,
} from 'src/shared/redux/slices/currentViewSlice';
import { Publication } from 'src/shared/types';

export default function useSelectedProject() {
  const dispatch = useDispatch();
  const selectedProject: Publication | undefined =
    useSelector(selectCurrentView).subview.props?.project;

  const setSelectedProject = (project: Publication | undefined) => {
    dispatch(
      updateSubview({
        element: project ? SUBVIEWS.PROJECT_INFO : SUBVIEWS.NONE,
        props: { project, useMainTheme: true, showAllSubsections: true },
      })
    );
  };

  return [selectedProject, setSelectedProject] as const;
}
