import { object, string, InferType } from 'yup';

const validationSchema = object({
  name: string().required('common.field_required'),
  description: string().max(220),
});

type FormFields = InferType<typeof validationSchema>;

export { validationSchema, FormFields };
