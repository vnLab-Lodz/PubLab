import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { routerComponents } from '../../constants/RouterComponents';
import { SUBVIEWS } from '../../constants/Views';
import './CustomRouter.scss';

const CustomRouter = () => {
  const { view, subview } = useSelector(selectCurrentView);
  const View: React.FC = routerComponents[view];
  const Subview: React.FC = routerComponents[subview.element];

  return (
    <>
      <div className='view'>
        <View />
      </div>
      {subview.element !== SUBVIEWS.NONE && (
        <div className='subview'>
          <Subview {...(subview.props || {})} />
        </div>
      )}
    </>
  );
};

export default CustomRouter;
