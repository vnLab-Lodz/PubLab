import { object, string, InferType } from 'yup';

const validationSchema = object({
  name: string().required('common.field_required'),
  description: string(),
});

interface FormFields extends InferType<typeof validationSchema> {}

export { validationSchema, FormFields };
