import {
  Breadcrumbs as MUIBreadcrumbs,
  Button,
  Typography,
} from '@mui/material';
import path from 'path';
import React from 'react';

interface Props {
  projectRootPath?: string;
  dirPath: string;
  onClick?: (path: string) => void;
}

const Breadcrumbs: React.FC<Props> = ({
  projectRootPath,
  dirPath,
  onClick,
}) => {
  const splitPath = [
    '.',
    ...(projectRootPath
      ? path.relative(projectRootPath, dirPath)
      : dirPath
    ).split(path.sep),
  ];
  const crumbs = splitPath.map((directory, index) => {
    const crumbPath = path.join(
      projectRootPath || '.',
      ...splitPath.slice(0, index + 1)
    );
    return (
      <Button
        key={crumbPath}
        onClick={onClick ? () => onClick(crumbPath) : undefined}
        disabled={!onClick || splitPath.length === index + 1}
        sx={{ minWidth: 0 }}
      >
        <Typography variant='body2' textTransform='lowercase' color='gray.dark'>
          {directory}
        </Typography>
      </Button>
    );
  });

  return (
    <MUIBreadcrumbs
      sx={(theme) => ({
        '& .MuiBreadcrumbs-separator': {
          color: theme.palette.gray.dark,
          margin: '0 0.3rem',
        },
      })}
    >
      {crumbs}
    </MUIBreadcrumbs>
  );
};

Breadcrumbs.defaultProps = { onClick: undefined, projectRootPath: undefined };

export default Breadcrumbs;
