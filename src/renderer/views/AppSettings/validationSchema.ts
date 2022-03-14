import { object, string, SchemaOf, StringSchema } from 'yup';
import { Settings } from '../../../shared/redux/slices/settingsSlice';
import { verifyPath } from '../../ipc';

const validationSchema: SchemaOf<Settings> = object({
  currentLocale: string().required() as StringSchema<Settings['currentLocale']>,
  defaultDirPath: string()
    .required()
    .test('isPathValid', 'not a valid path', async (value) => {
      const result = await verifyPath(value || '');
      return result;
    }),
  notificationInterval: string().required() as StringSchema<
    Settings['notificationInterval']
  >,
});

export { validationSchema };
