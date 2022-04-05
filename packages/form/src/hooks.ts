import React from 'react';

export const FormContext = React.createContext({});

export const useFormContent = () => React.useContext(FormContext);
