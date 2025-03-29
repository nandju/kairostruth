import React, { useState } from 'react';
import { Card, Switch, Radio, Select, Button, Form, Input, Divider, Alert, message } from 'antd';
import {
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
  MobileOutlined,
  NotificationOutlined,
  SecurityScanOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Parametres = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: true,
    nouveauxCourses: true,
    annulations: true,
    rapports: false,
  });

  const handleNotificationChange = (key, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    message.success('Paramètres de notification mis à jour');
  };

  const handlePasswordSubmit = (values) => {
    console.log('Nouveau mot de passe:', values);
    message.success('Mot de passe mis à jour avec succès');
    passwordForm.resetFields();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 shadow-sm !rounded-none">
        <h1 className="text-2xl font-clash font-semibold text-gray-800">Paramètres</h1>
        <p className="text-gray-500 mt-1">Gérez vos préférences et paramètres de sécurité</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Préférences générales */}
          <Card bordered={false} className="!rounded-none">
            <h2 className="text-lg font-clash font-medium mb-6 flex items-center gap-2">
              <GlobalOutlined className="text-primary" />
              Préférences générales
            </h2>
            <Form layout="vertical">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item label="Langue">
                  <Select 
                    defaultValue="fr" 
                    className="w-full !rounded-none"
                    options={[
                      { value: 'fr', label: 'Français' },
                      { value: 'en', label: 'English' },
                      { value: 'ar', label: 'العربية' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Fuseau horaire">
                  <Select 
                    defaultValue="UTC" 
                    className="w-full !rounded-none"
                    options={[
                      { value: 'UTC', label: 'UTC (GMT+0)' },
                      { value: 'UTC+1', label: 'UTC+1' },
                      { value: 'UTC-1', label: 'UTC-1' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Format de date">
                  <Radio.Group defaultValue="dd/mm/yyyy" className="w-full">
                    <div className="grid grid-cols-1 gap-2">
                      <Radio value="dd/mm/yyyy">DD/MM/YYYY</Radio>
                      <Radio value="mm/dd/yyyy">MM/DD/YYYY</Radio>
                      <Radio value="yyyy/mm/dd">YYYY/MM/DD</Radio>
                    </div>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Devise">
                  <Select 
                    defaultValue="xof" 
                    className="w-full !rounded-none"
                    options={[
                      { value: 'xof', label: 'XOF - Franc CFA' },
                      { value: 'eur', label: 'EUR - Euro' },
                      { value: 'usd', label: 'USD - Dollar US' },
                    ]}
                  />
                </Form.Item>
              </div>
            </Form>
          </Card>

          {/* Notifications */}
          <Card bordered={false} className="!rounded-none">
            <h2 className="text-lg font-clash font-medium mb-6 flex items-center gap-2">
              <BellOutlined className="text-primary" />
              Notifications
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-4">Canaux de notification</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MobileOutlined className="text-gray-400" />
                      <span>Notifications push</span>
                    </div>
                    <Switch 
                      checked={notificationSettings.push}
                      onChange={(checked) => handleNotificationChange('push', checked)}
                      className="bg-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <NotificationOutlined className="text-gray-400" />
                      <span>SMS</span>
                    </div>
                    <Switch 
                      checked={notificationSettings.sms}
                      onChange={(checked) => handleNotificationChange('sms', checked)}
                      className="bg-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MailOutlined className="text-gray-400" />
                      <span>Email</span>
                    </div>
                    <Switch 
                      checked={notificationSettings.email}
                      onChange={(checked) => handleNotificationChange('email', checked)}
                      className="bg-gray-300"
                    />
                  </div>
                </div>
              </div>

              <Divider />

              <div>
                <h3 className="text-base font-medium mb-4">Types de notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Nouvelles courses disponibles</span>
                    <Switch 
                      checked={notificationSettings.nouveauxCourses}
                      onChange={(checked) => handleNotificationChange('nouveauxCourses', checked)}
                      className="bg-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Annulations de courses</span>
                    <Switch 
                      checked={notificationSettings.annulations}
                      onChange={(checked) => handleNotificationChange('annulations', checked)}
                      className="bg-gray-300"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rapports hebdomadaires</span>
                    <Switch 
                      checked={notificationSettings.rapports}
                      onChange={(checked) => handleNotificationChange('rapports', checked)}
                      className="bg-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sécurité */}
        <div className="space-y-6">
          <Card bordered={false} className="!rounded-none">
            <h2 className="text-lg font-clash font-medium mb-6 flex items-center gap-2">
              <LockOutlined className="text-primary" />
              Sécurité
            </h2>
            <div className="space-y-6">
              <Alert
                message="Sécurité du compte"
                description="Votre dernier accès était le 15/03/2024 à 14:30"
                type="info"
                showIcon
                className="!rounded-none"
              />

              <div>
                <h3 className="text-base font-medium mb-4">Changer le mot de passe</h3>
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handlePasswordSubmit}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Mot de passe actuel"
                    rules={[{ required: true, message: 'Veuillez entrer votre mot de passe actuel' }]}
                  >
                    <Input.Password className="!rounded-none" />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="Nouveau mot de passe"
                    rules={[
                      { required: true, message: 'Veuillez entrer un nouveau mot de passe' },
                      { min: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' }
                    ]}
                  >
                    <Input.Password className="!rounded-none" />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirmer le mot de passe"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Veuillez confirmer votre mot de passe' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Les mots de passe ne correspondent pas'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password className="!rounded-none" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full !rounded-none">
                      Mettre à jour le mot de passe
                    </Button>
                  </Form.Item>
                </Form>
              </div>

              <Divider />

              <div>
                <h3 className="text-base font-medium mb-4">Authentification à deux facteurs</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Activer l'authentification à deux facteurs pour une sécurité renforcée</p>
                  </div>
                  <Switch defaultChecked={false} className="bg-gray-300" />
                </div>
              </div>
            </div>
          </Card>

          <Card bordered={false} className="!rounded-none">
            <h2 className="text-lg font-clash font-medium mb-6 flex items-center gap-2">
              <SecurityScanOutlined className="text-primary" />
              Sessions actives
            </h2>
            <div className="space-y-4">
              <div className="p-3 border border-gray-200 !rounded-none">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">iPhone 12</p>
                    <p className="text-sm text-gray-500">Dakar, Sénégal</p>
                  </div>
                  <Button danger className="!rounded-none">
                    Déconnecter
                  </Button>
                </div>
              </div>
              <div className="p-3 border border-gray-200 !rounded-none">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chrome - Windows</p>
                    <p className="text-sm text-gray-500">Dakar, Sénégal</p>
                  </div>
                  <Button danger className="!rounded-none">
                    Déconnecter
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Parametres; 