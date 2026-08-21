import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StoreProvider>
  );
}
