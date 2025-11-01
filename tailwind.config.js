/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // --- YOUR PREFERRED THEME ---
        'primary': '#2A9D8F',         // A hopeful teal/green
        'primary-dark': '#264653',    // A dark, professional blue/green
        'accent-orange': '#F4A261',   // A warm, friendly accent
        'accent-yellow': '#E9C46A',   // A lighter accent
        
        // --- BACKGROUNDS & TEXT ---
        'light-bg': '#F8F9FA',        // A very light grey for backgrounds
        'dark-bg': '#1A202C',         // Dark background
        'dark-bg-secondary': '#2D3748', // Slightly lighter dark background for cards
        'text-dark': '#212529',       // Default text color in light mode
        'text-light': '#EDF2F7',      // Default text color in dark mode
      },
      // --- ANIMATION KEYFRAMES (Ensure these are here for the Homepage scroll effects) ---
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'bounce-in': 'bounceIn 0.8s ease-out forwards',
        'scale-up': 'scaleUp 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
}