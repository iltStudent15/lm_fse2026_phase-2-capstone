import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import { CustomerProvider } from './context/CustomerContext';
import ErrorBoundary from './components/ErrorBoundary';

const baseUrl = import.meta.env.BASE_URL
const routerBasename =
  baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')

function App() {
  return (
    <CustomerProvider>
      <BrowserRouter basename={routerBasename}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ListPage />} />
              <Route path="add" element={<AddPage />} />
              <Route path="edit/:id" element={<EditPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </CustomerProvider>
  );
}

export default App;
