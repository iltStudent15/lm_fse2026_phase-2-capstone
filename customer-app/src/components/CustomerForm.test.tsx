import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import CustomerForm from './CustomerForm';
import type { Customer } from '../types/customer';

describe('CustomerForm', () => {
  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(async () => undefined);

    render(<CustomerForm onSubmit={onSubmit} onCancel={() => undefined} />);

    await user.click(screen.getByRole('button', { name: 'Add Customer' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Phone is required.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(async () => undefined);

    render(<CustomerForm onSubmit={onSubmit} onCancel={() => undefined} />);

    await user.type(screen.getByLabelText('Name *'), 'New User');
    await user.type(screen.getByLabelText('Email *'), 'new.user@example.com');
    await user.type(screen.getByLabelText('Phone *'), '555-1234');
    await user.type(screen.getByLabelText('Address'), '123 Main St');
    await user.type(screen.getByLabelText('City'), 'Austin');
    await user.type(screen.getByLabelText('State'), 'TX');
    await user.type(screen.getByLabelText('ZIP'), '78701');

    await user.click(screen.getByRole('button', { name: 'Add Customer' }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'New User',
      email: 'new.user@example.com',
      phone: '555-1234',
      address: '123 Main St',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
    });
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<CustomerForm onSubmit={async () => undefined} onCancel={onCancel} />);

    await user.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('pre-fills fields in edit mode', () => {
    const initialData: Customer = {
      id: 9,
      name: 'Edited User',
      email: 'edited.user@example.com',
      phone: '555-9876',
      address: '77 Updated Ave',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
    };

    render(
      <CustomerForm
        initialData={initialData}
        onSubmit={async () => undefined}
        onCancel={() => undefined}
      />,
    );

    expect(screen.getByLabelText('Name *')).toHaveValue('Edited User');
    expect(screen.getByLabelText('Email *')).toHaveValue('edited.user@example.com');
    expect(screen.getByLabelText('Phone *')).toHaveValue('555-9876');
    expect(screen.getByRole('button', { name: 'Update Customer' })).toBeInTheDocument();
  });
});
