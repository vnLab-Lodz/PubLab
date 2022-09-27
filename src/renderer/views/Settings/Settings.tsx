import { Typography } from '@mui/material';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { ipcRenderer } from 'electron';
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
import { gitCommit, gitPush, gitStage, updateConfig } from '../../ipc';
import { sendNotification } from '../../../shared/redux/slices/notificationsSlice';
import TagsManager from './subcomponents/TagsManager/TagsManager';
import SnippetsManager from './subcomponents/SnippetsManager/SnippetsManager';
import LoaderOverlay from '../../components/LoaderOverlay/LoaderOverlay';
import { CHANNELS } from '../../../shared/types/api';
import { COVER_PIC_FILENAME } from '../../../shared/constants';
import { selectCurrentUserData } from '../../../shared/redux/slices/currentUserSlice';

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const project = useSelector(activePublication) as LocalPublication;
  const username = useSelector(selectCurrentUserData)?.nick;
  const [changes, handleChange] = useReducer(
    (state: Partial<Config>, update: Partial<Config>): Partial<Config> => ({
      ...state,
      ...update,
    }),
    {}
  );
  const [canSubmit, setCanSubmit] = useState(true);
  const [loaderId, setLoaderID] = useState('');

  const projectSettings = { ...stripPublication(project), ...changes };

  return (
    <>
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
            compact
            disabled={project.owner !== username}
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
          <SnippetsManager state={projectSettings} onSubmit={handleChange} />
        </SeparatedSection>
        <SeparatedSection pb={3}>
          <Button
            variant='contained'
            color='green'
            sx={{ m: 0 }}
            isMajor
            fullWidth
            disabled={!canSubmit}
            onClick={async () => {
              const id = uuidv4();
              setLoaderID(id);
              const processedChanges = await handleCoverImage(changes, project);
              await updateConfig(project.dirPath, processedChanges);
              await gitCommit('Config update\n\n[PubLab automatic commit]');
              ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS);
              dispatch(updatePublication({ ...project, ...processedChanges }));
              await ipcRenderer.invoke(CHANNELS.GITHUB.UPDATE_COLLABORATORS);
              await gitPush(id);
              dispatch(
                sendNotification({
                  title: t('ProjectSettings.notification.title'),
                  message: t('ProjectSettings.notification.message'),
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
      <LoaderOverlay id={loaderId} />
    </>
  );
};

export default Settings;

async function handleCoverImage(
  changes: Partial<Config>,
  project: LocalPublication
) {
  if (changes.imagePath === project.imagePath) return changes;

  if (project.imagePath) {
    await ipcRenderer.invoke(CHANNELS.FILES.REMOVE, project.imagePath);
    await gitStage(
      [
        {
          filepath: project.imagePath,
          status: { head: 1, workdir: 0, stage: 1 },
          children: [],
        },
      ],
      { refresh: false }
    );
  }

  if (!changes.imagePath) return changes;

  const { imagePath } = changes;
  const destination = path.resolve(
    project.dirPath,
    `${COVER_PIC_FILENAME}${path.extname(imagePath)}`
  );
  await ipcRenderer.invoke(CHANNELS.FILES.COPY, imagePath, destination);
  await gitStage(
    [
      {
        filepath: destination,
        status: { head: 0, workdir: 2, stage: 0 },
        children: [],
      },
    ],
    { refresh: false }
  );
  return { ...changes, imagePath: destination };
}

// TODO: Some better settings typing and a different selector could be a more robust long term solution
// ! Temporary fix for: https://github.com/vnLab-Lodz/PubLab/issues/249
function stripPublication(publication: LocalPublication) {
  const {
    status,
    lastUpdate,
    dirPath,
    keepDescriptionVisible,
    keepSnippetsVisible,
    keepServerVisible,
    ...stripped
  } = publication;

  return stripped;
}
