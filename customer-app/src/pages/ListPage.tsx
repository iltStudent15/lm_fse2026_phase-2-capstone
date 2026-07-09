import CustomerList from '../components/CustomerList';
import '../components/CustomerList.css';
import { useCustomerContext } from '../hooks/useCustomerContext';

export default function ListPage() {
  const { customers, loading, error, deleteCustomer } = useCustomerContext();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this customer?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteCustomer(id);
    } catch {
      window.alert('Unable to delete customer. Please try again.');
    }
  };

  return (
    <section>
      <h2 className="page-title">Customers</h2>
      <p className="page-subtitle">Manage customer records from the shared API-backed store.</p>
      <span className="status-chip">Total: {customers.length}</span>

      {loading && <p className="page-notice">Loading customers...</p>}
      {!loading && error && <p className="page-error">{error}</p>}
      {!loading && !error && <CustomerList customers={customers} onDelete={handleDelete} />}
    </section>
  );
}
