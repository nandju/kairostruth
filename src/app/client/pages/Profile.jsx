import React from 'react';
import { Card, Tabs, Form, Input, Button, Upload, Avatar, message } from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined, EditOutlined, SafetyOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const Profile = () => {
  const [form] = Form.useForm();

  const handleProfileSubmit = (values) => {
    console.log('Mise à jour du profil:', values);
    message.success('Profil mis à jour avec succès');
  };

  const handlePasswordSubmit = (values) => {
    console.log('Modification du mot de passe:', values);
    message.success('Mot de passe modifié avec succès');
  };

  const items = [
    {
      key: 'profile',
      label: (
        <span className="flex items-center gap-2">
          <EditOutlined />
          Informations personnelles
        </span>
      ),
      children: (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <Avatar size={100} icon={<UserOutlined />} className="!rounded-none border-4 border-white shadow-lg" />
              <Upload className="absolute bottom-0 right-0">
                <Button 
                  icon={<UploadOutlined />} 
                  className="!rounded-none !w-8 !h-8 !p-0 flex items-center justify-center bg-primary text-white border-none hover:bg-primary/80"
                />
              </Upload>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">John Doe</h3>
              <p className="text-gray-500 text-sm">john.doe@example.com</p>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleProfileSubmit}
            initialValues={{
              nom: 'John',
              prenom: 'Doe',
              email: 'john.doe@example.com',
              telephone: '+33 6 12 34 56 78',
              adresse: '123 Rue de Paris',
              ville: 'Paris',
              codePostal: '75000',
            }}
            className="[&_.ant-form-item-label>label]:!text-gray-600 [&_.ant-input]:!rounded-none [&_.ant-input:hover]:border-primary [&_.ant-input:focus]:border-primary [&_.ant-input-password]:!rounded-none [&_.ant-input-password_.ant-input]:!rounded-none [&_.ant-input-password-icon]:!rounded-none"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="prenom"
                label="Prénom"
                rules={[{ required: true, message: 'Veuillez saisir votre prénom' }]}
              >
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item
                name="nom"
                label="Nom"
                rules={[{ required: true, message: 'Veuillez saisir votre nom' }]}
              >
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Veuillez saisir votre email' },
                  { type: 'email', message: 'Email invalide' },
                ]}
              >
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item
                name="telephone"
                label="Téléphone"
                rules={[{ required: true, message: 'Veuillez saisir votre téléphone' }]}
              >
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item
                name="adresse"
                label="Adresse"
                className="col-span-2"
              >
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item
                name="ville"
                label="Ville"
              >
                <Input className="!py-2" />
              </Form.Item>

              <Form.Item
                name="codePostal"
                label="Code postal"
              >
                <Input className="!py-2" />
              </Form.Item>
            </div>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                htmlType="submit"
                className="!rounded-none !h-10 !bg-primary hover:!bg-primary/80"
              >
                Enregistrer les modifications
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
          <SafetyOutlined />
          Sécurité
        </span>
      ),
      children: (
        <div>
          <Form
            layout="vertical"
            onFinish={handlePasswordSubmit}
            className="[&_.ant-form-item-label>label]:!text-gray-600 [&_.ant-input]:!rounded-none [&_.ant-input:hover]:border-primary [&_.ant-input:focus]:border-primary [&_.ant-input-password]:!rounded-none [&_.ant-input-password_.ant-input]:!rounded-none [&_.ant-input-password-icon]:!rounded-none"
          >
            <Form.Item
              name="currentPassword"
              label="Mot de passe actuel"
              rules={[{ required: true, message: 'Veuillez saisir votre mot de passe actuel' }]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} className="!py-2" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="Nouveau mot de passe"
              rules={[
                { required: true, message: 'Veuillez saisir votre nouveau mot de passe' },
                { min: 8, message: 'Le mot de passe doit contenir au moins 8 caractères' },
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} className="!py-2" />
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
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} className="!py-2" />
            </Form.Item>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                htmlType="submit"
                className="!rounded-none !h-10 !bg-primary hover:!bg-primary/80"
              >
                Modifier le mot de passe
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
          <h1 className="text-xl sm:text-2xl font-druk mb-2">Mon Profil</h1>
          <p className="text-sm sm:text-base opacity-80">Gérez vos informations personnelles et vos paramètres de sécurité</p>
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

export default Profile; 