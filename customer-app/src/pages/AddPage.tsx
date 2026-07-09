import { useNavigate } from 'react-router-dom';
import CustomerForm from '../components/CustomerForm';
import { useCustomerContext } from '../hooks/useCustomerContext';
import type { CustomerFormData } from '../types/customer';

export default function AddPage() {
  const navigate = useNavigate();
  const { addCustomer, error, loading } = useCustomerContext();

  const handleSubmit = async (formData: CustomerFormData) => {
    await addCustomer(formData);
    navigate('/');
  };

  return (
    <section>
      <h2>Add Customer</h2>

      {loading && <p className="page-notice">Saving...</p>}
      {error && <p className="page-error">{error}</p>}

      <CustomerForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </section>
  );
}
