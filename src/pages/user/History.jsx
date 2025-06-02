import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrderHistory(storedOrders);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-display font-bold text-gradient">Order History</h2>
      <div className="card p-6">
        {orderHistory.length === 0 ? (
          <p className="text-neutral-600">You have no past orders.</p>
        ) : (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <div key={order.orderId} className="border border-neutral-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-neutral-800">Order ID: {order.orderId}</h3>
                  <span className="text-sm text-neutral-500">{order.date}</span>
                </div>
                <p className="text-neutral-600 mb-1">Total: Rs.{order.total.toFixed(2)}</p>
                <p className="text-neutral-600 mb-2">Items: {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
                <Link
                  to={`/user/order-summary`}
                  state={{ orderId: order.orderId }}
                  className="text-primary-600 hover:underline text-sm"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;