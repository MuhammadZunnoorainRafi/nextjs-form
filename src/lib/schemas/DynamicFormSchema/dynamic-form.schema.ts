import { z } from 'zod';

const workExperienceSchema = z.discriminatedUnion('hasWorkExperience', [
  z.object({
    hasWorkExperience: z.literal(true),
    companyName: z.string().min(1),
  }),
  z.object({
    hasWorkExperience: z.literal(false),
  }),
]);

const languageKnowledgeSchema = z.discriminatedUnion('knowsOtherLanguages', [
  z.object({
    knowsOtherLanguages: z.literal(true),
    language: z.array(z.object({ name: z.string().min(1) })),
  }),
  z.object({ knowsOtherLanguages: z.literal(false) }),
]);

const educationSchema = z.discriminatedUnion('educationLevel', [
  z.object({ educationLevel: z.literal('noFormalEducation') }),
  z.object({
    educationLevel: z.literal('higherSchoolDiploma'),
    schoolName: z.string().min(1),
  }),
  z.object({
    educationLevel: z.literal('bachelorsDegree'),
    universityName: z.string().min(1),
  }),
]);

export const DynamicFormSchema = z
  .object({
    name: z.string().min(1),
  })
  .and(workExperienceSchema)
  .and(languageKnowledgeSchema)
  .and(educationSchema);

export type DynamicFormType = z.infer<typeof DynamicFormSchema>;

export const formDefaultValues: DynamicFormType = {
  name: '',
  hasWorkExperience: false,
  knowsOtherLanguages: false,
  educationLevel: 'noFormalEducation',
};

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
