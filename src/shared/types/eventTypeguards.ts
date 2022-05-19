import React from 'react';

export function isKeyboardEvent(
  event: React.SyntheticEvent
): event is React.KeyboardEvent {
  return ['keydown', 'keypress', 'keyup'].includes(event.type);
}

export function isClickEvent(
  event: React.SyntheticEvent
): event is React.MouseEvent {
  return ['click'].includes(event.type);
}
