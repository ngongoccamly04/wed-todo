// src/components/Todo/TodoCard.jsx
import React, { useState } from 'react';

const TodoCard = ({ todo, onUpdateStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // Tính days remaining/overdue
  const getTimeStatus = () => {
    if (!todo.deadline) return null;
    
    const now = new Date();
    const deadline = new Date(todo.deadline);
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return { text: 'Do it today!', className: 'text-red-400 bg-red-900/30' };
    if (diffDays === 1) return { text: '1 day remaining', className: 'text-orange-400 bg-orange-900/30' };
    if (diffDays > 1) return { text: `${diffDays} days remaining`, className: 'text-blue-400 bg-blue-900/30' };
    if (diffDays === -1) return { text: 'Due 1 day ago', className: 'text-red-500 bg-red-900/50' };
    return { text: `Due ${Math.abs(diffDays)} days ago`, className: 'text-red-500 bg-red-900/50' };
  };

  const timeStatus = getTimeStatus();
  
  // Priority colors
  const priorityColors = {
    high: 'border-red-500/50 bg-red-900/20',
    medium: 'border-yellow-500/50 bg-yellow-900/20',
    low: 'border-green-500/50 bg-green-900/20'
  };

  // Category colors
  const categoryColors = {
    work: 'bg-blue-900/40',
    personal: 'bg-purple-900/40',
    health: 'bg-green-900/40',
    family: 'bg-pink-900/40',
    general: 'bg-gray-700/40'
  };

  return (
    <div 
      className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.02] cursor-move ${
        priorityColors[todo.priority] || 'border-gray-500/50'
      }`}
      draggable
      onDragStart={(e) => e.dataTransfer.setData('todoId', todo.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => setIsEditing(false)}
              className="w-full bg-transparent border-b border-white/30 text-white focus:outline-none"
              autoFocus
            />
          ) : (
            <h4 
              className="text-white font-bold cursor-text"
              onClick={() => setIsEditing(true)}
            >
              {todo.text}
            </h4>
          )}
          
          {/* Category tag */}
          {todo.category && todo.category !== 'general' && (
            <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
              categoryColors[todo.category] || 'bg-gray-700/40'
            } text-white/80`}>
              {todo.category}
            </span>
          )}
        </div>
        
        {/* Status dropdown */}
        <select
          value={todo.status}
          onChange={(e) => onUpdateStatus(todo.id, e.target.value)}
          className="ml-2 px-2 py-1 rounded-lg bg-black/50 border border-white/20 text-white text-xs"
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Time status */}
      {timeStatus && (
        <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold inline-block ${timeStatus.className}`}>
          {timeStatus.text}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/10">
        <div className="flex gap-2">
          <button className="text-xs text-white/60 hover:text-white">
            ⏰
          </button>
          <button className="text-xs text-white/60 hover:text-white">
            🏷️
          </button>
          <button className="text-xs text-white/60 hover:text-white">
            📌
          </button>
        </div>
        
        {todo.status === 'done' && (
          <span className="text-green-400 text-sm">✓ Done</span>
        )}
      </div>
    </div>
  );
};

export default TodoCard;