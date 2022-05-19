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
  if (projectRootPath === dirPath) return <></>;
  const splitPath = [
    '.',
    ...path.relative(projectRootPath, dirPath).split(path.sep),
  ];
  const crumbs = splitPath.map((directory, index) => (
    <Button
      onClick={() =>
        onClick(path.join(projectRootPath, ...splitPath.slice(0, index + 1)))
      }
      disabled={splitPath.length === index + 1}
      sx={{ minWidth: 0 }}
    >
      <Typography variant='body2' textTransform='lowercase' color='primary'>
        {directory}
      </Typography>
    </Button>
  ));
  return (
    <MUIBreadcrumbs
      sx={(theme) => ({
        '& .MuiBreadcrumbs-separator': {
          color: theme.palette.text.primary,
          margin: '0 0.3rem',
        },
      })}
    >
      {crumbs}
    </MUIBreadcrumbs>
  );
}
