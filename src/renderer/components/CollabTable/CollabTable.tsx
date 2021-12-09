import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { Avatar, Typography } from '@mui/material';
import { Collaborator } from '../../../shared/redux/slices/loadPublicationsSlice';

interface Props {
  collaborators: Collaborator[];
}

const CollabTable: React.FC<Props> = ({ collaborators }) => {
  const { t } = useTranslation();
  return (
    <TableContainer>
      <Table aria-label='collaborators table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align='left'>
              <Typography variant='h5'>
                {t('AddProject.AddCollaborators.username').toLocaleUpperCase()}
              </Typography>
            </TableCell>
            <TableCell align='left'>
              <Typography variant='h5'>
                {t('AddProject.AddCollaborators.role').toLocaleUpperCase()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collaborators &&
            collaborators.map((collaborator) => (
              <TableRow
                key={collaborator.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Avatar>{collaborator.githubUsername.charAt(0)}</Avatar>
                </TableCell>
                <TableCell align='left'>
                  {collaborator.githubUsername}
                </TableCell>
                <TableCell align='left'>{collaborator.role}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollabTable;
