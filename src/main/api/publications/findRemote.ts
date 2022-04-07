import createPublicationFinder from 'src/main/lib/publicationFinder';
import { IpcEventHandler } from 'src/shared/types/api';

const findRemote: IpcEventHandler = async () => {
  const finder = createPublicationFinder();
  const publications = await finder.findRemotePublications();
  return publications;
};

export default findRemote;
