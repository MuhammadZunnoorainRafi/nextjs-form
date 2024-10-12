import { BasicPersonalInfoType } from '@/lib/types/BasicFormType/basic-form.type';
import React from 'react';
import { useForm } from 'react-hook-form';
import {} from '';
import ErrorMessage from '@/components/shared/ErrorMessage';

function PersonalInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicPersonalInfoType>({
    // resolver:zodReso
  });

  const formSubmit = (formdata: BasicPersonalInfoType) => {
    console.log(formdata);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Personal Info</h1>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register('name')} />
          {/* <ErrorMessage>{errors.name?.message}</ErrorMessage> */}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register('email')} />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" {...register('age')} />
        </div>
        <button className="inline-block ml-auto">Next</button>
      </form>
    </div>
  );
}

export default PersonalInfo;
