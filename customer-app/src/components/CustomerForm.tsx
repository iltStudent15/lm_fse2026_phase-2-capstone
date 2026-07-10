import { useState } from 'react';
import type { Customer, CustomerFormData } from '../types/customer';
import './CustomerForm.css';

type CustomerFormProps = {
  initialData?: Customer;
  onSubmit: (formData: CustomerFormData) => Promise<void>;
  onCancel: () => void;
};

type FormErrors = Partial<Record<keyof CustomerFormData, string>>;

export default function CustomerForm({ initialData, onSubmit, onCancel }: CustomerFormProps) {
  const isEditMode = initialData !== undefined;

  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialData?.name ?? '',
    email: initialData?.email ?? '',
    phone: initialData?.phone ?? '',
    address: initialData?.address ?? '',
    city: initialData?.city ?? '',
    state: initialData?.state ?? '',
    zip: initialData?.zip ?? '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!formData.name.trim()) {
      next.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      next.phone = 'Phone is required.';
    }

    return next;
  }

  function handleChange(field: keyof CustomerFormData, value: string) {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="customer-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="form-field" htmlFor="name">
          <span>Name *</span>
          <input
            id="name"
            name="name"
            className={errors.name ? 'form-input is-invalid' : 'form-input'}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>

        <label className="form-field" htmlFor="email">
          <span>Email *</span>
          <input
            id="email"
            name="email"
            className={errors.email ? 'form-input is-invalid' : 'form-input'}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>

        <label className="form-field" htmlFor="phone">
          <span>Phone *</span>
          <input
            id="phone"
            name="phone"
            className={errors.phone ? 'form-input is-invalid' : 'form-input'}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          {errors.phone && <small className="field-error">{errors.phone}</small>}
        </label>

        <label className="form-field" htmlFor="address">
          <span>Address</span>
          <input
            id="address"
            name="address"
            className="form-input"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </label>

        <label className="form-field" htmlFor="city">
          <span>City</span>
          <input
            id="city"
            name="city"
            className="form-input"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </label>

        <label className="form-field" htmlFor="state">
          <span>State</span>
          <input
            id="state"
            name="state"
            className="form-input"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
        </label>

        <label className="form-field" htmlFor="zip">
          <span>ZIP</span>
          <input
            id="zip"
            name="zip"
            className="form-input"
            value={formData.zip}
            onChange={(e) => handleChange('zip', e.target.value)}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="button-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="button-primary" disabled={submitting}>
          {submitting ? 'Saving...' : isEditMode ? 'Update Customer' : 'Add Customer'}
        </button>
      </div>
    </form>
  );
}
