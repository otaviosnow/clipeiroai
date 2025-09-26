/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'cyan-400': '#22d3ee',
        'cyan-500': '#06b6d4',
        'blue-400': '#60a5fa',
        'blue-500': '#3b82f6',
        'purple-400': '#c084fc',
        'purple-500': '#a855f7',
        'purple-600': '#9333ea',
        'pink-400': '#f472b6',
        'pink-500': '#ec4899',
        'gray-800': '#1f2937',
        'gray-900': '#111827',
        'gray-700': '#374151',
      },
    },
  },
  plugins: [],
}