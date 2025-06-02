import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
  const { theme } = useTheme();
    return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-200">
          <div className="max-w-7xl mx-auto">
            <div className="card shadow-card border-none backdrop-blur-sm">
              {children || <Outlet />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;