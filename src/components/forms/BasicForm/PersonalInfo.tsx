'use client';
import { BasicPersonalInfoType } from '@/lib/types/BasicFormType/basic-form.type';
import React from 'react';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicPersonalInfoSchema } from '@/lib/schemas/BasicFormSchema/basic-form.schema';
import { useForm } from 'react-hook-form';

function PersonalInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicPersonalInfoType>({
    resolver: zodResolver(BasicPersonalInfoSchema),
  });

  const formSubmit = (formdata: BasicPersonalInfoType) => {
    console.log(formdata);
  };
  return (
    <div className="min-h-screen flex flex-col gap-3 items-center justify-center">
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
            {...register('age')}
            className="mt-1 p-2 rounded-md outline-none text-black focus:ring-1 focus:ring-blue-700 border-2 border-gray-700 w-full focus:border-blue-700 "
          />
          <ErrorMessage message={errors.age?.message} />
        </div>
        <button className="inline-block ml-auto">Next</button>
      </form>
    </div>
  );
}

export default PersonalInfo;
