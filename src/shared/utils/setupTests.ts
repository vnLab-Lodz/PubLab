jest.mock('./app', () => ({
  __esModule: true,
  default: {
    getPath: jest.fn(() => './'),
  },
}));
