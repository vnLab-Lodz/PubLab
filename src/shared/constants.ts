import app from './utils/app';

const userData = app.getPath('userData');

export const SETTINGS_FILE_PATH = `${userData}/publab-settings.json`;

export const CONFIG_NAME = 'publab.config.json' as const;

export const COVER_PIC_FILENAME = 'cover';

export const PACKAGE_NAME = 'package.json' as const;

export const MAIN_BRANCH = 'main' as const;

export const FILE_FILTERS = {
  image: {
    name: 'Image',
    extensions: [
      'jpg',
      'jpeg',
      'gif',
      'bmp',
      'png',
      'tif',
      'tiff',
      'svg',
      'ico',
    ],
  },
};
