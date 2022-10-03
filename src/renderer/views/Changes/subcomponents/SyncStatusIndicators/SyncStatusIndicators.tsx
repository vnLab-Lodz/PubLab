import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { selectMainBranchSync } from '../../../../../shared/redux/slices/mainBranchSyncSlice';
import Tooltip from '../../../../components/Tooltip/Tooltip';

interface Props {}

const SyncStatusIndicators: React.FC<Props> = () => {
  const { status } = useSelector(selectMainBranchSync);
  const { t } = useTranslation();
  return (
    <Tooltip
      title={t('Changes.repoSync.indicator_tooltip')}
      arrow
      placement='top-start'
    >
      <Box display='flex' mr='0.2rem'>
        <Indicator value={status.ahead} Icon={ArrowDownwardIcon} />
        <Indicator value={status.behind} Icon={ArrowUpwardIcon} />
      </Box>
    </Tooltip>
  );
};

export default SyncStatusIndicators;

function Indicator({
  value,
  Icon,
}: {
  value: number;
  Icon: typeof ArrowDownwardIcon;
}) {
  return (
    <Box display='flex' alignItems='center'>
      <Icon
        sx={({ palette }) => ({
          color: value ? palette.green.main : undefined,
          opacity: value ? 1 : 0.5,
        })}
      />
      <Typography variant='body2'>{value}</Typography>
    </Box>
  );
}
