import app from './utils/app';

export const SETTINGS_FILE_PATH = `${app.getPath(
  'userData'
)}/publab-settings.json`;

export const CONFIG_NAME = 'publab.config.json' as const;

export const PACKAGE_NAME = 'package.json' as const;
