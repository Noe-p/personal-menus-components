import { Meta, Story } from '@storybook/react';
import { FullScreenMenu, FullScreenMenuProps } from '../src';

const meta: Meta = {
  title: 'FullScreenMenu',
  component: FullScreenMenu,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<FullScreenMenuProps> = args => (
  <FullScreenMenu {...args} />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  isMenuOpen: true,
  linksList: [
    {
      label: 'La maison',
      image: '/images/home-cinema.png',
      route: '/',
    },
    { label: 'City Garden', image: '/images/salon.png', route: '/about' },
    { label: 'About', image: '/images/home-cinema.png', route: '#' },
    { label: 'Contact', image: '/images/salon.png', route: '#' },
    {
      label: 'Reserver',
      image: '/images/home-cinema.png',
      route: '#',
    },
  ],
};
