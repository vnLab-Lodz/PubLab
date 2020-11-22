import React from 'react';
import './custom_router.scss';
import { useSelector } from 'react-redux';
import Component1 from '../router_components/component1/component1';
import Component2 from '../router_components/component2/component2';
import Component3 from '../router_components/component3/component3';
import ErrorComponent from '../error_component/error_component';
import { COMPONENTS_LIST } from '../../../constants/componentsEnum';
import { selectCurrentView } from '../../../../shared/slices/currentViewSlice';
import NavigationBar from '../navigation_bar/navigation_bar';
import Description from '../router_components/description/description';

const CustomRouter = () => {

  const getRenderedView = (viewName: string) => {
    switch(viewName) {
      case COMPONENTS_LIST.COMPONENT1:
        return <Component1/>
      case COMPONENTS_LIST.COMPONENT2:
        return <Component2/>
      case COMPONENTS_LIST.COMPONENT3:
        return <Component3/>
      case COMPONENTS_LIST.DESCRIPTION:
        return <Description/>
      default:
        return <ErrorComponent/>
    }
  }

  const currentView = useSelector(selectCurrentView);

  return (
    <div className="router">
      <div className="sideBar">
        <NavigationBar />
      </div>
      <div className="content">
        <>{getRenderedView(currentView.view)}</>
      </div>
    </div>
  );
};

export default CustomRouter;