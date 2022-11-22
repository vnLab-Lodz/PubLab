import React, { createContext, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { clipboard } from 'electron';
import { ContextData } from './types';
import * as Styled from './style';

interface Props {
  children: React.ReactNode[];
}

type OpenFunction = (event: React.MouseEvent, data: ContextData) => void;

export const MenuContext = createContext<OpenFunction>(() => {});

export default function ContextMenu({ children }: Props) {
  const [contextMenu, setContextMenu] = useState<{
    data: ContextData;
    element: Element;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const openContextMenu = useMemo(
    () => (event: React.MouseEvent, data: ContextData) => {
      event.preventDefault();
      event.stopPropagation();
      setContextMenu(
        contextMenu === null
          ? {
              data,
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
      onContextMenu={(event) => {
        openContextMenu(event, {});
      }}
      style={{ cursor: 'context-menu' }}
    >
      <MenuContext.Provider value={openContextMenu}>
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
          Copy
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
            Paste
          </MenuItem>
        )}
      </Styled.Menu>
    </div>
  );
}
