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
          DEFAULT: 'var(--color-bg-elevated)',
          card: 'var(--color-bg-card)',
        },
        ink: {
          DEFAULT: 'var(--color-text-primary)',
          muted: 'var(--color-text-secondary)',
          faint: 'var(--color-text-tertiary)',
        },
        border: 'var(--color-border-subtle)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          light: 'var(--color-accent-light)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
          hover: 'var(--color-danger-hover)',
          soft: 'var(--color-danger-soft)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
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
        read: 'var(--content-read-width)',
        newsroom: 'var(--content-newsroom-width)',
      },
      borderRadius: {
        card: 'var(--card-radius)',
        btn: '12px',
        newsroom: 'var(--radius-newsroom-card)',
        pill: 'var(--radius-newsroom-pill)',
      },
      boxShadow: {
        card: 'var(--card-shadow)',
        'card-hover': 'var(--card-hover-shadow)',
      },
    },
  },
  plugins: [],
}
