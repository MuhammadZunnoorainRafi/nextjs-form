import { z } from 'zod';

export const BasicPersonalInfoSchema = z.object({
  name: z.string().min(1, 'Enter name'),
  email: z
    .string()
    .min(1, 'Enter email')
    .email({ message: 'Enter a valid email address' }),
  age: z.coerce.number().min(1, 'You must be above 22'),
});

export const BasicJobInfoSchema = z.object({
  jobTitle: z.enum(['Engineer', 'Doctor', 'Teacher'], {
    errorMap: () => ({ message: 'Select a valid job title' }),
  }),
  gender: z.enum(['Male', 'Female'], {
    errorMap: () => ({ message: 'Select a valid gender' }),
  }),
  experience: z.enum(['1 year', '2 years', '3 years'], {
    errorMap: () => ({ message: 'Select a valid experience option' }),
  }),
});

export const BasicAddressInfoSchema = z.object({
  presentAddress: z.string().min(1, 'Enter present address'),
  permanentAddress: z.string().min(1, 'Enter permanent address'),
});
