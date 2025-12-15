// src/components/Sidebar.jsx
import React from 'react';
import { 
  FaTableColumns, 
  FaArrowRight, 
  FaSun, 
  FaCalendarWeek, 
  FaCalendarAlt, 
  FaCalendarDay,
  FaChartPie,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = ({ 
  currentUser, 
  logout, 
  viewMode, 
  setViewMode, 
  timeFilter, 
  setTimeFilter 
}) => {
  const tabs = [
    { id: 'status', label: 'Status', icon: <FaTableColumns />, view: 'kanban' },
    { id: 'future', label: 'Tasks to come', icon: <FaArrowRight />, view: 'list' },
    { id: 'today', label: 'Today', icon: <FaSun />, filter: 'today' },
    { id: 'week', label: 'This week', icon: <FaCalendarWeek />, filter: 'week' },
    { id: 'month', label: 'This month', icon: <FaCalendarAlt />, filter: 'month' },
    { id: 'year', label: 'This year', icon: <FaCalendarDay />, filter: 'year' },
    { id: 'calendar', label: 'Calendar view', icon: <FaCalendarDay />, view: 'calendar' },
  ];

  const handleTabClick = (tab) => {
    if (tab.view) setViewMode(tab.view);
    if (tab.filter) setTimeFilter(tab.filter);
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <FaChartPie className="text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Tasks</h2>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const isActive = 
              (tab.view && viewMode === tab.view) || 
              (tab.filter && timeFilter === tab.filter);
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Completion Stats Section */}
        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Completion
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Overall</span>
                <span className="font-medium">27%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">This week</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Section & Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4 p-2 rounded-lg hover:bg-gray-100">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <FaUser className="text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {currentUser.displayName || currentUser.email?.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500">{currentUser.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;