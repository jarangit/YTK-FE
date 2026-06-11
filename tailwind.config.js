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
          DEFAULT: '#f5f5f7',
          card: 'var(--color-bg-card)',
        },
        ink: {
          DEFAULT: '#1d1d1f',
          muted: '#86868b',
          faint: '#aeaeb2',
        },
        border: '#d2d2d7',
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
        'stack-xl': 'var(--space-stack-xl)',
        'stack-2xl': 'var(--space-stack-2xl)',
        'inline-xs': 'var(--space-inline-xs)',
        'inline-sm': 'var(--space-inline-sm)',
        'inline-md': 'var(--space-inline-md)',
        'inline-lg': 'var(--space-inline-lg)',
        'inline-xl': 'var(--space-inline-xl)',
        'inline-2xl': 'var(--space-inline-2xl)',
      },
      maxWidth: {
        read: '680px',
        newsroom: 'var(--content-newsroom-width)',
      },
      borderRadius: {
        card: '18px',
        btn: '12px',
        newsroom: 'var(--radius-newsroom-card)',
        pill: 'var(--radius-newsroom-pill)',
      },
      boxShadow: {
        card: 'none',
        'card-hover': 'none',
      },
    },
  },
  plugins: [],
}
