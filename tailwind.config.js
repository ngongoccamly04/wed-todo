/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Định nghĩa bảng màu Fantasy
      colors: {
        mystic: {
          dark: '#0f0c29',      // Nền tối
          purple: '#302b63',    // Tím ma thuật
          blue: '#24243e',      // Xanh đen
          gold: '#ffd700',      // Vàng kim loại
          cream: '#e0c3fc',     // Màu chữ sáng
          glow: '#00d2ff',      // Màu phát sáng xanh
          danger: '#ff416c'     // Màu đỏ nguy hiểm
        }
      },
      // Font chữ (có thể thêm Google Font sau)
      fontFamily: {
        fantasy: ['"Cinzel"', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'], 
      },
      colors: {
        mystic: {
            dark: '#0f0c29',
            purple: '#302b63',
            blue: '#24243e',
            gold: '#ffd700',
            cream: '#f3e5f5', // Sửa lại chút cho sáng hơn
            glow: '#00d2ff',
            danger: '#ff416c'
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem', 
      },
      // Hiệu ứng phát sáng
      boxShadow: {
        'rune': '0 0 10px #00d2ff, 0 0 20px #00d2ff80',
        'gold-glow': '0 0 10px #ffd700, 0 0 20px #ffd70080'
      }
    },
  },
  plugins: [],
}