import { useContext, useMemo } from 'react';
import { MenuContext } from './ContextMenu';
import { ContextData } from './types';

export default function useContextMenu(data: ContextData) {
  const handlerCreator = useContext(MenuContext);
  const openContextMenu = useMemo(
    () => handlerCreator(data),
    [data, handlerCreator]
  );
  return openContextMenu;
}
