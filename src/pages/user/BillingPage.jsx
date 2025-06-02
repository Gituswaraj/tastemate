import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const BillingPage = () => {
  const { cartItems, getCartTotal, getTax, getTotalWithTax, clearCart } = useCart();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('');
  const [orderId, setOrderId] = useState('');

  const subtotal = getCartTotal();
  const taxAmount = getTax();
  const totalAmount = getTotalWithTax();

  useEffect(() => {
    // Optionally, pre-fill user details if available from a user profile store
    // For now, we'll leave it empty for manual input
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    // Simulate distance-based delivery time
    const distance = Math.floor(Math.random() * 20) + 5; // Random distance between 5-25 km
    const timePerKm = 2; // minutes per km
    const estimatedTime = distance * timePerKm;
    const deliveryEstimate = `${estimatedTime - 5}-${estimatedTime + 5} minutes`;
    setEstimatedDeliveryTime(deliveryEstimate);

    const newOrderId = `ORD${Date.now()}`;
    setOrderId(newOrderId);

    const orderDetails = {
      orderId: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: cartItems,
      subtotal: subtotal,
      tax: taxAmount,
      total: totalAmount,
      deliveryAddress: userDetails.address,
      estimatedDelivery: deliveryEstimate,
      userDetails: userDetails,
    };

    // Save order to local storage
    const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, orderDetails]));

    // Clear the cart after placing the order
    clearCart();

    setShowConfirmation(true);
  };

  const handleConfirmOrder = () => {
    navigate('/user/order-summary', { state: { orderId: orderId } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Billing Details</h1>

      {/* Selected Items Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between border-b py-1">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs.{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 text-right">
          <p>Subtotal: Rs.{subtotal.toFixed(2)}</p>
          <p>Tax: Rs.{taxAmount.toFixed(2)}</p>
          <p className="text-xl font-bold">Total: Rs.{totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* User Details Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Information</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Current Location (Placeholder)</label>
            <input
              type="text"
              id="location"
              name="location"
              value="Auto-detected: 123 Current St, City, Country"
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Delivery Route Map (Placeholder)</label>
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
              Map Placeholder
            </div>
          </div>
        </form>
      </div>

      {/* Order Now Button */}
      <div className="text-right">
        <button
          onClick={handlePlaceOrder}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Place Order
        </button>
      </div>

      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
            <p className="text-lg text-gray-700 mb-2">Your order has been successfully placed.</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Estimated Delivery:</strong> {estimatedDeliveryTime}</p>
            <div className="mb-6 text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Details:</h3>
              <ul className="list-disc list-inside mb-2">
                {cartItems.map(item => (
                  <li key={item.id} className="text-gray-700">{item.name} x {item.quantity} - Rs.{(item.price * item.quantity).toFixed(2)}</li>
                ))}
              </ul>
              <p className="text-gray-700"><strong>Total:</strong> Rs.{totalAmount.toFixed(2)}</p>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out"
            >
              View Order Summary
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;