import ErrorMessage from '@/components/shared/ErrorMessage';
import FormFooter from '@/components/shared/FormFooter';
import { useAppContext } from '@/context/AppContext';
import { BasicAddressInfoSchema } from '@/lib/schemas/BasicFormSchema/basic-form.schema';
import { BasicAddressInfoType } from '@/lib/types/BasicFormType/basic-form.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

function AddressInfo() {
  const { setCurrentStep, updateFormValues, formValues } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicAddressInfoType>({
    resolver: zodResolver(BasicAddressInfoSchema),
    defaultValues: {
      presentAddress: formValues.presentAddress,
      permanentAddress: formValues.permanentAddress,
    },
  });

  const formSubmit = (formdata: BasicAddressInfoType) => {
    updateFormValues(formdata);
    setCurrentStep(0);
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
            Present Address:
          </label>
          <input
            type="text"
            id="present-address"
            {...register('presentAddress')}
            className="mt-1 p-2 rounded-md outline-none text-black focus:ring-1 focus:ring-blue-700 border-2 border-gray-700 w-full focus:border-blue-700 "
          />
          <ErrorMessage message={errors.presentAddress?.message} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1">
            Permanant Address:
          </label>
          <input
            type="text"
            id="permanant-address"
            {...register('permanentAddress')}
            className="mt-1 p-2 rounded-md outline-none text-black focus:ring-1 focus:ring-blue-700 border-2 border-gray-700 w-full focus:border-blue-700 "
          />
          <ErrorMessage message={errors.permanentAddress?.message} />
        </div>
        <FormFooter />
      </form>
    </div>
  );
}

export default AddressInfo;
