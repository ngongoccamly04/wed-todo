// Thêm vào TodoForm.jsx
const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onAdd(text, deadline, priority, category); // Cập nhật hàm onAdd
    setText('');
    setDeadline('');
    setPriority('medium');
    setCategory('general');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-8">
      <input 
        type="text" 
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-3 rounded-xl bg-black/40 border border-white/20 text-white"
      />
      
      <input 
        type="datetime-local" 
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="p-3 rounded-xl bg-black/40 border border-white/20 text-white"
      />
      
      <select 
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-3 rounded-xl bg-black/40 border border-white/20 text-white"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 rounded-xl bg-black/40 border border-white/20 text-white"
      >
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="health">Health</option>
        <option value="family">Family</option>
      </select>
      
      <button type="submit" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold">
        Add Task
      </button>
    </form>
  );
};