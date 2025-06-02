import { Outlet } from 'react-router-dom';
import { UserGroupIcon, ClipboardDocumentListIcon, ChartBarIcon, ClockIcon, CogIcon, BellAlertIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const stats = [
    {
      name: 'Total Users',
      value: '2,451',
      icon: UserGroupIcon,
      change: '+3.2%',
      changeType: 'positive',
      description: 'Active platform users'
    },
    {
      name: 'Active Orders',
      value: '89',
      icon: ClipboardDocumentListIcon,
      change: '+2.5%',
      changeType: 'positive',
      description: 'Orders in progress'
    },
    {
      name: 'User Satisfaction',
      value: '94.2%',
      icon: ChartBarIcon,
      change: '+1.2%',
      changeType: 'positive',
      description: 'Based on user feedback'
    }
  ];
  
  const recentAlerts = [
    { id: 1, title: 'System update required', description: 'New version available', time: '1 hour ago', priority: 'high', icon: CogIcon },
    { id: 2, title: 'New user registrations', description: '15 new users today', time: '3 hours ago', priority: 'medium', icon: UserGroupIcon },
    { id: 3, title: 'Order processing peak', description: 'Higher than usual volume', time: '5 hours ago', priority: 'medium', icon: ClipboardDocumentListIcon },
  ];
  
  const performanceMetrics = [
    { id: 1, name: 'System Response', value: '98.7%', trend: 'up', description: 'Average uptime' },
    { id: 2, name: 'Order Fulfillment', value: '96.3%', trend: 'up', description: 'Completion rate' },
    { id: 3, name: 'User Growth', value: '+12.8%', trend: 'up', description: 'Month over month' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-gradient">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-500">Last updated:</span>
          <span className="text-sm font-medium text-neutral-700 flex items-center">
            <ClockIcon className="h-4 w-4 mr-1 text-primary-500" />
            Just now
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="card overflow-hidden hover:shadow-card transition-all duration-300 border border-neutral-100 hover:border-primary-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-xl bg-primary-50">
                  <stat.icon className="h-6 w-6 text-primary-500" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-sm font-medium text-neutral-500 truncate">{stat.name}</h3>
                  <p className="text-xl font-bold text-neutral-800 mt-1">{stat.value}</p>
                  <p className="text-xs text-neutral-400 mt-1">{stat.description}</p>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-100">
              <div className="text-sm">
                <span
                  className={`font-medium flex items-center ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-500'}`}
                >
                  {stat.changeType === 'positive' && <span className="inline-block h-2 w-2 rounded-full mr-1 bg-green-500"></span>}
                  {stat.changeType === 'negative' && <span className="inline-block h-2 w-2 rounded-full mr-1 bg-red-500"></span>}
                  {stat.change}
                </span>
                <span className="text-xs text-neutral-400 ml-1">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-neutral-800">System Alerts</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  <BellAlertIcon className="h-3 w-3 mr-1" />
                  {recentAlerts.length} new
                </span>
              </div>
              <div className="divide-y divide-neutral-100">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="py-4 flex items-start">
                    <div className={`flex-shrink-0 p-2 rounded-lg mr-4 ${alert.priority === 'high' ? 'bg-red-50' : 'bg-primary-50'}`}>
                      <alert.icon className={`h-5 w-5 ${alert.priority === 'high' ? 'text-red-500' : 'text-primary-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-neutral-800">{alert.title}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${alert.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-primary-100 text-primary-800'}`}>
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">{alert.description}</p>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" /> {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card border border-neutral-100">
          <div className="p-6">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-700">{metric.name}</p>
                    <p className="text-xs text-neutral-500">{metric.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-neutral-800 mr-2">{metric.value}</span>
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <button className="btn-secondary w-full">View Full Report</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border border-neutral-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;