/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // indigo-600
          light: '#6366F1', // indigo-500
          dark: '#3730A3', // indigo-800
        },
        secondary: {
          DEFAULT: '#06B6D4', // cyan-500
          light: '#22D3EE', // cyan-400
          dark: '#0E7490', // cyan-700
        },
        accent: {
          DEFAULT: '#A3E635', // lime-400
          light: '#D9F99D', // lime-200
          dark: '#65A30D', // lime-700
        },
        background: '#F8FAFC', // slate-50
        surface: '#FFFFFF',
        error: '#EF4444', // red-500
        success: '#10B981', // emerald-500
        neutral: {
          DEFAULT: '#64748B', // slate-500
          light: '#F1F5F9', // slate-100
          dark: '#334155', // slate-800
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [],
}; 