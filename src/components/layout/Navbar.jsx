import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import ShoppingCartIcon from '@heroicons/react/24/outline/ShoppingCartIcon';
import { useCart } from '../../context/CartContext';
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowRightOnRectangleIcon, SunIcon, MoonIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import useAuthStore from '../../store/authStore';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const { cartItems } = useCart();
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Disclosure as="nav" className="bg-white shadow-soft sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-xl font-bold text-gradient">TasteMate</Link>
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Toggle theme</span>
                  {theme === 'dark' ? (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
                <Link
                  to="/user/chatbot"
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors ml-3"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">AI Chatbot</span>
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                <Link
                  to="/user/cart"
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors ml-3"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Shopping Cart</span>
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {totalCartItems}
                    </span>
                  )}
                  <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
                </Link>
                <Link
                  to="/user/history"
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors ml-3"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Order History</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </Link>
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="flex items-center gap-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 px-2 py-1 hover:bg-neutral-50 transition-colors">
                    <UserCircleIcon className="h-8 w-8 text-primary-500" />
                    <span className="font-medium text-neutral-700">{user?.name || 'User'}</span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-2 shadow-soft border border-neutral-100 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user/profile"
                            className={`${active ? 'bg-neutral-50' : ''} flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:text-primary-600 transition-colors`}
                          >
                            <UserCircleIcon className="h-5 w-5" />
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? 'bg-neutral-50' : ''} flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-neutral-700 hover:text-primary-600 transition-colors`}
                            onClick={handleLogout}
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors mr-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Toggle theme</span>
                  {theme === 'dark' ? (
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MoonIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
                <Link
                  to="/user/chatbot"
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors mr-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">AI Chatbot</span>
                  <ChatBubbleBottomCenterTextIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                <Link
                  to="/user/cart"
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors mr-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Shopping Cart</span>
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {totalCartItems}
                    </span>
                  )}
                  <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
                </Link>
                <Link
                  to="/user/history"
                  className="relative rounded-full bg-white p-1 text-neutral-500 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors mr-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Order History</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </Link>
                <Disclosure.Button className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-500 hover:bg-neutral-50 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2 px-4">
              <div className="border-b border-neutral-100 pb-2 mb-2">
                <div className="text-sm font-medium text-neutral-500">Signed in as:</div>
                <div className="text-base font-medium text-neutral-800">{user?.name || 'User'}</div>
                <div className="text-sm text-neutral-500">{user?.email || 'user@example.com'}</div>
              </div>
              <Disclosure.Button
                as={Link}
                to="/user/profile"
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 rounded-xl transition-colors w-full"
              >
                <UserCircleIcon className="h-5 w-5" />
                Your Profile
              </Disclosure.Button>
              <button
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 rounded-xl transition-colors w-full"
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Sign out
              </button>
              <Disclosure.Button
                as={Link}
                to="/user/cart"
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 rounded-xl transition-colors w-full"
              >
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {totalCartItems}
                  </span>
                )}
                <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
                Cart
              </Disclosure.Button>
              <Disclosure.Button
                as={Link}
                to="/user/history"
                className="flex items-center gap-2 px-4 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 rounded-xl transition-colors w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Order History
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;