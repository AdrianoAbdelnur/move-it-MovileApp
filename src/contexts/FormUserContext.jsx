import { createContext, useState } from "react";

export const FormUserContext = createContext();

import React from "react";

const FormUserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    goodsType: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
      weight: "",
    },
    directions: { from: "", to: "" },
    date: "",
    extraComents: "",
  });
  return (
    <FormUserContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormUserContext.Provider>
  );
};

export default FormUserProvider;
