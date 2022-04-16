import React from 'react';
import { CheckRadioContextProps } from './interface';
export const CheckRadioContext = React.createContext<CheckRadioContextProps>({});
export const useCheckRadioContext = () => React.useContext(CheckRadioContext);
