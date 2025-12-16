// src/context/AuthContext.jsx - CẬP NHẬT HOÀN CHỈNH
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ĐĂNG KÝ EMAIL/PASSWORD
  const signup = async (email, password, displayName = '') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      // Tạo profile trong Firestore
      await createUserProfile(userCredential.user);
      
      return userCredential;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // ĐĂNG NHẬP EMAIL/PASSWORD
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ĐĂNG NHẬP BẰNG GOOGLE - TỰ ĐỘNG TẠO ACCOUNT
  const loginWithGoogle = async () => {
    try {
      console.log("Starting Google login...");
      
      const provider = new GoogleAuthProvider();
      // Thêm scope nếu cần thêm thông tin
      provider.addScope('profile');
      provider.addScope('email');
      
      // Mở popup đăng nhập Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log("Google login successful:", user.email);
      
      // KIỂM TRA VÀ TẠO USER PROFILE TRONG FIRESTORE
      await checkAndCreateUserProfile(user);
      
      return result;
    } catch (error) {
      console.error("Google login error:", error.code, error.message);
      
      // Xử lý lỗi cụ thể
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup bị chặn! Hãy cho phép popup để đăng nhập.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Bạn đã đóng cửa sổ đăng nhập.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        throw new Error('Đăng nhập bị hủy.');
      } else {
        throw error;
      }
    }
  };

  // HÀM TẠO USER PROFILE TRONG FIRESTORE
  const createUserProfile = async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      // Chỉ tạo profile nếu chưa tồn tại
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL || '',
          provider: user.providerId || 'google',
          emailVerified: user.emailVerified || false,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
        console.log("User profile created in Firestore");
      } else {
        // Cập nhật lastLogin nếu đã có
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };

  // HÀM KIỂM TRA VÀ TẠO PROFILE
  const checkAndCreateUserProfile = async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        console.log("New Google user detected, creating profile...");
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0],
          photoURL: user.photoURL || '',
          provider: 'google',
          emailVerified: true, // Google verified
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          // Thêm các field mặc định khác nếu cần
          settings: {
            theme: 'light',
            notifications: true
          }
        });
        console.log("✅ New user profile created for:", user.email);
      } else {
        console.log("Existing user profile found, updating last login...");
        await setDoc(userRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
    } catch (error) {
      console.error("Error in checkAndCreateUserProfile:", error);
    }
  };

  // ĐĂNG XUẤT
  const logout = () => {
    return signOut(auth);
  };

  // LẮNG NGHE THAY ĐỔI AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed. User:", user ? user.email : "No user");
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};