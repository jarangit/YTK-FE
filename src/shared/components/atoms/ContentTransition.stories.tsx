import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import ContentTransition from './ContentTransition';

const meta: Meta<typeof ContentTransition> = {
  title: 'Shared/Atoms/ContentTransition',
  component: ContentTransition,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContentTransition>;

export const Default: Story = {
  args: {
    transitionKey: 'initial',
    children: <div className="rounded-card bg-surface p-inset-lg">Content fades in on mount.</div>,
  },
};

export const StateChange: Story = {
  render: function StateChangeStory() {
    const [state, setState] = useState<'loading' | 'success'>('loading');

    return (
      <div className="w-80 space-y-4">
        <Button onClick={() => setState((current) => (current === 'loading' ? 'success' : 'loading'))}>
          Change state
        </Button>
        <ContentTransition transitionKey={state}>
          <div className="rounded-card bg-surface p-inset-lg">
            {state === 'loading' ? 'Loading content...' : 'Content loaded.'}
          </div>
        </ContentTransition>
      </div>
    );
  },
};
