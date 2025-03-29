import React from 'react';
import { Card, Tabs, Form, Switch, Select, Button, Radio, message } from 'antd';
import { BellOutlined, GlobalOutlined, SecurityScanOutlined } from '@ant-design/icons';

const { Option } = Select;

const Parametres = () => {
  const handleNotificationSubmit = (values) => {
    console.log('Paramètres de notification:', values);
    message.success('Paramètres de notification mis à jour');
  };

  const handleSecuritySubmit = (values) => {
    console.log('Paramètres de sécurité:', values);
    message.success('Paramètres de sécurité mis à jour');
  };

  const handlePreferencesSubmit = (values) => {
    console.log('Préférences:', values);
    message.success('Préférences mises à jour');
  };

  const items = [
    {
      key: 'notifications',
      label: (
        <span className="flex items-center gap-2">
          <BellOutlined />
          Notifications
        </span>
      ),
      children: (
        <div>
          <Form
            layout="vertical"
            onFinish={handleNotificationSubmit}
            initialValues={{
              emailNotifications: true,
              pushNotifications: true,
              reservationUpdates: true,
              marketingEmails: false,
            }}
            className="[&_.ant-form-item-label>label]:!text-gray-600 [&_.ant-switch-checked]:!bg-primary"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Form.Item
                name="emailNotifications"
                label="Notifications par email"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="pushNotifications"
                label="Notifications push"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="reservationUpdates"
                label="Mises à jour des réservations"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="marketingEmails"
                label="Emails marketing"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                htmlType="submit"
                className="!rounded-none !h-10 !bg-primary hover:!bg-primary/80"
              >
                Enregistrer les préférences
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: 'security',
      label: (
        <span className="flex items-center gap-2">
          <SecurityScanOutlined />
          Sécurité
        </span>
      ),
      children: (
        <div>
          <Form
            layout="vertical"
            onFinish={handleSecuritySubmit}
            initialValues={{
              twoFactorAuth: false,
              sessionTimeout: '30',
              loginNotifications: true,
            }}
            className="[&_.ant-form-item-label>label]:!text-gray-600 [&_.ant-switch-checked]:!bg-primary [&_.ant-select-selector]:!rounded-none [&_.ant-select-selection-item]:!text-gray-600"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Form.Item
                name="twoFactorAuth"
                label="Authentification à deux facteurs"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="sessionTimeout"
                label="Délai d'expiration de session"
              >
                <Select className="w-full">
                  <Option value="15">15 minutes</Option>
                  <Option value="30">30 minutes</Option>
                  <Option value="60">1 heure</Option>
                  <Option value="120">2 heures</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="loginNotifications"
                label="Notifications de connexion"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                htmlType="submit"
                className="!rounded-none !h-10 !bg-primary hover:!bg-primary/80"
              >
                Enregistrer les paramètres
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: 'preferences',
      label: (
        <span className="flex items-center gap-2">
          <GlobalOutlined />
          Préférences
        </span>
      ),
      children: (
        <div>
          <Form
            layout="vertical"
            onFinish={handlePreferencesSubmit}
            initialValues={{
              language: 'fr',
              theme: 'light',
              timezone: 'Europe/Paris',
            }}
            className="[&_.ant-form-item-label>label]:!text-gray-600 [&_.ant-select-selector]:!rounded-none [&_.ant-radio-button-wrapper]:!rounded-none [&_.ant-radio-button-wrapper-checked]:!bg-primary [&_.ant-radio-button-wrapper-checked]:!text-white [&_.ant-radio-button-wrapper]:border-primary [&_.ant-radio-button-wrapper]:text-primary"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Form.Item name="language" label="Langue">
                <Select className="w-full">
                  <Option value="fr">Français</Option>
                  <Option value="en">English</Option>
                  <Option value="es">Español</Option>
                </Select>
              </Form.Item>

              <Form.Item name="timezone" label="Fuseau horaire">
                <Select
                  showSearch
                  placeholder="Sélectionnez votre fuseau horaire"
                  optionFilterProp="children"
                  className="w-full"
                >
                  <Option value="Europe/Paris">Europe/Paris</Option>
                  <Option value="Europe/London">Europe/London</Option>
                  <Option value="America/New_York">America/New_York</Option>
                </Select>
              </Form.Item>

              <Form.Item name="theme" label="Thème" className="sm:col-span-2">
                <Radio.Group className="w-full flex justify-start gap-4">
                  <Radio.Button value="light">Clair</Radio.Button>
                  <Radio.Button value="dark">Sombre</Radio.Button>
                  <Radio.Button value="system">Système</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </div>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                htmlType="submit"
                className="!rounded-none !h-10 !bg-primary hover:!bg-primary/80"
              >
                Enregistrer les préférences
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="-m-6">
      {/* En-tête */}
      <div className="bg-primary p-4 sm:p-6 md:p-8 text-white">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-druk mb-2">Paramètres</h1>
          <p className="text-sm sm:text-base opacity-80">Gérez vos préférences et paramètres de sécurité</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        <Card 
          bordered={false} 
          className="!rounded-none"
        >
          <Tabs 
            items={items}
            className="[&_.ant-tabs-tab]:!rounded-none [&_.ant-tabs-tab-active]:text-primary [&_.ant-tabs-ink-bar]:bg-primary"
          />
        </Card>
      </div>
    </div>
  );
};

export default Parametres; 