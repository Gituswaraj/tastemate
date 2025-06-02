import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const { orderId } = location.state || {};
    if (orderId) {
      const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
      const order = existingOrders.find(o => o.orderId === orderId);
      if (order) {
        setOrderDetails(order);
      } else {
        // If order not found, navigate back or show an error
        navigate('/user/history', { replace: true });
      }
    } else {
      // If no orderId in state, navigate back or show an error
      navigate('/user/history', { replace: true });
    }
  }, [location.state, navigate]);

  if (!orderDetails) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Loading Order Summary...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Details</h2>
        <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {orderDetails.orderId}</p>
        <p className="text-gray-700 mb-2"><strong>Date:</strong> {orderDetails.date}</p>
        <p className="text-gray-700 mb-2"><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
        <p className="text-gray-700 mb-2"><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Items Ordered</h2>
        <ul>
          {orderDetails.items.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b border-gray-200 py-3 last:border-b-0">
              <span className="text-lg text-gray-800">{item.name} x {item.quantity}</span>
              <span className="text-lg font-semibold text-gray-900">Rs.{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg text-gray-700">Subtotal:</span>
          <span className="text-lg font-semibold text-gray-900">Rs.{orderDetails.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg text-gray-700">Tax:</span>
          <span className="text-lg font-semibold text-gray-900">Rs.{orderDetails.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center border-t-2 border-gray-300 pt-4 mt-4">
          <span className="text-2xl font-bold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-blue-600">Rs.{orderDetails.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;