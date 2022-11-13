import { ipcRenderer } from 'electron';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { VIEWS } from 'src/renderer/constants/Views';
import { updateCurrentView } from 'src/shared/redux/slices/currentViewSlice';
import { addLoader, removeLoader } from 'src/shared/redux/slices/loadersSlice';
import { Publication } from 'src/shared/types';
import { CHANNELS } from 'src/shared/types/api';
import { useState } from 'react';
import {
  activePublication,
  setActivePublication,
} from 'src/shared/redux/slices/loadPublicationsSlice';
import { useTranslation } from 'react-i18next';

export default function useActivePublication() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loaderId, setLoaderId] = useState('');
  const activePublicationData = useSelector(activePublication);

  const activatePublication = async (publication: Publication) => {
    if (publication.status === 'remote') {
      const uid = uuidv4();
      setLoaderId(uid);

      await ipcRenderer.invoke(
        CHANNELS.GIT.CLONE,
        publication.id,
        publication.repoName,
        publication.cloneUrl,
        { loaderId: uid }
      );
    }

    dispatch(setActivePublication(publication.id));

    const uid = uuidv4();
    setLoaderId(uid);
    dispatch(
      addLoader({
        id: uid,
        message: t('loaders.opening', { title: publication.name }),
      })
    );
    await ipcRenderer.invoke(CHANNELS.GIT.REPO_STATUS);
    await ipcRenderer.invoke(CHANNELS.GIT.CHECKOUT, true);
    await ipcRenderer.invoke(CHANNELS.GIT.RUN_SYNC_CHECK);
    setLoaderId('');
    dispatch(removeLoader(uid));
    dispatch(updateCurrentView(VIEWS.PROJECT));
  };

  return { activePublicationData, activatePublication, loaderId };
}
