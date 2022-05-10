import { Typography } from '@mui/material';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  activePublication,
  updatePublication,
} from '../../../shared/redux/slices/loadPublicationsSlice';
import CollaboratorsPicker from '../../components/CollaboratorsPicker/CollaboratorsPicker';
import ProjectDetailsInput from '../../components/ProjectDetailsInput/ProjectDetailsInput';
import { SeparatedSection } from '../../components/Section/Section';
import ViewContent from '../../components/ViewContent/ViewContent';
import Button from '../../components/Button/Button';
import { LocalPublication } from '../../../shared/types';
import { Config } from '../../../main/lib/configurationFileHandler';
import { updateConfig } from '../../ipc';
import { sendNotification } from '../../../shared/redux/slices/notificationsSlice';
import TagsManager from './subcomponents/TagsManager/TagsManager';

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const project = useSelector(activePublication) as LocalPublication;
  const [changes, handleChange] = useReducer(
    (state: Partial<Config>, update: Partial<Config>): Partial<Config> => ({
      ...state,
      ...update,
    }),
    {}
  );
  const [canSubmit, setCanSubmit] = useState(true);

  const projectSettings = { ...project, ...changes };

  return (
    <ViewContent>
      <Typography variant='h1' mb={4}>
        {projectSettings.name}
      </Typography>
      <SeparatedSection pb={3}>
        <ProjectDetailsInput
          state={projectSettings}
          onSubmit={handleChange}
          onValidationStateChange={setCanSubmit}
        />
      </SeparatedSection>
      <SeparatedSection pb={3}>
        <TagsManager state={projectSettings} onSubmit={handleChange} />
      </SeparatedSection>
      <SeparatedSection pb={3}>
        <CollaboratorsPicker
          state={projectSettings}
          onAdd={(collaborator) =>
            handleChange({
              collaborators: [...projectSettings.collaborators, collaborator],
            })
          }
          onDelete={(id) =>
            handleChange({
              collaborators: projectSettings.collaborators.filter(
                (collaborator) => !(collaborator.id === id)
              ),
            })
          }
        />
      </SeparatedSection>
      <SeparatedSection pb={3}>
        <Button
          variant='contained'
          color='green'
          isMajor
          fullWidth
          disabled={!canSubmit}
          onClick={() => {
            updateConfig(project.dirPath, changes);
            dispatch(updatePublication({ ...project, ...changes }));
            dispatch(
              sendNotification({
                title: 'Save successful',
                message: 'Your config changes were saved',
                type: 'success',
                autoDismiss: true,
              })
            );
          }}
        >
          {t('common.save')}
        </Button>
      </SeparatedSection>
    </ViewContent>
  );
};

export default Settings;
