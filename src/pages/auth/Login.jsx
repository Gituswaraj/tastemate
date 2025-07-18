import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import TestComponent from '../../components/TestComponent';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setSession } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // For demo purposes, we'll simulate a successful login
      // In a real app, you would use Supabase authentication here
      
      // Mock user data
      const mockUser = {
        id: '1',
        email: formData.email,
        role: formData.email.includes('admin') ? 'admin' : 'user',
        name: 'Demo User'
      };
      
      console.log('Setting user in auth store:', mockUser);
      
      // Set user in auth store
      setUser(mockUser);
      setSession({ token: 'mock-token' });
      
      // Add a small delay before redirecting
      setTimeout(() => {
        // Redirect based on role
        if (mockUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
        
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-gradient text-4xl font-bold mb-2">TasteMate</h1>
          <h2 className="text-2xl font-semibold text-neutral-800 mb-3">Welcome back</h2>
          <p className="text-neutral-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Sign up now
            </Link>
          </p>
        </div>
        
        <div className="card">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                <div className="text-sm text-red-600 font-medium">{error}</div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700">Password</label>
                  <a href="#" className="text-xs text-primary-600 hover:text-primary-500 transition-colors">Forgot password?</a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-field"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;