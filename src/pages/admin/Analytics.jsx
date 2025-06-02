import { useState } from 'react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('week');

  const stats = [
    {
      name: 'Total Orders',
      value: '156',
      change: '+12%',
      icon: ChartBarIcon
    },
    {
      name: 'Revenue',
      value: '$4,320',
      change: '+8%',
      icon: CurrencyDollarIcon
    },
    {
      name: 'Active Users',
      value: '89',
      change: '+23%',
      icon: UserGroupIcon
    },
    {
      name: 'Avg. Response Time',
      value: '2.4m',
      change: '-18%',
      icon: ClockIcon
    }
  ];

  const popularItems = [
    { name: 'Grilled Chicken Salad', orders: 45 },
    { name: 'Vegetarian Buddha Bowl', orders: 38 },
    { name: 'Quinoa Power Bowl', orders: 32 },
    { name: 'Mediterranean Wrap', orders: 28 },
    { name: 'Green Smoothie', orders: 25 }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'John Doe',
      action: 'placed an order',
      item: 'Grilled Chicken Salad',
      time: '5 minutes ago'
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'modified preferences',
      item: 'Room temperature set to 22°C',
      time: '15 minutes ago'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'requested cleaning',
      item: 'Room 204',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="input-field"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="card p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{item.value}</div>
                    <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Items</h3>
          <div className="space-y-4">
            {popularItems.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.orders} orders</div>
                </div>
                <div className="relative w-24 h-2 bg-gray-200 rounded">
                  <div
                    className="absolute left-0 top-0 h-2 bg-blue-600 rounded"
                    style={{ width: `${(item.orders / popularItems[0].orders) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, index) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {index !== recentActivity.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                          <UserGroupIcon className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                            {activity.action}
                          </div>
                          <div className="mt-0.5 text-sm text-gray-500">
                            {activity.item}
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;