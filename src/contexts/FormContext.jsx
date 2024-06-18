import { createContext, useState } from "react";

export const FormContext = createContext();

import React from "react";

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
