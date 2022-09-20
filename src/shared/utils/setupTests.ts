jest.mock('./app', () => ({
  __esModule: true,
  default: {
    getPath: jest.fn(() => './'),
  },
}));

jest.mock('electron-settings', () => ({
  __esModule: true,
  default: {
    getSync: jest.fn(() => ''),
    set: jest.fn(() => {}),
  },
}));
