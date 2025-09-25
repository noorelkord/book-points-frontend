/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF4FA',
          100: '#D1E7F5',
          200: '#A3CFEB',
          300: '#75B7E1',
          400: '#479FD7',
          500: '#3F6A8D',
          600: '#365B7C',
          700: '#2D4C6B',
          800: '#243D5A',
          900: '#1B2E49',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0px 4px 10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 8px 20px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '12px',
        'input': '4px',
      }
    },
  },
  plugins: [],
};


