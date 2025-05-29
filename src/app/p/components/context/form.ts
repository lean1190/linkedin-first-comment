import { createContext } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { FormPost } from '../types';

export const FormContext = createContext<UseFormReturn<FormPost> | null>(null);
