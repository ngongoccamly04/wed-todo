// src/App.jsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './Login';
import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar'; // Tạo mới
import Header from './components/Header';   // Tạo mới

const MainApp = () => {
  const { currentUser, logout } = useAuth();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban', 'list', 'calendar', 'gallery'
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  if (!currentUser) return <Login />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex">
      {/* Sidebar bên trái */}
      <Sidebar 
        currentUser={currentUser}
        logout={logout}
        viewMode={viewMode}
        setViewMode={setViewMode}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64"> {/* ml-64 là width sidebar */}
        <Header 
          currentUser={currentUser}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <main className="flex-1 p-6">
          <TodoList 
            viewMode={viewMode}
            timeFilter={timeFilter}
          />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;