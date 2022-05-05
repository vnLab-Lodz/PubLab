/* eslint-disable no-control-regex */
import { object, string, InferType } from 'yup';

// Naming Files, Paths, and Namespaces:
// https://docs.microsoft.com/pl-pl/windows/win32/fileio/naming-a-file?redirectedfrom=MSDN
const invalidRegex =
  /[,.:=+^%&$@!~`'{}[\]()<>:"/\\|?*\x00-\x1F]|^(?:aux|con|clock\$|nul|prn|com[1-9]|lpt[1-9])$/;

const validationSchema = object({
  name: string()
    .test(
      'is-valid-folder-name',
      'common.invalid_folder_name',
      (value) => !value?.match(invalidRegex)
    )
    .required('common.field_required'),
  description: string().max(220),
});

type FormFields = InferType<typeof validationSchema>;

export { validationSchema, FormFields };
