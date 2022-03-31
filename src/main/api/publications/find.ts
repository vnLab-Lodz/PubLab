import createPublicationFinder from 'src/main/lib/publicationFinder';
import { IpcEventHandler } from 'src/shared/types/api';

const find: IpcEventHandler = async () => {
  const finder = createPublicationFinder();
  const publications = await finder.findLocalPublications();
  return publications;
};

export default find;
