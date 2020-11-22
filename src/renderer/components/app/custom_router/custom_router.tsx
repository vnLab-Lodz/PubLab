import React, { useState, useEffect } from 'react';
import './custom_router.scss';
import { useDispatch, useSelector } from 'react-redux';
import Component1 from '../router_components/component1/component1';
import Component2 from '../router_components/component2/component2';
import Component3 from '../router_components/component3/component3';
import ErrorComponent from '../error_component/error_component';
import { COMPONENTS_LIST } from '../../../constants/componentsEnum';
import { selectCurrentPage, updateCurrentPage } from '../../../../shared/slices/currentPageSlice';
import NavigationBar from '../navigation_bar/navigation_bar';

const CustomRouter = () => {

  const getRenderedPage = (pageName: string) => {
    switch(pageName) {
      case COMPONENTS_LIST.COMPONENT1:
        return <Component1/>
      case COMPONENTS_LIST.COMPONENT2:
        return <Component2/>
      case COMPONENTS_LIST.COMPONENT3:
        return <Component3/>
      default:
        return <ErrorComponent/>
    }
  }

  const switchPage = (pageName: string) => {
    switch(pageName) {
      case COMPONENTS_LIST.COMPONENT1:
        dispatch(updateCurrentPage(COMPONENTS_LIST.COMPONENT1))
        break;
      case COMPONENTS_LIST.COMPONENT2:
        dispatch(updateCurrentPage(COMPONENTS_LIST.COMPONENT2))
        break;
      case COMPONENTS_LIST.COMPONENT3:
        dispatch(updateCurrentPage(COMPONENTS_LIST.COMPONENT3))
        break;
      default:
        return;
    }
  }

  const currentPage = useSelector(selectCurrentPage);

  // log user to showcase state changes if you don't have Redux Tools
  console.log(currentPage);

  const dispatch = useDispatch();

  return (
    <>
      <>{getRenderedPage(currentPage.page)}</>
      <button onClick={() => switchPage(COMPONENTS_LIST.COMPONENT1)}>Go to Page 1</button>
      <button onClick={() => switchPage(COMPONENTS_LIST.COMPONENT2)}>Go to Page 2</button>
      <button onClick={() => switchPage(COMPONENTS_LIST.COMPONENT3)}>Go to Page 3</button>
      <NavigationBar/>
    </>
  );
};

export default CustomRouter;