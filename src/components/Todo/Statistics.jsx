// src/components/Todo/Statistics.jsx
import React from 'react';

const Statistics = ({ todos }) => {
  const doneCount = todos.filter(t => t.status === 'done').length;
  const inProgressCount = todos.filter(t => t.status === 'in-progress').length;
  const notStartedCount = todos.filter(t => t.status === 'not-started').length;
  const total = todos.length;
  const progressPercentage = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="bg-black/20 rounded-3xl border border-white/10 p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-white mb-6">📊 Thống Kê</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-900/30 p-4 rounded-2xl border border-blue-500/30">
          <div className="text-3xl font-bold text-blue-300">{notStartedCount}</div>
          <div className="text-blue-300/80">Chưa bắt đầu</div>
        </div>
        
        <div className="bg-yellow-900/30 p-4 rounded-2xl border border-yellow-500/30">
          <div className="text-3xl font-bold text-yellow-300">{inProgressCount}</div>
          <div className="text-yellow-300/80">Đang thực hiện</div>
        </div>
        
        <div className="bg-green-900/30 p-4 rounded-2xl border border-green-500/30">
          <div className="text-3xl font-bold text-green-300">{doneCount}</div>
          <div className="text-green-300/80">Hoàn thành</div>
        </div>
        
        <div className="bg-purple-900/30 p-4 rounded-2xl border border-purple-500/30">
          <div className="text-3xl font-bold text-purple-300">{total}</div>
          <div className="text-purple-300/80">Tổng số</div>
        </div>
      </div>
      
      <div className="bg-black/40 p-6 rounded-2xl">
        <div className="flex justify-between mb-2">
          <span className="text-white font-bold">Tiến độ tổng thể</span>
          <span className="text-white font-bold">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-400 h-4 rounded-full transition-all duration-700"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;