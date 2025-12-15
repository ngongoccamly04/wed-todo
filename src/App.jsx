// src/App.jsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './Login';
import TodoList from './components/TodoList'; 

const MainApp = () => {
  const { currentUser, logout } = useAuth();
  const [isAllDone, setIsAllDone] = useState(false);

  if (!currentUser) return <Login />;

  const backgroundImage = isAllDone 
    ? "url('/images/1.png')" 
    : "url('/images/1.png')";   

  return (
    <div 
      className="min-h-screen p-4 bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-1000 ease-in-out flex flex-col items-center font-fantasy"
      style={{ backgroundImage: backgroundImage }}
    >
      <div className="w-full max-w-4xl animate-fade-in relative z-10">
        <header className="flex flex-row justify-between items-center mb-8 p-3 px-5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white/10 rounded-full border border-mystic-gold/30">
                <span className="text-xl filter drop-shadow">
                    {isAllDone ? '✨' : '⚔️'}
                </span>
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-mystic-gold drop-shadow-md tracking-wide">
                {currentUser.displayName || currentUser.email}
              </h3>
              <p className="text-[10px] text-white/80 uppercase tracking-wider font-bold">
                {isAllDone ? 'Sứ giả Ánh Sao' : 'Kẻ lang thang vĩ đại'}
              </p>
            </div>
          </div>
          
          {/* Nút đăng xuất nhỏ xinh */}
          <button onClick={logout} className="font-sans px-4 py-1.5 rounded-full bg-red-900/60 border border-red-400/30 text-white text-xs hover:bg-red-800 transition-all font-bold tracking-wider">
            RỜI ĐI?
          </button>
        </header>
        
        <main>
            {/* Ẩn tiêu đề lớn khi đã thắng để màn hình thoáng hơn */}
            {!isAllDone && (
              <h1 className="text-4xl md:text-6xl text-center font-black mb-8 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-mystic-gold via-yellow-200 to-yellow-600 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  Nhiệm Vụ
              </h1>
            )}
            
            <TodoList onProgressUpdate={setIsAllDone} />
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