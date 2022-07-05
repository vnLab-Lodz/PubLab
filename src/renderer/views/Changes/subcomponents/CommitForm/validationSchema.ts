import { object, string, InferType } from 'yup';

const validationSchema = object({
  summary: string().required('common.field_required'),
  description: string(),
});

type FormFields = InferType<typeof validationSchema>;

export { validationSchema, FormFields };
