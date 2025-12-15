// src/hooks/useTodos.js
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, addDoc, query, where, onSnapshot, 
  doc, deleteDoc, updateDoc, serverTimestamp 
} from 'firebase/firestore';

export const useTodos = (userId) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Lắng nghe dữ liệu (Realtime)
  useEffect(() => {
    if (!userId) {
      setTodos([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'todos'),
      where('userId', '==', userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sắp xếp: Mới nhất lên đầu
      todosData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setTodos(todosData);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  // 2. Hàm Thêm
  const addTodo = async (text, deadline) => {
await addDoc(collection(db, 'todos'), {
  text: trimmedText,
  userId: currentUser.uid,
  status: 'not-started', // Mặc định
  priority: priority || 'medium',
  category: category || 'general',
  deadline: deadline || null,
  createdAt: serverTimestamp()
});
  };

  // 3. Hàm Sửa (Toggle Complete)
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    });
  };

  // 4. Hàm Xóa
  const deleteTodo = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa chứ?")) {
      await deleteDoc(doc(db, 'todos', id));
    }
  };

  // Trả về dữ liệu và các hàm để bên ngoài sử dụng
  return { todos, loading, addTodo, toggleComplete, deleteTodo };
};