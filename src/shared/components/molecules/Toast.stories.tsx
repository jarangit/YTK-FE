import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../atoms/Button';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Shared/Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Visible: Story = {
  args: {
    visible: true,
    children: 'Saved to your library',
  },
};

export const Presence: Story = {
  render: function ToastPresenceStory() {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Button onClick={() => setVisible((current) => !current)}>Toggle toast</Button>
        <Toast visible={visible}>Saved to your library</Toast>
      </>
    );
  },
};
