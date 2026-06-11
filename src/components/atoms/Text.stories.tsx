import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'title', 'body', 'caption', 'label'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse'],
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'div'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Display: Story = {
  args: {
    variant: 'display',
    children: 'Display Typography',
    color: 'primary',
  },
};

export const Title: Story = {
  args: {
    variant: 'title',
    children: 'Title Typography',
    color: 'primary',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Body typography for paragraphs and general content. Apple Podcasts uses clean, readable text.',
    color: 'primary',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text — used for dates, metadata',
    color: 'secondary',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'LABEL TEXT — UPPERCASE',
    color: 'tertiary',
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text variant="body" color="primary">Primary text — main content</Text>
      <Text variant="body" color="secondary">Secondary text — supporting info</Text>
      <Text variant="body" color="tertiary">Tertiary text — subtle metadata</Text>
      <div style={{ backgroundColor: '#7b2ff7', padding: 12, borderRadius: 8 }}>
        <Text variant="body" color="inverse">Inverse text — on accent backgrounds</Text>
      </div>
    </div>
  ),
};
