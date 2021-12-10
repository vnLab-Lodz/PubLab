import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import ClearIcon from '@mui/icons-material/Clear';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { Avatar, Typography } from '@mui/material';
import * as Styled from './style';
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
            <Styled.BorderedTC />
            <Styled.BorderedTC>
              <Typography variant='h5'>
                {t('AddProject.AddCollaborators.username').toLocaleUpperCase()}
              </Typography>
            </Styled.BorderedTC>
            <Styled.BorderedTC>
              <Typography variant='h5'>
                {t('AddProject.AddCollaborators.role').toLocaleUpperCase()}
              </Typography>
            </Styled.BorderedTC>
          </TableRow>
        </TableHead>
        <TableBody>
          {collaborators &&
            collaborators.map((collaborator) => (
              <TableRow key={collaborator.id}>
                <Styled.BorderedTC>
                  <Avatar>{collaborator.githubUsername.charAt(0)}</Avatar>
                </Styled.BorderedTC>
                <Styled.BorderedTC>
                  {collaborator.githubUsername}
                </Styled.BorderedTC>
                <Styled.BorderedTC>{collaborator.role}</Styled.BorderedTC>
                <Styled.BorderedTC />
                <Styled.BorderedTC>
                  <ClearIcon />
                </Styled.BorderedTC>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollabTable;
