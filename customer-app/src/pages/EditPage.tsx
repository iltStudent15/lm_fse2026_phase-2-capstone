import { useParams } from 'react-router-dom';

export default function EditPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2>Edit Customer</h2>
      <p>Edit form for customer ID: <strong>{id}</strong> will be displayed here.</p>
    </div>
  );
}
