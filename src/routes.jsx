import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TestPage from './pages/TestPage';
import UserDashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import FoodMenu from './pages/user/FoodMenu';
import AddToCart from './pages/user/AddToCart';
import CartPage from './pages/user/CartPage';
import BillingPage from './pages/user/BillingPage';
import OrderSummaryPage from './pages/user/OrderSummaryPage';
import Preferences from './pages/user/Preferences';
import FacilitySettings from './pages/user/FacilitySettings';
import History from './pages/user/History';
import ContactUs from './pages/user/ContactUs';
import MealPlanner from './pages/user/MealPlanner';
import Chatbot from './components/common/Chatbot';
import UserProfilePage from './pages/user/UserProfilePage';

import UserManagement from './pages/admin/UserManagement';
import MenuManagement from './pages/admin/MenuManagement';
import Analytics from './pages/admin/Analytics';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorPage from './components/common/ErrorPage';

// Define routes with proper authentication flow
const routes = createBrowserRouter([
  // Public routes (login, register, test) are outside the App component
  { 
    path: 'login', 
    element: <Login /> 
  },
  { 
    path: 'register', 
    element: <Register /> 
  },
  {
    path: 'test',
    element: <TestPage />
  },
  
  // Protected routes inside App component
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        path: '/', 
        element: <Navigate to="/user" replace /> 
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user/menu',
        element: (
          <ProtectedRoute requiredRole="user">
            <FoodMenu />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/add-to-cart',
        element: (
          <ProtectedRoute requiredRole="user">
            <AddToCart />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/cart',
        element: (
          <ProtectedRoute requiredRole="user">
            <CartPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/billing',
        element: (
          <ProtectedRoute requiredRole="user">
            <BillingPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/order-summary',
        element: (
          <ProtectedRoute requiredRole="user">
            <OrderSummaryPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/preferences',
        element: (
          <ProtectedRoute requiredRole="user">
            <Preferences />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/facility',
        element: (
          <ProtectedRoute requiredRole="user">
            <FacilitySettings />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/history',
        element: (
          <ProtectedRoute requiredRole="user">
            <History />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/contact',
        element: (
          <ProtectedRoute requiredRole="user">
            <ContactUs />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/meal-planner',
        element: (
          <ProtectedRoute requiredRole="user">
            <MealPlanner />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/chatbot',
        element: (
          <ProtectedRoute requiredRole="user">
            <Chatbot />
          </ProtectedRoute>
        )
      },
      {
        path: 'user/profile',
        element: (
          <ProtectedRoute requiredRole="user">
            <UserProfilePage />
          </ProtectedRoute>
        )
      },

      {
        path: 'admin',
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute requiredRole="admin">
            <UserManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/menu',
        element: (
          <ProtectedRoute requiredRole="admin">
            <MenuManagement />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/analytics',
        element: (
          <ProtectedRoute requiredRole="admin">
            <Analytics />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

export default routes;