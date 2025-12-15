// src/components/Header.jsx
import React, { useState } from 'react';
import { 
  FaSort, 
  FaFont, 
  FaCalendar, 
  FaLayerGroup, 
  FaSpinner,
  FaArrowUp,
  FaArrowDown,
  FaCheck
} from 'react-icons/fa';

const Header = ({ currentUser, viewMode, setViewMode }) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortOptions = [
    { id: 'name', label: 'Name', icon: <FaFont /> },
    { id: 'deadline', label: 'Deadline', icon: <FaCalendar /> },
    { id: 'priority', label: 'Priority', icon: <FaLayerGroup /> },
    { id: 'status', label: 'Status', icon: <FaSpinner /> },
  ];

  const handleSortSelect = (option) => {
    setSortBy(option);
    setShowSortMenu(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Page title and view toggles */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {['kanban', 'list', 'calendar', 'gallery'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                  viewMode === mode 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode === 'kanban' ? 'Status' : 
                 mode === 'list' ? 'List' : 
                 mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sort and Add button */}
        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaSort />
              <span>Sort</span>
              {sortBy !== 'deadline' && (
                <span className="text-blue-600 font-medium">
                  by {sortOptions.find(o => o.id === sortBy)?.label}
                </span>
              )}
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                  Sort by
                </div>
                
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSortSelect(option.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    <span className="text-gray-500">{option.icon}</span>
                    <span className="flex-1 text-left">{option.label}</span>
                    {sortBy === option.id && (
                      <FaCheck className="text-blue-600" />
                    )}
                  </button>
                ))}

                <div className="border-t border-gray-200 my-2"></div>
                
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                  Order
                </div>
                
                <button
                  onClick={toggleSortOrder}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50"
                >
                  <span className="text-gray-500">
                    {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                  <span className="flex-1 text-left">
                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                  </span>
                  <FaCheck className="text-blue-600" />
                </button>
              </div>
            )}
          </div>

          {/* Add Task button */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
            <span>+</span>
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="mt-4 flex items-center gap-2">
        {['All', 'High Priority', 'Overdue', 'No Deadline'].map((filter) => (
          <button
            key={filter}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;