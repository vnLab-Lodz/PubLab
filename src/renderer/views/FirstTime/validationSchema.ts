import * as yup from 'yup';
import { verifyPath } from 'src/renderer/ipc';

export const validationSchema = yup.object({
  dir: yup
    .string()
    .required('common.field_required')
    .test('isPathValid', 'common.directory_not_existing', async (value) => {
      const result = await verifyPath(value || '');
      return result;
    }),
});
