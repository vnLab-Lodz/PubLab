import {
  Breadcrumbs as MUIBreadcrumbs,
  Button,
  Typography,
} from '@mui/material';
import path from 'path';
import React from 'react';

interface Props {
  projectRootPath: string;
  dirPath: string;
  onClick: (path: string) => void;
}

export default function Breadcrumbs({
  projectRootPath,
  dirPath,
  onClick,
}: Props) {
  const splitPath = [
    '.',
    ...path.relative(projectRootPath, dirPath).split(path.sep),
  ];
  const crumbs = splitPath.map((directory, index) => {
    const crumbPath = path.join(
      projectRootPath,
      ...splitPath.slice(0, index + 1)
    );
    return (
      <Button
        key={crumbPath}
        onClick={() => onClick(crumbPath)}
        disabled={splitPath.length === index + 1}
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
}
