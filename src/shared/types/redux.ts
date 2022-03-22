export enum PUBLICATION_GENERATION_STATUS {
  IDLE,
  GENERATING_GATSBY_PROJECT,
  CREATING_CONFIGURATION_FILE,
  MODIFYING_PACKAGE_JSON,
  MODIFYING_GATSBY_CONFIG,
  SUCCESS,
  FAILURE,
}

export interface PublicationGenerationSlice {
  status: PUBLICATION_GENERATION_STATUS;
}

export interface RootState {
  publicationGeneration: PublicationGenerationSlice;
}
