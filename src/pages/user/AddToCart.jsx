import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]); // Assuming menu items are fetched here or passed as props
  const navigate = useNavigate();

  // Fetch menu items (placeholder)
  useEffect(() => {
    // In a real application, you would fetch menu items from your backend
    const fetchedMenuItems = [
      { id: 1, name: 'Burger', price: 10.99, quantity: 0, image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Burger' },
      { id: 2, name: 'Pizza', price: 15.49, quantity: 0, image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Pizza' },
      { id: 3, name: 'Fries', price: 3.99, quantity: 0, image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Fries' },
    ];
    setMenuItems(fetchedMenuItems);
  }, []);

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      } else {
        return prevItems.filter(cartItem => cartItem.id !== item.id);
      }
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Food Menu Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Delicious Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="p-6">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{item.name}</h2>
                <p className="text-gray-700 text-xl font-bold mb-4">Rs.{item.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Cart Section */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is currently empty. Start adding some delicious items!</p>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ul>
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between items-center border-b border-gray-200 py-4 last:border-b-0">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div className="flex-grow">
                      <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                      <p className="text-gray-600">Rs.{item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t-2 border-gray-300 flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">Rs.{calculateTotal()}</span>
            </div>
            <div className="mt-8 text-right">
              <button
                onClick={() => navigate('/user/billing')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AddToCart;