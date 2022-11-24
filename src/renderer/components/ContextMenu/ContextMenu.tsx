import React, { createContext, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { clipboard } from 'electron';
import { useTranslation } from 'react-i18next';
import { ContextData } from './types';
import * as Styled from './style';

interface Props {
  children: React.ReactNode[];
}

type HandlerFunctionCreator = (
  data: ContextData
) => (event: React.MouseEvent) => void;

export const MenuContext = createContext<HandlerFunctionCreator>(
  () => () => {}
);

export default function ContextMenu({ children }: Props) {
  const { t } = useTranslation();
  const [contextMenu, setContextMenu] = useState<{
    data: ContextData;
    element: Element;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const createContextMenuHandler = useCallback(
    (data?: ContextData) => (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setContextMenu(
        contextMenu === null
          ? {
              data: data || {},
              element: document.activeElement || event.currentTarget,
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : null
      );
    },
    []
  );

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <div
      onContextMenu={createContextMenuHandler()}
      style={{ cursor: 'context-menu' }}
    >
      <MenuContext.Provider value={createContextMenuHandler}>
        {...children}
      </MenuContext.Provider>
      <Styled.Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {contextMenu?.data.extraMenuItems &&
          contextMenu?.data.extraMenuItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        <MenuItem
          onClick={() => {
            const text = window.getSelection()?.toString();
            if (text) clipboard.writeText(text);
            handleClose();
          }}
        >
          {t('ContextMenu.copy')}
        </MenuItem>
        {['TEXTAREA', 'INPUT'].includes(
          contextMenu?.element.nodeName as string
        ) && (
          <MenuItem
            onClick={() => {
              const element = contextMenu?.element as HTMLInputElement;
              const { selectionStart, selectionEnd } = element;
              if (selectionStart === null || selectionEnd === null) return;
              element.setRangeText(
                clipboard.readText(),
                selectionStart,
                selectionEnd,
                'end'
              );
              element.dispatchEvent(new Event('input', { bubbles: true }));
              handleClose();
            }}
          >
            {t('ContextMenu.paste')}
          </MenuItem>
        )}
      </Styled.Menu>
    </div>
  );
}
