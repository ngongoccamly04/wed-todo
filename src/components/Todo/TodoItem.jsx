// src/components/Todo/TodoItem.jsx
import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const isDone = todo.status === 'done';

  // --- 1. LOGIC QUÁ HẠN (So sánh cả Giờ Phút) ---
  const checkOverdue = () => {
    if (!todo.deadline || isDone) return false;
    // So sánh thời gian thực tế: Deadline < Bây giờ -> Quá hạn
    return new Date(todo.deadline) < new Date();
  };

  const isOverdue = checkOverdue();

  // --- 2. FORMAT THỜI GIAN (Hiện cả giờ phút) ---
  const formatTime = (isoString) => {
      if (!isoString) return '';
      return new Date(isoString).toLocaleString('vi-VN', {
          hour: '2-digit', minute: '2-digit', // Hiện giờ:phút
          day: '2-digit', month: '2-digit', year: 'numeric' // Hiện ngày/tháng/năm
      });
  };

  // --- 3. STATE CHO CHẾ ĐỘ SỬA ---
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || '');

  const handleSave = () => {
    if (editText.trim() === '') return;
    onUpdate(todo.id, editText, editDeadline);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditDeadline(todo.deadline || '');
  };

  // --- 4. STYLE ---
  let containerClass = `flex justify-between items-center p-5 mb-4 rounded-2xl border backdrop-blur-md transition-all duration-300 group shadow-lg`;
  let textClass = `text-xl font-fantasy tracking-wide`;
  let deadlineClass = `text-xs mt-1 font-bold flex items-center gap-1 font-fantasy`; 

  if (isDone) {
      containerClass += ` bg-black/60 border-gray-600/30 opacity-60 scale-[0.98]`;
      textClass += ` line-through text-gray-400`;
      deadlineClass += ` text-gray-500`;
  } else if (isOverdue) {
      containerClass += ` bg-red-900/40 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse`;
      textClass += ` text-red-200 drop-shadow-md`;
      deadlineClass += ` text-red-400 font-black uppercase`;
  } else {
      containerClass += ` bg-black/30 border-white/10 hover:bg-black/40 hover:border-mystic-gold/50 hover:shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:-translate-y-1`;
      textClass += ` text-white drop-shadow-md`;
      deadlineClass += ` text-gray-300`;
  }

  // --- GIAO DIỆN ĐANG SỬA ---
  if (isEditing) {
    return (
      <li className={`${containerClass} !bg-indigo-900/60 !border-mystic-gold !opacity-100 !animate-none`}>
        <div className="flex flex-col gap-3 w-full mr-4">
            {/* Input sửa tên: Đã trả lại font-fantasy */}
            <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 rounded-xl bg-black/50 border border-mystic-gold/50 text-white focus:outline-none font-sans" autoFocus />
            {/* Input sửa ngày: datetime-local */}
            <input type="datetime-local" value={editDeadline} onChange={(e) => setEditDeadline(e.target.value)} max="9999-12-31T23:59"
                className="w-full p-2 rounded-xl bg-black/50 border border-white/20 text-white focus:outline-none font-sans cursor-pointer" style={{ colorScheme: 'dark' }} />
        </div>
        <div className="flex flex-col gap-2">
            <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md font-fantasy">Lưu</button>
            <button onClick={handleCancel} className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm font-bold font-fantasy">Hủy</button>
        </div>
      </li>
    );
  }

  // --- GIAO DIỆN BÌNH THƯỜNG ---
  return (
    <li className={containerClass}>
      <div className="flex items-center gap-5 flex-1">
        <input type="checkbox" checked={isDone} onChange={() => onToggle(todo)} className="w-6 h-6 cursor-pointer accent-mystic-gold rounded focus:ring-0" />
        
        <div className="flex flex-col">
          <strong className={textClass}>
            {todo.text}
          </strong>
          
          {todo.deadline && (
            <div className={deadlineClass}>
              {isOverdue ? '⚠️' : '⏳'} 
              {/* Hiển thị Giờ:Phút Ngày/Tháng/Năm */}
              Hạn chót: {formatTime(todo.deadline)}
              {isOverdue && <span className="ml-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-sans">QUÁ HẠN!</span>}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setIsEditing(true)} className="bg-blue-600/60 hover:bg-blue-500 text-white px-3 py-2 rounded-xl text-sm border border-blue-400/30 transition-all" title="Sửa">✏️</button>
        <button onClick={() => onDelete(todo.id)} className="bg-red-900/50 hover:bg-red-700 text-red-200 hover:text-white px-3 py-2 rounded-xl text-sm border border-red-500/30 transition-all" title="Xóa">🗑️</button>
      </div>
    </li>
  );
};

export default TodoItem;