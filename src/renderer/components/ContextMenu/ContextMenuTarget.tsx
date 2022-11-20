import React, { useContext } from 'react';
import { MenuContext } from './ContextMenu';
import { ContextData } from './types';

interface Props extends ContextData {
  children: React.ReactNode;
}

const ContextMenuTarget: React.FC<Props> = ({ children, ...rest }: Props) => {
  const openContextMenu = useContext(MenuContext);
  return <div onContextMenu={(e) => openContextMenu(e, rest)}>{children}</div>;
};

export default ContextMenuTarget;
