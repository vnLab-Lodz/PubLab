import { Publication } from '../../../shared/redux/slices/publicationsSlice';

export type Configuration = Publication & { tag: string };
