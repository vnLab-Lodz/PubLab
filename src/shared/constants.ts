import app from './utils/app';

const userData = app.getPath('userData');

export const SETTINGS_FILE_PATH = `${userData}/publab-settings.json`;

export const CONFIG_NAME = 'publab.config.json' as const;

export const PACKAGE_NAME = 'package.json' as const;
