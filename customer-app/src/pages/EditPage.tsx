import { useNavigate, useParams } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import { useCustomerContext } from '../hooks/useCustomerContext';
import type { Customer, CustomerFormData } from '../types/customer';

export default function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { customers, updateCustomer, loading, error } = useCustomerContext();

  const customer = customers.find((item) => item.id === Number(id));

  const handleSubmit = async (formData: CustomerFormData) => {
    if (!customer) {
      return;
    }

    const updatedCustomer: Customer = {
      id: customer.id,
      ...formData,
    };

    await updateCustomer(updatedCustomer);
    navigate('/');
  };

  if (loading && customers.length === 0) {
    return <p className="page-notice">Loading customer...</p>;
  }

  if (!customer) {
    return (
      <section>
        <h2>Edit Customer</h2>
        <p className="page-error">Customer not found.</p>
        <button type="button" className="button-secondary" onClick={() => navigate('/')}>
          Back to Customers
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2>Edit Customer</h2>

      {error && <p className="page-error">{error}</p>}

      <CustomerForm
        initialData={customer}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </section>
  );
}
