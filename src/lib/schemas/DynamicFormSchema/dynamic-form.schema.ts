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

const languageKnowledgeSchema = z
  .discriminatedUnion('knowsOtherLanguages', [
    z.object({
      knowsOtherLanguages: z.literal(true),
      language: z.array(z.object({ name: z.string().min(1) })),
    }),
    z.object({ knowsOtherLanguages: z.literal(false) }),
  ])
  .default({ knowsOtherLanguages: false });

export const DynamicFormSchema = z
  .object({
    name: z.string().min(1),
  })
  .and(workExperienceSchema)
  .and(languageKnowledgeSchema);

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
