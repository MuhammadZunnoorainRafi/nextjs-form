'use client';
import { BasicPersonalInfoType } from '@/lib/types/BasicFormType/basic-form.type';
import React from 'react';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicPersonalInfoSchema } from '@/lib/schemas/BasicFormSchema/basic-form.schema';
import { useForm } from 'react-hook-form';
import FormFooter from '@/components/shared/FormFooter';
import { useAppContext } from '@/context/AppContext';

function PersonalInfo() {
  const { setCurrentStep, updateFormValues } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicPersonalInfoType>({
    resolver: zodResolver(BasicPersonalInfoSchema),
  });

  const formSubmit = (formdata: BasicPersonalInfoType) => {
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
          <label htmlFor="name" className="mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 p-2 rounded-md outline-none text-black focus:ring-1 focus:ring-blue-700 border-2 border-gray-700 w-full focus:border-blue-700 "
          />
          <ErrorMessage message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 p-2 rounded-md outline-none text-black focus:ring-1 focus:ring-blue-700 border-2 border-gray-700 w-full focus:border-blue-700 "
          />
          <ErrorMessage message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="age" className="mb-1">
            Age
          </label>
          <input
            type="number"
            id="age"
            {...register('age', { valueAsNumber: true })}
            className="mt-1 p-2 rounded-md outline-none text-black focus:ring-1 focus:ring-blue-700 border-2 border-gray-700 w-full focus:border-blue-700 "
          />
          <ErrorMessage message={errors.age?.message} />
        </div>
        <FormFooter />
      </form>
    </div>
  );
}

export default PersonalInfo;
