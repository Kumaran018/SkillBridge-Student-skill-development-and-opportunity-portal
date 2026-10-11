/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          darkest: '#070B12',
          canvas: '#0B101B',
          card: '#101726',
          border: '#1C2638',
        },
        accent: {
          emerald: '#00E699',
          cyan: '#00E5FF',
          purple: '#A855F7',
          blue: '#3B82F6',
          orange: '#F97316',
          red: '#EF4444',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'glow-emerald': '0 0 15px rgba(0, 230, 153, 0.25)',
        'glow-cyan': '0 0 15px rgba(0, 229, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
