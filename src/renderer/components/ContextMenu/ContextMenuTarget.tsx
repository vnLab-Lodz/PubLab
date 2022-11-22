import React from 'react';
import { ContextData } from './types';
import useContextMenu from './useContextMenu';

interface Props extends ContextData {
  children: React.ReactNode;
}

const ContextMenuTarget: React.FC<Props> = ({ children, ...rest }: Props) => {
  const contextMenuHandler = useContextMenu(rest);
  return <div onContextMenu={contextMenuHandler}>{children}</div>;
};

export default ContextMenuTarget;
