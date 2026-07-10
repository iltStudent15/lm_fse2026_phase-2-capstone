import { useCustomerApi } from '../hooks/useCustomerApi';
import { CustomerContext } from './customerContextObject';
import type { CustomerContextValue } from './customerContextObject';

type CustomerProviderProps = {
  children: React.ReactNode;
};

export function CustomerProvider({ children }: CustomerProviderProps) {
  const { customers, loading, error, loadCustomers, addCustomer, updateCustomer, deleteCustomer } = useCustomerApi();

  const value: CustomerContextValue = {
    customers,
    loading,
    error,
    refreshCustomers: () => { loadCustomers(); },
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}
