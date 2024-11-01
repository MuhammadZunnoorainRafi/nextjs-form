'use client';
import AddressInfo from '@/components/forms/BasicForm/AddressInfo';
import JobInfo from '@/components/forms/BasicForm/JobInfo';
import PersonalInfo from '@/components/forms/BasicForm/PersonalInfo';
import Submitted from '@/components/forms/BasicForm/Submitted';
import Stepper from '@/components/shared/Stepper';
import { useAppContext } from '@/context/AppContext';

function Basic() {
  const { currentStep } = useAppContext();
  return (
    <div className="flex flex-col gap-y-5 items-center justify-center">
      <Stepper />
      {currentStep === 0 ? (
        <Submitted />
      ) : currentStep === 1 ? (
        <PersonalInfo />
      ) : currentStep === 2 ? (
        <JobInfo />
      ) : (
        <AddressInfo />
      )}
    </div>
  );
}

export default Basic;
