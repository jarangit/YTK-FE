import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import '../src/shared/i18n'
import '../src/shared/styles/tokens/primitive.css'
import '../src/shared/styles/tokens/semantic.css'
import '../src/shared/styles/tokens/component.css'
import '../src/index.css'
import { AuthProvider } from '../src/shared/auth/AuthContext'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
};

export default preview;
