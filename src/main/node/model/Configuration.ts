import { Publication } from '../../../shared/redux/slices/loadPublicationsSlice';

export type Configuration = Publication & { tag: string };
