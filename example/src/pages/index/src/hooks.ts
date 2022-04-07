import React from 'react';
import { ContextProps } from './interface';

export const FormContext = React.createContext<ContextProps>({});

export const useFormContent = () => React.useContext(FormContext);
