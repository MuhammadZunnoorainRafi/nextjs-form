import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type AppContextType = {
  formValues: {};
  updateFormValues: (object: any) => void;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState({});

  const updateFormValues = (object) => {
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
