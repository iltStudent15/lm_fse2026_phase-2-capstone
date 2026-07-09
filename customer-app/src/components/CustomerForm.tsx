import { useMemo, useState } from 'react';
import type { Customer, CustomerFormData } from '../types/customer';
import './CustomerForm.css';

type CustomerFormProps = {
  initialData?: Customer;
  onSubmit: (formData: CustomerFormData) => Promise<void>;
  onCancel: () => void;
};

type CustomerFormErrors = Partial<Record<keyof CustomerFormData, string>>;

const EMPTY_FORM: CustomerFormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
};

export default function CustomerForm({ initialData, onSubmit, onCancel }: CustomerFormProps) {
  const mode = initialData ? 'edit' : 'add';

  const [formData, setFormData] = useState<CustomerFormData>(() => {
    if (!initialData) {
      return EMPTY_FORM;
    }

    return {
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone,
      address: initialData.address,
      city: initialData.city,
      state: initialData.state,
      zip: initialData.zip,
    };
  });

  const [errors, setErrors] = useState<CustomerFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const submitLabel = useMemo(
    () => (mode === 'edit' ? 'Update Customer' : 'Add Customer'),
    [mode],
  );

  const validate = (data: CustomerFormData): CustomerFormErrors => {
    const nextErrors: CustomerFormErrors = {};

    if (!data.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!data.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        nextErrors.email = 'Enter a valid email address.';
      }
    }

    if (!data.phone.trim()) {
      nextErrors.phone = 'Phone is required.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof CustomerFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(formData);
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
  };

  const getFieldClassName = (field: keyof CustomerFormData) =>
    errors[field] ? 'form-input is-invalid' : 'form-input';

  return (
    <form className="customer-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="form-field">
          <span>Name *</span>
          <input
            className={getFieldClassName('name')}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>

        <label className="form-field">
          <span>Email *</span>
          <input
            className={getFieldClassName('email')}
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>

        <label className="form-field">
          <span>Phone *</span>
          <input
            className={getFieldClassName('phone')}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          {errors.phone && <small className="field-error">{errors.phone}</small>}
        </label>

        <label className="form-field">
          <span>Address</span>
          <input
            className={getFieldClassName('address')}
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </label>

        <label className="form-field">
          <span>City</span>
          <input
            className={getFieldClassName('city')}
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </label>

        <label className="form-field">
          <span>State</span>
          <input
            className={getFieldClassName('state')}
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
        </label>

        <label className="form-field">
          <span>ZIP</span>
          <input
            className={getFieldClassName('zip')}
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
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
