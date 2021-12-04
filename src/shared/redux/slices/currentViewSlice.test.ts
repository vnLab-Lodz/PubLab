import { SUBVIEWS, VIEWS } from '../../../renderer/constants/Views';
import reducer, {
  CurrentView,
  updateCurrentView,
  updateSubview
} from './currentViewSlice';

const testView: CurrentView = {
  view: VIEWS.PROJECT,
  subview: { element: SUBVIEWS.PROJECT_INFO },
};

describe('currentViewSlice', () => {
  it('handles updateCurrentView action', () => {    
    expect(reducer(testView, updateCurrentView(VIEWS.CHANGES))).toEqual({
      view: VIEWS.CHANGES,
      subview: { element: SUBVIEWS.NONE },
    });
  });

  it('handles updateSubview action', () => {    
    expect(reducer(testView, updateSubview({ element: SUBVIEWS.NO_PROJECTS }))).toEqual({
      view: VIEWS.PROJECT,
      subview: { element: SUBVIEWS.NO_PROJECTS },
    });
  });
});