import React from 'react';
import { ContextStyleProps } from './interface';

export const FormStyleContext = React.createContext<ContextStyleProps>({});
export const useFormStyleContext = () => React.useContext(FormStyleContext);
