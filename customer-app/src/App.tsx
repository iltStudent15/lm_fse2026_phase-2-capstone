import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import { CustomerProvider } from './context/CustomerContext';

function App() {
  return (
    <CustomerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ListPage />} />
            <Route path="add" element={<AddPage />} />
            <Route path="edit/:id" element={<EditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomerProvider>
  );
}

export default App;
