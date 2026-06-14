import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms/Button';
import Dialog from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Shared/Organisms/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Presence: Story = {
  render: function DialogPresenceStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} closeLabel="Close dialog">
          <h2 className="font-display text-xl font-semibold text-ink">Dialog title</h2>
          <p className="mt-stack-sm text-ink-muted">Dialog content remains mounted for its exit transition.</p>
        </Dialog>
      </>
    );
  },
};
