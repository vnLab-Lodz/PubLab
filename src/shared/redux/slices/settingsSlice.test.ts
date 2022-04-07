import reducer, {
  NOTIFICATION_INTERVAL,
  setSettings,
  Settings,
} from './settingsSlice';

describe('settings', () => {
  it('handles setSettings action', () => {
    const settings: Settings = {
      defaultDirPath: 'default_path',
      currentLocale: 'en',
      notificationInterval: NOTIFICATION_INTERVAL.INSTANT,
      syncLocations: [{ name: 'Profile', enabled: true }],
    };
    expect(reducer(undefined, setSettings(settings))).toEqual({
      defaultDirPath: 'default_path',
      currentLocale: 'en',
      notificationInterval: NOTIFICATION_INTERVAL.INSTANT,
      syncLocations: [{ name: 'Profile', enabled: true }],
    });
  });
});
