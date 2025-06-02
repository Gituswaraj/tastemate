import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getTax, getTotalWithTax } = useCart();

  const subtotal = getCartTotal();
  const tax = getTax();
  const total = getTotalWithTax();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-neutral-800 mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-neutral-600 text-lg mb-4">Your cart is empty.</p>
          <Link to="/user/food-menu" className="bg-primary-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-600 transition-colors duration-300">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white shadow-soft rounded-xl p-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b border-neutral-200 py-4 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-neutral-800">{item.name}</h2>
                  <p className="text-neutral-600">Rs.{item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors duration-200"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="mx-3 text-lg font-medium text-neutral-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors duration-200"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="text-lg font-semibold text-neutral-800 ml-4">
                  Rs.{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-white shadow-soft rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Order Summary</h2>
            <div className="space-y-2 text-neutral-700 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>Rs.{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-neutral-200 pt-2 mt-2">
                <span>Total:</span>
                <span>Rs.{total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/user/billing"
              className="w-full block text-center bg-primary-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-600 transition-colors duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;