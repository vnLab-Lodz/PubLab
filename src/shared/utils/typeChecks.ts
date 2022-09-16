import { LocalPublication, Publication } from '../types';

export const isLocalPublication = (
  publication: Publication
): publication is LocalPublication => {
  if (!('dirPath' in publication)) return false;
  return !!publication.dirPath;
};
