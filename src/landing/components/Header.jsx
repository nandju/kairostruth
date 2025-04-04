import React, { useState } from 'react';
import { Typography, Button, Drawer, Divider } from 'antd';
import { MenuOutlined, CloseOutlined, UserOutlined, HomeOutlined, AppstoreOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('accueil');

  const menuItems = [
    { key: 'accueil', label: 'Accueil', href: '/' },
    { key: 'services', label: 'Services', href: '#services' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path, key) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = path;
    }
    setActiveItem(key);
    setMobileMenuOpen(false);
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Style personnalisé pour les boutons carrés
  const squareButtonStyle = {
    borderRadius: 0,
    height: '48px',
  };

  // Style personnalisé pour le menu
  const menuStyle = {
    backgroundColor: 'black',
    borderBottom: 'none',
    lineHeight: '48px',
  };

  // Style personnalisé pour les éléments du menu
  const menuItemStyle = {
    padding: '0 24px',
    fontSize: '17px',
    height: '48px',
    lineHeight: '48px',
  };

  // Icônes pour le menu mobile
  const mobileMenuIcons = {
    'accueil': <HomeOutlined />,
    'services': <AppstoreOutlined />,
  };

  return (
    <header className="sticky top-0 z-50 bg-black shadow-md">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNavigation('/', 'accueil')}
          >
            <img 
              src="/assets/logo.webp" 
              alt="WeTravel Logo" 
              className="h-12 mr-3 md:h-16"
            />
            <Title level={4} className="hidden m-0 text-white font-poppins sm:block">
              WeTravel
            </Title>
          </div>

          {/* Navigation - Desktop */}
          <nav className="items-center hidden md:flex">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleNavigation(item.href, item.key)}
                    className={`text-lg font-poppins px-4 py-2 transition-colors ${
                      activeItem === item.key
                        ? 'text-primary-light'
                        : 'text-white hover:text-primary-light'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Buttons - Desktop */}
          <div className="items-center hidden space-x-6 md:flex">
            <Button 
              type="default" 
              ghost
              icon={<UserOutlined className="text-xl" />}
              className="px-6 text-base text-white border-white font-poppins hover:text-primary hover:border-primary"
              style={squareButtonStyle}
              onClick={handleLogin}
            >
              Connexion
            </Button>
            
            <Button 
              type="primary" 
              className="px-6 text-base font-poppins"
              style={squareButtonStyle}
              onClick={handleContact}
            >
              Contactez-nous
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-1.5 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer - Design moderne et raffiné */}
      <Drawer
        title={null} // Suppression du titre par défaut
        placement="right"
        closable={false} // Suppression du bouton de fermeture par défaut
        onClose={toggleMobileMenu}
        open={mobileMenuOpen}
        width={300}
        bodyStyle={{ padding: 0, backgroundColor: '#111', height: '100%' }}
        headerStyle={{ display: 'none' }} // Masquer l'en-tête du drawer
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} // Overlay plus sombre
      >
        <div className="flex flex-col h-full text-white bg-gradient-to-b from-black to-gray-900">
          {/* En-tête du menu mobile */}
          <div className="flex items-center justify-between p-5 border-b border-gray-800">
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => {
                handleNavigation('/', 'accueil');
                toggleMobileMenu();
              }}
            >
              <img 
                src="/assets/logo.webp" 
                alt="WeTravel Logo" 
                className="h-8 mr-2"
              />
              <Title level={5} className="m-0 text-white font-poppins">
                WeTravel
              </Title>
            </div>
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-400 transition-colors hover:text-white focus:outline-none"
            >
              <CloseOutlined className="text-xl" />
            </button>
          </div>
          
          {/* Corps du menu mobile */}
          <div className="flex-grow px-5 py-6 overflow-y-auto">
            <nav className="mb-8">
              <Text className="block mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Navigation
              </Text>
              
              {menuItems.map(item => (
                <a 
                  key={item.key} 
                  onClick={() => handleNavigation(item.href, item.key)}
                  className="flex items-center px-2 py-3 text-gray-300 transition-colors rounded cursor-pointer hover:text-primary hover:bg-black/30 group"
                >
                  <span className="mr-3 text-lg text-gray-400 transition-colors group-hover:text-primary">
                    {mobileMenuIcons[item.key]}
                  </span>
                  <span className="text-base font-poppins">{item.label}</span>
                </a>
              ))}
            </nav>
            
            <Divider className="my-4 border-gray-800" />
            
            <div className="space-y-4">
              <Text className="block mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                Compte
              </Text>
              
              <Button 
                type="default" 
                icon={<UserOutlined />}
                className="flex items-center justify-center w-full text-white bg-transparent border-gray-700 font-poppins hover:text-primary hover:border-primary"
                style={{ ...squareButtonStyle, height: '42px' }}
                onClick={() => {
                  handleLogin();
                  toggleMobileMenu();
                }}
              >
                Connexion
              </Button>
            </div>
          </div>
          
          {/* Pied du menu mobile */}
          <div className="p-5 border-t border-gray-800">
            <Button 
              type="primary" 
              icon={<ArrowRightOutlined />}
              className="flex items-center justify-center w-full font-poppins"
              style={{ ...squareButtonStyle, height: '42px' }}
              onClick={() => {
                handleContact();
                toggleMobileMenu();
              }}
            >
              Contactez-nous
            </Button>
            
            <div className="mt-6 text-center">
              <Text className="text-xs text-gray-500">
                © {new Date().getFullYear()} WeTravel. Tous droits réservés.
              </Text>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default Header; 