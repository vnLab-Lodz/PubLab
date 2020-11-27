import React from 'react';
import './CustomRouter.scss';
import { useSelector } from 'react-redux';
import { selectCurrentView } from '../../../shared/slices/currentViewSlice';
import { routerComponents } from '../../constants/RouterComponents';
import {COMPONENTS} from "../../constants/Components";

const CustomRouter = () => {

  const currentView = useSelector(selectCurrentView);
  const View: React.FC = routerComponents[currentView.view as COMPONENTS];

  return (
    <div className="router">
      <View />
    </div>
  );
};

export default CustomRouter;