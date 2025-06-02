import { Outlet } from 'react-router-dom';
import { ClipboardDocumentListIcon, Cog6ToothIcon, HomeIcon, ClockIcon, ChartBarIcon, BellIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const stats = [
    {
      name: 'Food Orders',
      value: '12',
      icon: ClipboardDocumentListIcon,
      change: '+4.75%',
      changeType: 'positive',
      description: 'Total orders this month'
    },
    {
      name: 'Preferences Updated',
      value: '3 days ago',
      icon: Cog6ToothIcon,
      change: 'Last updated',
      changeType: 'neutral',
      description: 'Your taste preferences'
    },
    {
      name: 'Room Settings',
      value: 'Configured',
      icon: HomeIcon,
      change: 'Active',
      changeType: 'positive',
      description: 'Smart home integration'
    }
  ];
  
  const recentActivity = [
    { id: 1, title: 'New meal recommendation', description: 'Based on your preferences', time: '2 hours ago', icon: BellIcon },
    { id: 2, title: 'Weekly nutrition report', description: 'Your eating habits summary', time: '1 day ago', icon: ChartBarIcon },
    { id: 3, title: 'Smart fridge sync', description: 'Inventory updated successfully', time: '2 days ago', icon: HomeIcon },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-gradient">Your TasteMate Dashboard</h1>
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
                  className={`font-medium flex items-center ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-500' : 'text-neutral-500'}`}
                >
                  {stat.changeType === 'positive' && <span className="inline-block h-2 w-2 rounded-full mr-1 bg-green-500"></span>}
                  {stat.changeType === 'negative' && <span className="inline-block h-2 w-2 rounded-full mr-1 bg-red-500"></span>}
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-lg font-bold text-neutral-800 mb-4">Recent Activity</h2>
              <div className="divide-y divide-neutral-100">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="py-4 flex items-start">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary-50 mr-4">
                      <activity.icon className="h-5 w-5 text-primary-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-800">{activity.title}</p>
                      <p className="text-xs text-neutral-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 border-none">
          <div className="p-6">
            <h2 className="text-lg font-bold text-primary-800 mb-4">Meal Planner</h2>
            <p className="text-sm text-neutral-700 mb-6">Plan your meals based on your preferences and available ingredients.</p>
            <a href="/user/meal-planner" className="block">
              <button className="btn-primary w-full">Create Meal Plan</button>
            </a>
          </div>
        </div>
      </div>

      <div className="card border border-neutral-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;