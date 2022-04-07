import { object, string, SchemaOf, StringSchema, array, boolean } from 'yup';
import { Settings } from '../../../shared/redux/slices/settingsSlice';
import { verifyPath } from '../../ipc';

const validationSchema: SchemaOf<Settings> = object({
  currentLocale: string().required() as StringSchema<Settings['currentLocale']>,
  defaultDirPath: string()
    .required('common.field_required')
    .test('isPathValid', 'common.directory_not_existing', async (value) => {
      const result = await verifyPath(value || '');
      return result;
    }),
  notificationInterval: string().required() as StringSchema<
    Settings['notificationInterval']
  >,
  syncLocations: array(
    object({ name: string().required(), enabled: boolean().required() })
  ),
});

export { validationSchema };
