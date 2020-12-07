import React from 'react';
import './CustomRouter.scss';
import {useSelector} from 'react-redux';
import {selectCurrentView} from '../../../shared/slices/currentViewSlice';
import {routerComponents} from '../../constants/RouterComponents';
import {Subviews} from "../../constants/Views";

const CustomRouter = () => {
  const {view, subview} = useSelector(selectCurrentView);
  const View: React.FC = routerComponents[view];
  const Subview: React.FC = routerComponents[subview];

  return (
    <>
      <div className='view'>
        <View/>
      </div>
      {subview !== Subviews.NONE &&
        <div className='subview'>
          <Subview />
        </div>
      }
    </>
  );
};

export default CustomRouter;
