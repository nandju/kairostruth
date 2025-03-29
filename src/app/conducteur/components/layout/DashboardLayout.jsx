import React, { useState } from 'react';
import { Layout, Drawer } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Layout>
      {/* Sidebar pour desktop */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Drawer pour mobile */}
      <Drawer
        title={null}
        placement="left"
        closable={false}
        onClose={toggleMobileMenu}
        open={mobileMenuOpen}
        width={280}
        bodyStyle={{ padding: 0, backgroundColor: '#111', height: '100%' }}
        headerStyle={{ display: 'none' }}
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        className="md:hidden [&_.ant-drawer-content-wrapper]:!w-[280px] [&_.ant-drawer-content-wrapper]:!max-w-[80vw]"
      >
        <Sidebar collapsed={false} />
      </Drawer>

      <Layout className={`min-h-screen transition-all duration-300 ${collapsed ? 'md:ml-[80px]' : 'md:ml-[400px]'}`}>
        {/* Navbar */}
        <Navbar 
          onMenuClick={toggleSidebar}
          onMobileMenuClick={toggleMobileMenu}
        />

        {/* Contenu principal */}
        <Content className="p-3 md:p-6 bg-gray-50">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout; 