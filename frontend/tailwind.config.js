export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:     '#090a0f',
          panel:  '#12141f',
          border: '#1e2040',
          cyan:   '#00e5ff',
          purple: '#a855f7',
          green:  '#22c55e',
          amber:  '#f59e0b',
        },
        text: {
          primary:   '#e8edf5',
          secondary: '#8892b0',
          dim:       '#4a5578',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(0, 229, 255, 0.3)' },
          '50%': { boxShadow: '0 0 12px rgba(0, 229, 255, 0.6)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
