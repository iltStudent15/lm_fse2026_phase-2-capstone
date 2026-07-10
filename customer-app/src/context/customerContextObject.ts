import { createContext } from 'react';
import type { Customer, CustomerFormData } from '../types/customer';

export type CustomerContextValue = {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  addCustomer: (formData: CustomerFormData) => Promise<void>;
  updateCustomer: (customer: Customer) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
};

export const CustomerContext = createContext<CustomerContextValue | null>(null);
