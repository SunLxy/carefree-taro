import React from 'react';
import { ContextProps, ContextStyleProps } from './interface';

export const FormContext = React.createContext<ContextProps>({});
export const useFormContext = () => React.useContext(FormContext);

export const FormStyleContext = React.createContext<ContextStyleProps>({});
export const useFormStyleContext = () => React.useContext(FormStyleContext);

export const FormParentNameContext = React.createContext<string | number>(undefined);
export const useFormParentNameContext = () => React.useContext(FormParentNameContext);
