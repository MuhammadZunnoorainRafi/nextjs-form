import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

enum Gender {
  Male,
  Female,
}

enum JobTitle {
  Engineer,
  Doctor,
  Teacher,
}

enum Experience {
  '1 Year',
  '2 Years',
  '3 Years',
}

type FormValuesType = {
  name: string;
  email: string;
  age: number;
  jobTitle: JobTitle;
  gender: Gender;
  experience: Experience;
  presentAddress: string;
  permanentAddress: string;
};

type UpdateFormValue = Partial<FormValuesType>;

type AppContextType = {
  formValues: FormValuesType | object;
  updateFormValues: (object: UpdateFormValue) => void;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState<FormValuesType>(Object);

  const updateFormValues = (object: UpdateFormValue) => {
    setFormValues((prev) => ({ ...prev, ...object }));
  };

  return (
    <AppContext.Provider
      value={{ formValues, updateFormValues, currentStep, setCurrentStep }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('context must be used within the context provider');
  }
  return context as AppContextType;
};
