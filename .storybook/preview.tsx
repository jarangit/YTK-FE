import type { Preview } from '@storybook/react-vite'
import '../src/shared/i18n'
import '../src/shared/styles/tokens/primitive.css'
import '../src/shared/styles/tokens/semantic.css'
import '../src/shared/styles/tokens/component.css'
import '../src/index.css'

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
};

export default preview;