// src/Login.jsx
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

const Login = () => {
  const { loginWithGoogle, signup, login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await signup(email, password);
        alert("✨ HỒ SƠ ĐÃ ĐƯỢC TẠO THÀNH CÔNG!");
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') setError("VỊ NÀY ĐÃ TỒN TẠI TRONG PHÁP GIỚI.");
      else if (err.code === 'auth/invalid-credential') setError("SAI EMAIL HOẶC MẬT CHÚ.");
      else if (err.code === 'auth/weak-password') setError("MẬT CHÚ QUÁ YẾU. HÃY MẠNH MẼ HƠN.");
      else setError("Error: " + err.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-fixed font-fantasy"
      style={{ backgroundImage: "url('/images/1.png')" }}
    >
      <div className="w-full max-w-md p-6 text-center">
        
        <h2 className="text-5xl font-bold text-mystic-gold mb-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] tracking-wider">
          {isRegistering ? 'Khởi Tạo' : 'Cổng Vào'}
        </h2>
        <p className="text-white mb-10 text-lg drop-shadow-md opacity-90 font-bold">
          "QUẢN LÝ HÀNH TRÌNH CỦA BẠN"
        </p>
        
        {error && (
          <div className="bg-red-900/60 border border-red-400 text-white p-4 rounded-2xl mb-6 backdrop-blur-md">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6 mb-8">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            // BO GÓC MẠNH (rounded-2xl)
            className="w-full p-4 rounded-2xl bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-mystic-gold focus:bg-black/60 transition-all backdrop-blur-md shadow-lg text-lg"
            placeholder="EMAIL CỦA BẠN..."
          />
          
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-2xl bg-black/40 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:border-mystic-gold focus:bg-black/60 transition-all backdrop-blur-md shadow-lg text-lg"
            placeholder="MẬT CHÚ..."
          />

          <button type="submit" className="w-full mt-2 text-xl py-4 rounded-full hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.3)] border border-mystic-gold/50 bg-gradient-to-r from-mystic-purple/80 to-mystic-blue/80 text-mystic-gold font-bold transition-all">
            {isRegistering ? '✨ TẠO!' : '🌌 TIẾN VÀO!'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-white/50 flex-1 shadow-sm"></div>
            <span className="text-mystic-gold text-sm drop-shadow-md font-bold">HOẶC</span>
            <div className="h-px bg-white/50 flex-1 shadow-sm"></div>
        </div>

        <button 
          onClick={loginWithGoogle} 
          className="w-full bg-white/10 hover:bg-white/20 border border-white/40 text-white py-3 px-4 rounded-full flex items-center justify-center gap-3 transition-all backdrop-blur-md font-bold tracking-wide"
        >
          <span>🔮</span> Liên kết Google
        </button>

        <p className="mt-8 text-base text-white drop-shadow-md font-bold">
          {isRegistering ? 'Kẻ hồi quy?' : 'Người mới đến?'}
          <span 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="text-mystic-gold ml-2 cursor-pointer hover:text-white transition-colors underline decoration-mystic-gold/50"
          >
            {isRegistering ? 'Trở lại?' : 'Danh phận mới?'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;