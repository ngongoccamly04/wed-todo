// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import TodoForm from './Todo/TodoForm';
import TodoCard from './Todo/TodoCard'; // Component mới

const TodoList = ({ onProgressUpdate }) => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban', 'list', 'calendar', 'gallery'
  const [timeFilter, setTimeFilter] = useState('all'); // 'today', 'week', 'month', 'year'
  const [sortBy, setSortBy] = useState('due-date'); // 'name', 'due-date', 'priority', 'created'

  // Lấy dữ liệu
  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, 'todos'), where('userId', '==', currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        // Đảm bảo có các field mới
        status: doc.data().status || 'not-started',
        priority: doc.data().priority || 'medium',
        category: doc.data().category || 'general'
      }));
      setTodos(todosData);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);

  // Filter todos theo time
  const filterByTime = (todos) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch(timeFilter) {
      case 'today':
        return todos.filter(todo => {
          if (!todo.deadline) return false;
          const todoDate = new Date(todo.deadline);
          return todoDate.toDateString() === today.toDateString();
        });
      case 'week':
        const weekEnd = new Date(today);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return todos.filter(todo => {
          if (!todo.deadline) return false;
          const todoDate = new Date(todo.deadline);
          return todoDate >= today && todoDate <= weekEnd;
        });
      default:
        return todos;
    }
  };

  // Sort todos
  const sortTodos = (todos) => {
    const sorted = [...todos];
    switch(sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.text.localeCompare(b.text));
      case 'due-date':
        return sorted.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
      case 'priority':
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      default:
        return sorted;
    }
  };

  // Tính toán progress
  const calculateProgress = () => {
    if (todos.length === 0) return 0;
    const doneTodos = todos.filter(todo => todo.status === 'done').length;
    return Math.round((doneTodos / todos.length) * 100);
  };

  // Chuyển status (drag & drop)
  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, 'todos', id), { status: newStatus });
  };

  // Phân loại todos theo status
  const notStartedTodos = filterByTime(todos.filter(todo => todo.status === 'not-started'));
  const inProgressTodos = filterByTime(todos.filter(todo => todo.status === 'in-progress'));
  const doneTodos = filterByTime(todos.filter(todo => todo.status === 'done'));

  const progressPercentage = calculateProgress();

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="w-full">
      {/* Header với controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 bg-black/30 rounded-3xl border border-white/10 backdrop-blur-sm">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
          <div className="flex gap-2 flex-wrap">
            {['all', 'today', 'week', 'month'].map(filter => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  timeFilter === filter 
                    ? 'bg-mystic-gold text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {filter === 'all' ? 'All' : 
                 filter === 'today' ? 'Today' : 
                 filter === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <select 
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-400/30 text-white"
          >
            <option value="kanban">Kanban</option>
            <option value="list">List</option>
            <option value="calendar">Calendar</option>
            <option value="gallery">Gallery</option>
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-400/30 text-white"
          >
            <option value="due-date">Due Date</option>
            <option value="name">Name</option>
            <option value="priority">Priority</option>
            <option value="created">Created</option>
          </select>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="w-32 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-white font-bold">{progressPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Todo Form */}
      <TodoForm onAdd={addTodo} />

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Not Started Column */}
          <div className="bg-black/20 rounded-2xl p-4 border border-blue-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-300">Not Started</h3>
              <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm">
                {notStartedTodos.length}
              </span>
            </div>
            <div className="space-y-3">
              {sortTodos(notStartedTodos).map(todo => (
                <TodoCard 
                  key={todo.id} 
                  todo={todo} 
                  onUpdateStatus={updateStatus}
                />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="bg-black/20 rounded-2xl p-4 border border-yellow-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-yellow-300">In Progress</h3>
              <span className="bg-yellow-900/50 text-yellow-300 px-3 py-1 rounded-full text-sm">
                {inProgressTodos.length}
              </span>
            </div>
            <div className="space-y-3">
              {sortTodos(inProgressTodos).map(todo => (
                <TodoCard 
                  key={todo.id} 
                  todo={todo} 
                  onUpdateStatus={updateStatus}
                />
              ))}
            </div>
          </div>

          {/* Done Column */}
          <div className="bg-black/20 rounded-2xl p-4 border border-green-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-green-300">Done</h3>
              <span className="bg-green-900/50 text-green-300 px-3 py-1 rounded-full text-sm">
                {doneTodos.length}
              </span>
            </div>
            <div className="space-y-3">
              {sortTodos(doneTodos).map(todo => (
                <TodoCard 
                  key={todo.id} 
                  todo={todo} 
                  onUpdateStatus={updateStatus}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other views can be added here */}
      {viewMode !== 'kanban' && (
        <div className="text-center text-white mt-10">
          <p className="text-2xl">🚧 {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View Coming Soon!</p>
          <p className="mt-2 opacity-70">Currently showing Kanban view</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;