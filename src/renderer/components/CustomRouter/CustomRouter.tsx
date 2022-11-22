import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentView } from '../../../shared/redux/slices/currentViewSlice';
import { routerComponents } from '../../constants/RouterComponents';
import { SUBVIEWS } from '../../constants/Views';
import SubviewPanel from '../SubviewPanel/SubviewPanel';
import useViewRedirects from './redirects';

const CustomRouter = () => {
  const { view, subview } = useViewRedirects(useSelector(selectCurrentView));
  const View: React.FC = routerComponents[view];
  const Subview: React.FC = routerComponents[subview.element];

  return (
    <>
      <Box component='main' className='view' width='100%'>
        <View />
      </Box>
      {subview.element !== SUBVIEWS.NONE && (
        <SubviewPanel>
          <Subview {...(subview.props || {})} />
        </SubviewPanel>
      )}
    </>
  );
};

export default CustomRouter;
