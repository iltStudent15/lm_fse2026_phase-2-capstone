import { useEffect, useState } from 'react';
import type { Customer, CustomerFormData } from '../types/customer';

const API_BASE = '/api/customers';

export function useCustomerApi() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCustomers() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE);
      if (!response.ok) {
        throw new Error(`Failed to fetch customers (${response.status})`);
      }
      const data: Customer[] = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function addCustomer(formData: CustomerFormData) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to add customer (${response.status})`);
      }
      await loadCustomers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      setLoading(false);
    }
  }

  async function updateCustomer(customer: Customer) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/${customer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (!response.ok) {
        throw new Error(`Failed to update customer (${response.status})`);
      }
      await loadCustomers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      setLoading(false);
    }
  }

  async function deleteCustomer(id: number) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete customer (${response.status})`);
      }
      await loadCustomers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
      setLoading(false);
    }
  }

  return { customers, loading, error, loadCustomers, addCustomer, updateCustomer, deleteCustomer };
}
