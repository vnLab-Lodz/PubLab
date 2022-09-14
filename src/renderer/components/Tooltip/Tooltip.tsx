import React from 'react';
import { styled, Tooltip as MUITooltip, TooltipProps } from '@mui/material';

type Props = TooltipProps & { className?: string };

const ToBeStyledTooltip: React.FC<Props> = ({ className, ...props }) => (
  <MUITooltip {...props} classes={{ tooltip: className }} />
);

ToBeStyledTooltip.defaultProps = { className: undefined };

const Tooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: 0,
  border: `solid 1px ${theme.palette.text.primary}`,
  color: theme.palette.text.primary,

  '.MuiTooltip-arrow::before': {
    background: theme.palette.background.default,
    border: `solid 1px ${theme.palette.text.primary}`,
  },
}));

export default Tooltip;
