/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Clipeiro: Branco, Vermelho quente, Preto
        'clipeiro-red': '#FF4757',
        'clipeiro-red-light': '#FF6B7A',
        'clipeiro-red-dark': '#E63946',
        'clipeiro-black': '#0A0A0A',
        'clipeiro-gray': '#1A1A1A',
        'clipeiro-gray-light': '#2A2A2A',
        'clipeiro-white': '#FFFFFF',
      },
      backgroundImage: {
        'gradient-red': 'linear-gradient(135deg, #FF4757 0%, #E63946 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FF4757, 0 0 10px #FF4757' },
          '100%': { boxShadow: '0 0 10px #FF4757, 0 0 20px #FF4757, 0 0 30px #FF4757' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
