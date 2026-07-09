import { Link } from 'react-router-dom';
import type { Customer } from '../types/customer';
import './CustomerList.css';

type CustomerListProps = {
  customers: Customer[];
  onDelete: (id: number) => void;
};

export default function CustomerList({ customers, onDelete }: CustomerListProps) {
  if (customers.length === 0) {
    return <p className="list-empty">No customers found.</p>;
  }

  return (
    <div className="list-shell">
      <table className="customer-table" aria-label="Customers">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.city}</td>
              <td>
                <div className="row-actions">
                  <Link className="action-link" to={`/edit/${customer.id}`}>
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="action-delete"
                    onClick={() => onDelete(customer.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
