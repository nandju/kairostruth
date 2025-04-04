import React from 'react';
import { Layout, Menu, Typography, Divider } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  AppstoreOutlined,
  CalendarOutlined,
  CarOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text, Title } = Typography;

const navigationItems = [
  {
    key: '/client/dashboard',
    icon: <AppstoreOutlined />,
    label: 'Tableau de bord',
  },
  {
    key: '/client/reservations',
    icon: <CalendarOutlined />,
    label: 'Historique des commandes',
  },
];

const accountItems = [
  {
    key: '/client/profile',
    icon: <UserOutlined />,
    label: 'Profil',
  },
  {
    key: '/client/parametres',
    icon: <SettingOutlined />,
    label: 'Paramètres',
  },
];

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const isMobile = window.innerWidth < 768; // Détection mobile

  return (
    <Sider
      collapsed={collapsed}
      className="fixed top-0 bottom-0 left-0 min-h-screen overflow-hidden bg-gradient-to-b from-black to-gray-900"
      theme="dark"
      width={isMobile ? 280 : 400}
      collapsedWidth={isMobile ? 0 : 80}
    >
      {/* Logo - Première partie */}
      <div className="flex items-center justify-between px-3 border-b border-gray-800 h-14 md:h-20 md:px-5">
        <Link to="/client/dashboard" className="flex items-center justify-between w-full gap-2 md:gap-4">
          <img src="/assets/logo.webp" alt="Logo" className="h-10 md:h-16" />
          {!collapsed && (
            <Title level={4} className="!m-0 !text-white font-poppins !font-semibold !text-lg md:!text-2xl">
              KAIROS
            </Title>
          )}
        </Link>
      </div>

      {/* Menu et Compte - Deuxième partie */}
      <div className="flex-1 py-4 md:py-6 px-3 md:px-5 pb-20 md:pb-32 overflow-y-auto h-[calc(100vh-56px)] md:h-[calc(100vh-80px)]">
        <nav className="w-full">
          {/* Navigation */}
          <div className="mb-16 md:mb-32">
            {!collapsed && (
              <Text className="block mb-2 text-xs font-semibold tracking-wider text-white uppercase md:mb-4">
                Navigation
              </Text>
            )}
            
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              className="border-none bg-transparent [&_.ant-menu-item]:text-white [&_.ant-menu-item:hover]:text-white [&_.ant-menu-item:hover]:bg-[#990000] [&_.ant-menu-item-selected]:text-white [&_.ant-menu-item-selected]:bg-[#990000] [&_.ant-menu-item:hover]:text-white [&_.ant-menu-item-selected]:text-white [&_.ant-menu-item]:hover:!text-white [&_.ant-menu-item]:active:!text-white [&_.ant-menu-item-selected]:!text-white [&_.ant-menu-item]:rounded-none [&_.ant-menu-item]:mb-4 md:mb-8 [&_.ant-menu-item_.anticon]:text-base md:text-xl"
            >
              {navigationItems.map(item => (
                <Menu.Item 
                  key={item.key} 
                  icon={item.icon}
                  className="text-base transition-colors rounded-none md:text-lg"
                >
                  <Link to={item.key} className="text-base text-white font-poppins md:text-lg hover:text-white">
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>

          {/* Compte */}
          <div>
            {!collapsed && (
              <Text className="block mb-2 text-xs font-semibold tracking-wider text-white uppercase md:mb-4">
                Compte
              </Text>
            )}
            
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              className="border-none bg-transparent [&_.ant-menu-item]:text-white [&_.ant-menu-item:hover]:text-white [&_.ant-menu-item:hover]:bg-[#990000] [&_.ant-menu-item-selected]:text-white [&_.ant-menu-item-selected]:bg-[#990000] [&_.ant-menu-item:hover]:text-white [&_.ant-menu-item-selected]:text-white [&_.ant-menu-item:hover]:text-white [&_.ant-menu-item-selected]:text-white [&_.ant-menu-item]:hover:!text-white [&_.ant-menu-item]:active:!text-white [&_.ant-menu-item-selected]:!text-white [&_.ant-menu-item]:rounded-none [&_.ant-menu-item]:mb-4 md:mb-8 [&_.ant-menu-item_.anticon]:text-base md:text-xl"
            >
              {accountItems.map(item => (
                <Menu.Item 
                  key={item.key} 
                  icon={item.icon}
                  className="text-base transition-colors rounded-none md:text-lg"
                >
                  <Link to={item.key} className="text-base text-white font-poppins md:text-lg hover:text-white">
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </nav>
      </div>

      {/* Footer - Troisième partie */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 px-3 py-3 border-t border-gray-800 md:px-5 md:py-4 bg-gradient-to-b from-black to-gray-900">
          <div className="text-left">
            <Text className="text-[10px] md:text-xs text-left text-white">
              © {new Date().getFullYear()} KAIROS. Tous droits réservés.
            </Text>
          </div>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar; 