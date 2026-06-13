import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useAuth } from '../../shared/auth/AuthContext';
import SignInModal from './SignInModal';

function OpenModalPreview() {
  const { openSignInModal } = useAuth();

  useEffect(() => {
    openSignInModal();
  }, [openSignInModal]);

  return <SignInModal />;
}

const meta: Meta<typeof SignInModal> = {
  title: 'App/SignInModal',
  component: SignInModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SignInModal>;

export const Default: Story = {
  render: () => <OpenModalPreview />,
};
