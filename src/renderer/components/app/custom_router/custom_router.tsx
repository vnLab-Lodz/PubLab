import React from 'react';
import './custom_router.scss';
import { useSelector } from 'react-redux';
import Component1 from '../router_components/component1/component1';
import Component2 from '../router_components/component2/component2';
import Component3 from '../router_components/component3/component3';
import ErrorComponent from '../error_component/error_component';
import { selectCurrentView } from '../../../../shared/slices/currentViewSlice';
import NavigationBar from '../navigation_bar/navigation_bar';
import Description from '../router_components/description/description';
import { components } from '../../../constants/RouterComponents';

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