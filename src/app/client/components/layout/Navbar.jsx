import React from 'react';
import { Layout, Button, Avatar, Dropdown } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../../context/AuthContext';

const { Header } = Layout;

const userMenuItems = [
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
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Déconnexion',
  },
];

const Navbar = ({ onMenuClick, onMobileMenuClick }) => {
  const { logout } = useAuth();

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
    }
  };

  return (
    <Header className="flex items-center justify-between px-4 bg-white border-b border-gray-200">
      {/* Boutons de menu */}
      <div className="flex items-center gap-2">
        {/* Menu mobile */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMobileMenuClick}
          className="md:hidden"
        />
        {/* Menu desktop */}
        <Button
          type="text"
          icon={<MenuFoldOutlined />}
          onClick={onMenuClick}
          className="hidden md:flex"
        />
      </div>

      {/* Actions utilisateur */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button
          type="text"
          icon={<BellOutlined />}
        />

        {/* Menu utilisateur */}
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: handleUserMenuClick,
          }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button type="text" className="flex items-center gap-2">
            <Avatar icon={<UserOutlined />} />
            <span className="hidden sm:inline">John Doe</span>
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
