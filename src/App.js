import { Outlet, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import useAuthStore from './store/authStore';
import { CartProvider } from './context/CartContext';

function App() {
  // Get authentication state from the store
  const { isAuthenticated } = useAuthStore();
  
  console.log('App rendering, isAuthenticated:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('Authenticated, rendering MainLayout');
  return (
    <CartProvider>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </CartProvider>
  );
}

export default App;
