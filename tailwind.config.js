module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1234px',
    },
    extend: {
      colors: {
        primary: '#020617', // deep navy
        secondary: '#38bdf8', // light blue
        neon: '#0ea5e9',
        glassLight: 'rgba(15, 23, 42, 0.35)',
      },
      boxShadow: {
        1: '0px 10px 40px rgba(56, 189, 248, 0.35)',
        neon: '0 0 25px rgba(56, 189, 248, 0.6)',
      },
      backgroundImage: {
        'hero-neon':
          'radial-gradient(circle at top left, rgba(56,189,248,0.45), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.5), transparent 55%), linear-gradient(135deg, #020617 0%, #0b1220 40%, #020617 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(56,189,248,0.35)',
          },
          '50%': {
            boxShadow: '0 0 25px rgba(56,189,248,0.8)',
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
