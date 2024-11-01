import {
  BasicAddressInfoSchema,
  BasicJobInfoSchema,
  BasicPersonalInfoSchema,
} from '@/lib/schemas/BasicFormSchema/basic-form.schema';
import { z } from 'zod';

export type BasicPersonalInfoType = z.infer<typeof BasicPersonalInfoSchema>;
export type BasicJobInfoType = z.infer<typeof BasicJobInfoSchema>;
export type BasicAddressInfoType = z.infer<typeof BasicAddressInfoSchema>;

export type FormValuesType = Partial<
  BasicPersonalInfoType & BasicJobInfoType & BasicAddressInfoType
>;
