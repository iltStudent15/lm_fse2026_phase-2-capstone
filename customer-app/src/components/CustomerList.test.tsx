import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CustomerList from './CustomerList';
import type { Customer } from '../types/customer';

const customers: Customer[] = [
  {
    id: 1,
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '555-0101',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
  },
  {
    id: 2,
    name: 'James Chen',
    email: 'james.chen@example.com',
    phone: '555-0102',
    address: '1600 Pennsylvania Ave',
    city: 'Washington',
    state: 'DC',
    zip: '20500',
  },
];

describe('CustomerList', () => {
  it('renders customer names', () => {
    render(
      <MemoryRouter>
        <CustomerList customers={customers} onDelete={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Maria Garcia')).toBeInTheDocument();
    expect(screen.getByText('James Chen')).toBeInTheDocument();
  });

  it('shows empty state when there are no customers', () => {
    render(
      <MemoryRouter>
        <CustomerList customers={[]} onDelete={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.getByText('No customers found.')).toBeInTheDocument();
  });

  it('calls delete callback with correct id', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <MemoryRouter>
        <CustomerList customers={customers} onDelete={onDelete} />
      </MemoryRouter>,
    );

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    await user.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it('renders edit links with correct routes', () => {
    render(
      <MemoryRouter>
        <CustomerList customers={customers} onDelete={() => undefined} />
      </MemoryRouter>,
    );

    const links = screen.getAllByRole('link', { name: 'Edit' });
    expect(links[0]).toHaveAttribute('href', '/edit/1');
    expect(links[1]).toHaveAttribute('href', '/edit/2');
  });
});
