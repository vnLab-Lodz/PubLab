import React from 'react';
import './CustomRouter.scss';
import {useSelector} from 'react-redux';
import {selectCurrentView} from '../../../shared/slices/currentViewSlice';
import {routerComponents} from '../../constants/RouterComponents';
import {Subviews} from "../../constants/Views";

const CustomRouter = () => {
  const {view, subview} = useSelector(selectCurrentView);
  const View: React.FC = routerComponents[view];
  const Subview: React.FC = routerComponents[subview.element];
  
  return (
    <>
      <div className='view'>
        <View/>
      </div>
      {subview.element !== Subviews.NONE &&
        <div className='subview'>
          <Subview {...(subview.props || {})} />
        </div>
      }
    </>
  );
};

export default CustomRouter;
