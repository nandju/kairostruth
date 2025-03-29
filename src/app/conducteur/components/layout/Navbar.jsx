import React from 'react';
import { Layout, Button, Avatar, Dropdown, Badge, Switch } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
  CarOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../../../context/AuthContext';

const { Header } = Layout;

const userMenuItems = [
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
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Déconnexion',
  },
];

const Navbar = ({ onMenuClick, onMobileMenuClick }) => {
  const { logout } = useAuth();
  const [isAvailable, setIsAvailable] = React.useState(false);

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();
    }
  };

  const toggleAvailability = (checked) => {
    setIsAvailable(checked);
    // Ici, vous pouvez ajouter la logique pour mettre à jour le statut du conducteur
  };

  return (
    <Header className="flex items-center justify-between px-4 bg-white border-b border-gray-200">
      {/* Boutons de menu */}
      <div className="flex items-center gap-4">
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

        {/* Statut de disponibilité */}
        <div className="flex items-center gap-2">
          <CarOutlined className={isAvailable ? 'text-green-500' : 'text-gray-400'} />
          <Switch
            checked={isAvailable}
            onChange={toggleAvailability}
            className={`${isAvailable ? '!bg-green-500' : ''} min-w-[40px]`}
          />
          <span className="hidden sm:inline text-sm">
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </span>
        </div>
      </div>

      {/* Actions utilisateur */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Badge count={5} size="small">
          <Button
            type="text"
            icon={<BellOutlined />}
          />
        </Badge>

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