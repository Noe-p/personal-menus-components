import * as React from 'react';
import { useState } from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { FullScreenMenu, LinkMenuType } from '../.';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const linksList: LinkMenuType[] = [
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
  ];
  return (
    <div>
      <button
        style={{ zIndex: 10000000, background: 'red', position: 'fixed' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Toggle
      </button>
      <FullScreenMenu
        linksList={linksList}
        isMenuOpen={isOpen}
        setIsMenuOpen={setIsOpen}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
