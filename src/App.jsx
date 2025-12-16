// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // THÊM
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './Login';
import TodoList from './components/TodoList';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Component bảo vệ route
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const MainApp = () => {
  const { currentUser, logout } = useAuth();
  const [viewMode, setViewMode] = useState('kanban');
  const [timeFilter, setTimeFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex">
      <Sidebar 
        currentUser={currentUser}
        logout={logout}
        viewMode={viewMode}
        setViewMode={setViewMode}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
      
      <div className="flex-1 flex flex-col ml-64">
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
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            } 
          />
          {/* Redirect mặc định */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;