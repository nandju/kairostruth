import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  AppstoreOutlined,
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  SettingOutlined,
  WalletOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text, Title } = Typography;

const navigationItems = [
  {
    key: '/conducteur/dashboard',
    icon: <AppstoreOutlined />,
    label: 'Tableau de bord',
  },
  {
    key: '/conducteur/courses',
    icon: <CarOutlined />,
    label: 'Mes courses',
  },
  {
    key: '/conducteur/disponibilites',
    icon: <ClockCircleOutlined />,
    label: 'Disponibilités',
  },
  {
    key: '/conducteur/revenus',
    icon: <WalletOutlined />,
    label: 'Gestion financière',
  },
];

const accountItems = [
  {
    key: '/conducteur/profile',
    icon: <UserOutlined />,
    label: 'Profil',
  },
  {
    key: '/conducteur/parametres',
    icon: <SettingOutlined />,
    label: 'Paramètres',
  },
];

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const isMobile = window.innerWidth < 768;

  return (
    <Sider
      collapsed={collapsed}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 fixed left-0 top-0 bottom-0 overflow-hidden"
      theme="dark"
      width={isMobile ? 280 : 400}
      collapsedWidth={isMobile ? 0 : 80}
    >
      {/* Logo - Première partie */}
      <div className="h-14 md:h-20 flex items-center justify-between border-b border-gray-800 px-3 md:px-5">
        <Link to="/conducteur/dashboard" className="flex items-center gap-2 md:gap-4 w-full justify-between">
          <img src="/logo.webp" alt="Logo" className="h-10 md:h-16" />
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
              <Text className="text-xs uppercase tracking-wider text-white font-semibold mb-2 md:mb-4 block">
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
                  className="rounded-none transition-colors text-base md:text-lg"
                >
                  <Link to={item.key} className="font-poppins text-base md:text-lg text-white hover:text-white">
                    {item.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu>
          </div>

          {/* Compte */}
          <div>
            {!collapsed && (
              <Text className="text-xs uppercase tracking-wider text-white font-semibold mb-2 md:mb-4 block">
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
                  className="rounded-none transition-colors text-base md:text-lg"
                >
                  <Link to={item.key} className="font-poppins text-base md:text-lg text-white hover:text-white">
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
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 px-3 md:px-5 py-3 md:py-4 bg-gradient-to-b from-black to-gray-900">
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