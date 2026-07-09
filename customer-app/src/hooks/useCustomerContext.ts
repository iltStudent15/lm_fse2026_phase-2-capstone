import { useContext } from 'react';
import { CustomerContext } from '../context/customerContextObject';

export function useCustomerContext() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error('useCustomerContext must be used inside CustomerProvider');
  }

  return context;
}
