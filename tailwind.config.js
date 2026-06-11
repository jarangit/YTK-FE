/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#faf8f6',
          card: '#ffffff',
        },
        ink: {
          DEFAULT: '#1d1d1f',
          muted: '#6e6e73',
          faint: '#aeaeb2',
        },
        border: '#e5e5ea',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          light: 'var(--color-accent-light)',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"',
          '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif',
        ],
        display: [
          '-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"',
          '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif',
        ],
      },
      spacing: {
        'inset-xs': 'var(--space-inset-xs)',
        'inset-sm': 'var(--space-inset-sm)',
        'inset-md': 'var(--space-inset-md)',
        'inset-lg': 'var(--space-inset-lg)',
        'stack-xs': 'var(--space-stack-xs)',
        'stack-sm': 'var(--space-stack-sm)',
        'stack-md': 'var(--space-stack-md)',
        'stack-lg': 'var(--space-stack-lg)',
        'inline-xs': 'var(--space-inline-xs)',
        'inline-sm': 'var(--space-inline-sm)',
        'inline-md': 'var(--space-inline-md)',
        'inline-lg': 'var(--space-inline-lg)',
        'inline-xl': 'var(--space-inline-xl)',
      },
      maxWidth: {
        read: '680px',
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
