// src/components/Login.jsx - CẬP NHẬT NÚT GOOGLE
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { FcGoogle } from 'react-icons/fc'; // Icon Google đẹp hơn

const Login = () => {
  const { loginWithGoogle, signup, login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegistering) {
        await signup(email, password, name);
        alert("✨ TÀI KHOẢN ĐÃ ĐƯỢC TẠO THÀNH CÔNG!");
      } else {
        await login(email, password);
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi: " + err.message);
    }
  };

  // HÀM XỬ LÝ ĐĂNG NHẬP GOOGLE
  const handleGoogleLogin = async () => {
    setError('');
    try {
      console.log("Attempting Google login...");
      await loginWithGoogle();
      // Tự động chuyển hướng vì auth state đã thay đổi
    } catch (err) {
      console.error("Google login error:", err);
      setError("Lỗi đăng nhập Google: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isRegistering ? 'Tạo Tài Khoản' : 'Đăng Nhập'}
          </h2>
          <p className="text-gray-600">
            {isRegistering ? 'Bắt đầu quản lý công việc' : 'Chào mừng trở lại'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* NÚT GOOGLE - NỔI BẬT */}
        <div className="mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium">Tiếp tục với Google</span>
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            Tài khoản sẽ được tạo tự động nếu chưa có
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">hoặc</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Form Email/Password */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nguyễn Văn A"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isRegistering ? 'Đăng Ký' : 'Đăng Nhập'}
          </button>
        </form>

        {/* Switch form */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isRegistering ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              {isRegistering ? 'Đăng nhập' : 'Đăng ký với email'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;