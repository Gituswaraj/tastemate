import { NavLink, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  ReceiptPercentIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const userNavItems = [
    { name: 'Home', icon: HomeIcon, path: '/user' },
    { name: 'Food Menu', icon: ClipboardDocumentListIcon, path: '/user/menu' },
    { name: 'Meal Planner', icon: CalendarDaysIcon, path: '/user/meal-planner' },
    { name: 'AI Chatbot', icon: ChatBubbleLeftRightIcon, path: '/user/chatbot' },

    { name: 'Preferences', icon: Cog6ToothIcon, path: '/user/preferences' },
    { name: 'Facility', icon: BuildingOfficeIcon, path: '/user/facility' },
    { name: 'Order History', icon: ReceiptPercentIcon, path: '/user/history' },
    { name: 'Contact Us', icon: ChatBubbleLeftRightIcon, path: '/user/contact' }
    
  ];

  const adminNavItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/admin' },
    { name: 'Users', icon: UserGroupIcon, path: '/admin/users' },
    { name: 'Menu Management', icon: ClipboardDocumentListIcon, path: '/admin/menu' },
    { name: 'Analytics', icon: ChartBarIcon, path: '/admin/analytics' }
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-neutral-100 bg-white pt-5">
        <div className="flex flex-grow flex-col">
          <div className="px-4 mb-6">
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2">Menu</div>
          </div>
          <nav className="flex-1 space-y-1 px-3 pb-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-600'
                  }`
                }
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200"
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="px-3 pb-5">
            <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-none">
              <div className="text-sm font-medium text-primary-700 mb-1">Need help?</div>
              <p className="text-xs text-neutral-600 mb-3">Contact our support team for assistance</p>
              <button className="btn-secondary text-xs py-1.5 w-full">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;