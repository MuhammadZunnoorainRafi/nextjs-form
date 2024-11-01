import ErrorMessage from '@/components/shared/ErrorMessage';
import FormFooter from '@/components/shared/FormFooter';
import { useAppContext } from '@/context/AppContext';
import { BasicJobInfoSchema } from '@/lib/schemas/BasicFormSchema/basic-form.schema';
import { BasicJobInfoType } from '@/lib/types/BasicFormType/basic-form.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

function JobInfo() {
  const { setCurrentStep, updateFormValues, formValues } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicJobInfoType>({
    resolver: zodResolver(BasicJobInfoSchema),
    defaultValues: {
      gender: formValues.gender,
      jobTitle: formValues.jobTitle,
      experience: formValues.experience,
    },
  });

  const formSubmit = (formdata: BasicJobInfoType) => {
    updateFormValues(formdata);
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <h1>Personal Info</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col p-5 rounded-xl border border-white space-y-2"
      >
        <div>
          <label htmlFor="job" className="mb-1">
            Job Title:
          </label>
          <input
            type="text"
            id="job"
            {...register('jobTitle')}
            className="mt-1 p-2 rounded-md outline-none text-black focus:ring-1 focus:ring-blue-700 border-2 border-gray-700 w-full focus:border-blue-700 "
          />
          <ErrorMessage message={errors.jobTitle?.message} />
        </div>
        <div>
          <div className="flex gap-x-2">
            <label className="mb-1">Gender:</label>
            <div className="flex items-center justify-center">
              <div className="flex gap-8">
                {['Male', 'Female'].map((val) => (
                  <label
                    key={val}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      {...register('gender')}
                      type="radio"
                      name="gender"
                      value={val}
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <ErrorMessage message={errors.gender?.message} />
        </div>
        <div className="space-x-2">
          <label htmlFor="experience" className="mb-1">
            Experience:
          </label>
          <select
            {...register('experience')}
            id="experience"
            className="text-black p-1 rounded-md"
          >
            {['Select value', '1 year', '2 years', '3 years'].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          <ErrorMessage message={errors.experience?.message} />
        </div>
        <FormFooter />
      </form>
    </div>
  );
}

export default JobInfo;
