import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Avatar, IconButton, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Collaborator } from 'src/shared/types';
import * as Styled from './style';
import { deleteCollaborator } from '../../../shared/redux/slices/addPublicationWizardSlice';
import TableCell from '../TableCell/TableCell';

interface Props {
  collaborators: Collaborator[];
}

const CollabTable: React.FC<Props> = ({ collaborators }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteCollaborator(id));
  };

  return (
    <Styled.Container>
      <Table
        aria-label='collaborators table'
        sx={{ width: 'calc(100% - 1px)' }} // -1px fixes the missing rightmost border
      >
        <TableHead>
          <Styled.Row>
            <TableCell />
            <TableCell>
              <Typography variant='caption'>
                {t('AddProject.AddCollaborators.username').toLocaleUpperCase()}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='caption'>
                {t('AddProject.AddCollaborators.role').toLocaleUpperCase()}
              </Typography>
            </TableCell>
          </Styled.Row>
        </TableHead>
        <TableBody>
          {collaborators &&
            collaborators.map((collaborator) => (
              <Styled.Row key={collaborator.id}>
                <TableCell align='center' width='3rem'>
                  <Avatar
                    sx={{
                      width: '2.5rem',
                      height: '2.5rem',
                      fontSize: '1.3rem',
                    }}
                  >
                    {collaborator.githubUsername.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell border>{collaborator.githubUsername}</TableCell>
                <TableCell border>
                  {t(`AddProject.AddCollaborators.${collaborator.role}` as any)}
                </TableCell>
                <TableCell width='3rem' />
                <TableCell
                  border
                  align='center'
                  width='3rem'
                  sx={{ borderLeft: '1px solid' }}
                >
                  <IconButton
                    color='primary'
                    size='small'
                    aria-label='delete collaborator'
                    onClick={() => handleDelete(collaborator.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ClearIcon fontSize='inherit' />
                  </IconButton>
                </TableCell>
              </Styled.Row>
            ))}
        </TableBody>
      </Table>
    </Styled.Container>
  );
};

export default CollabTable;
