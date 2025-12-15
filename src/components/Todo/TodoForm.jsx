// src/components/Todo/TodoForm.jsx
import React, { useState } from 'react';

// Sửa từ export const TodoForm = ({ onAdd }) => {
const TodoForm = ({ onAdd }) => { // Bỏ "export const"
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onAdd(text, deadline, priority, category);
    setText('');
    setDeadline('');
    setPriority('medium');
    setCategory('general');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8 transition-all duration-500">
      <input 
        type="text" 
        placeholder="⚔️ Việc cần làm..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="font-sans flex-1 p-4 rounded-2xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-mystic-gold focus:bg-black/60 transition-all backdrop-blur-sm font-fantasy text-lg"
      />
      
      {/* Ô Chọn Ngày & Giờ */}
      <input 
        type="datetime-local" 
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        max="9999-12-31T23:59"
        className="p-4 rounded-2xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-mystic-gold cursor-pointer font-fantasy backdrop-blur-sm shadow-lg"
        style={{ colorScheme: 'dark' }} 
      />
      
      {/* Priority */}
      <select 
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-4 rounded-2xl bg-black/40 border border-white/20 text-white cursor-pointer font-fantasy"
      >
        <option value="low">⬇️ Thấp</option>
        <option value="medium">⚡ Trung</option>
        <option value="high">⚠️ Cao</option>
      </select>
      
      {/* Category */}
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-4 rounded-2xl bg-black/40 border border-white/20 text-white cursor-pointer font-fantasy"
      >
        <option value="general">📌 Chung</option>
        <option value="work">💼 Công việc</option>
        <option value="personal">👤 Cá nhân</option>
        <option value="health">💪 Sức khỏe</option>
        <option value="family">👨‍👩‍👧‍👦 Gia đình</option>
        <option value="study">📚 Học tập</option>
      </select>
      
      <button 
        type="submit" 
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-600 to-yellow-800 border border-yellow-400/50 text-white font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all font-fantasy tracking-wider"
      >
        THÊM
      </button>
    </form>
  );
};

export default TodoForm;