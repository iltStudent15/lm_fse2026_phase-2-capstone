import { useCallback, useEffect, useState } from 'react';
import type { Customer, CustomerFormData } from '../types/customer';

const API_BASE = '/api/customers';

export function useCustomerApi() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const runRequest = useCallback(async <T>(request: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      return await request();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected API error';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCustomers = useCallback(async (signal?: AbortSignal) => {
    const data = await runRequest(async () => {
      const response = await fetch(API_BASE, { signal });

      if (!response.ok) {
        throw new Error(`Failed to fetch customers (${response.status})`);
      }

      const customersData: Customer[] = await response.json();
      return customersData;
    });

    setCustomers(data);
    return data;
  }, [runRequest]);

  useEffect(() => {
    const controller = new AbortController();

    loadCustomers(controller.signal).catch((err) => {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
    });

    return () => {
      controller.abort();
    };
  }, [loadCustomers]);

  const addCustomer = useCallback(async (formData: CustomerFormData) => {
    await runRequest(async () => {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add customer (${response.status})`);
      }
    });

    await loadCustomers();
  }, [loadCustomers, runRequest]);

  const updateCustomer = useCallback(async (customer: Customer) => {
    await runRequest(async () => {
      const response = await fetch(`${API_BASE}/${customer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error(`Failed to update customer (${response.status})`);
      }
    });

    await loadCustomers();
  }, [loadCustomers, runRequest]);

  const deleteCustomer = useCallback(async (id: number) => {
    await runRequest(async () => {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete customer (${response.status})`);
      }
    });

    await loadCustomers();
  }, [loadCustomers, runRequest]);

  return {
    customers,
    loading,
    error,
    loadCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
