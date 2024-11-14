import { z } from 'zod';

const workExperienceSchema = z
  .discriminatedUnion('hasWorkExperience', [
    z.object({
      hasWorkExperience: z.literal(true),
      companyName: z.string().min(1),
    }),
    z.object({
      hasWorkExperience: z.literal(false),
    }),
  ])
  .default({ hasWorkExperience: false });

export const DynamicFormSchema = z
  .object({
    name: z.string().min(1),
  })
  .and(workExperienceSchema);

export type DynamicFormType = z.infer<typeof DynamicFormSchema>;

// -> Example of Union Types in Typescript

// type TestType =
//   | { city: 'Sargodha'; oranges: 'Good' | 'Superb' }
//   | { city: 'Multan'; mangoes: 'Good' | 'Superb' };

// type T = {
//   name: string;
// } & TestType;

// const check: T = {
//   name: 'Bhutto',
//   city: 'Multan',
//   oranges:'Good'
// };
