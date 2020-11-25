import React from 'react';
import './CustomRouter.scss';
import { useSelector } from 'react-redux';
import { selectCurrentView } from '../../../shared/slices/currentViewSlice';
import { components } from '../../constants/RouterComponents';

const CustomRouter = () => {

  const currentView = useSelector(selectCurrentView);
  const View: React.FC = components[currentView.view].component;

  return (
    <div className="router">
      <View/>
    </div>
  );
};

export default CustomRouter;