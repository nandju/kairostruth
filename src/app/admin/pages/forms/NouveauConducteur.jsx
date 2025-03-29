import React from 'react';
import { Card, Form, Input, Button, Select, Upload, DatePicker, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  IdcardOutlined,
  CarOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  TeamOutlined,
  FileSearchOutlined,
  SettingOutlined
} from '@ant-design/icons';

const NouveauConducteur = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Valeurs du formulaire:', values);
    message.success('Conducteur créé avec succès');
    navigate('/admin/conducteurs');
  };

  // Actions rapides sur le côté
  const quickActions = [
    {
      icon: <HomeOutlined />,
      text: 'Tableau de bord',
      onClick: () => navigate('/admin'),
    },
    {
      icon: <PlusCircleOutlined />,
      text: 'Nouveau véhicule',
      onClick: () => navigate('/admin/vehicules/nouveau'),
    },
    {
      icon: <TeamOutlined />,
      text: 'Liste conducteurs',
      onClick: () => navigate('/admin/conducteurs'),
    },
    {
      icon: <CarOutlined />,
      text: 'Liste véhicules',
      onClick: () => navigate('/admin/vehicules'),
    },
    {
      icon: <FileSearchOutlined />,
      text: 'Réservations',
      onClick: () => navigate('/admin/reservations'),
    },
    {
      icon: <SettingOutlined />,
      text: 'Paramètres',
      onClick: () => navigate('/admin/parametres'),
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6">
          {/* Barre d'actions rapides */}
          <div className="w-52 flex-shrink-0">
            <Card 
              bordered={false} 
              className="!rounded-none bg-[#990000]/90 h-full"
              bodyStyle={{ padding: '1rem 0' }}
            >
              <div className="flex flex-col gap-8">
                {/* En-tête de la barre */}
                <div className="text-white px-4">
                  <h3 className="text-lg font-clash mb-2 animate-fade-in">
                    Actions Rapides
                  </h3>
                  <p className="text-sm text-white/70 animate-slide-in">
                    Navigation rapide entre les différentes sections
                  </p>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col gap-8 px-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      icon={action.icon}
                      onClick={action.onClick}
                      className="!rounded-none text-left flex items-center justify-start h-9 text-sm border border-white/30 hover:border-white bg-transparent text-white/90 hover:text-white transition-all duration-300 transform hover:translate-x-1"
                      style={{ width: '100%' }}
                    >
                      <span className="ml-2">{action.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="flex-grow flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-clash font-semibold text-gray-800 mb-2">
                  Nouveau conducteur
                </h1>
                <p className="text-gray-500">Remplissez les informations pour créer un nouveau conducteur</p>
              </div>
              <Button 
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/admin/conducteurs')}
                className="!rounded-none"
              >
                Retour
              </Button>
            </div>

            {/* Formulaire */}
            <Card bordered={false} className="!rounded-none">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="max-w-3xl"
              >
                {/* Informations personnelles */}
                <div className="mb-8">
                  <h2 className="text-lg font-medium mb-4">Informations personnelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="nom"
                      label="Nom complet"
                      rules={[{ required: true, message: 'Le nom est requis' }]}
                    >
                      <Input 
                        prefix={<UserOutlined className="text-gray-400" />}
                        className="!rounded-none"
                        placeholder="Entrez le nom complet"
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'L\'email est requis' },
                        { type: 'email', message: 'Email invalide' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined className="text-gray-400" />}
                        className="!rounded-none"
                        placeholder="Entrez l'adresse email"
                      />
                    </Form.Item>

                    <Form.Item
                      name="telephone"
                      label="Téléphone"
                      rules={[{ required: true, message: 'Le téléphone est requis' }]}
                    >
                      <Input 
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        className="!rounded-none"
                        placeholder="Entrez le numéro de téléphone"
                      />
                    </Form.Item>

                    <Form.Item
                      name="dateNaissance"
                      label="Date de naissance"
                      rules={[{ required: true, message: 'La date de naissance est requise' }]}
                    >
                      <DatePicker 
                        className="w-full !rounded-none" 
                        placeholder="Sélectionnez la date"
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Documents */}
                <div className="mb-8">
                  <h2 className="text-lg font-medium mb-4">Documents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="numeroCNI"
                      label="Numéro CNI"
                      rules={[{ required: true, message: 'Le numéro CNI est requis' }]}
                    >
                      <Input 
                        prefix={<IdcardOutlined className="text-gray-400" />}
                        className="!rounded-none"
                        placeholder="Entrez le numéro CNI"
                      />
                    </Form.Item>

                    <Form.Item
                      name="permis"
                      label="Numéro de permis"
                      rules={[{ required: true, message: 'Le numéro de permis est requis' }]}
                    >
                      <Input 
                        prefix={<CarOutlined className="text-gray-400" />}
                        className="!rounded-none"
                        placeholder="Entrez le numéro de permis"
                      />
                    </Form.Item>

                    <Form.Item
                      name="photoPermis"
                      label="Photo du permis"
                      rules={[{ required: true, message: 'La photo du permis est requise' }]}
                    >
                      <Upload 
                        maxCount={1}
                        listType="picture"
                        className="!rounded-none"
                      >
                        <Button icon={<UploadOutlined />} className="!rounded-none">
                          Télécharger
                        </Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item
                      name="photoCNI"
                      label="Photo de la CNI"
                      rules={[{ required: true, message: 'La photo de la CNI est requise' }]}
                    >
                      <Upload 
                        maxCount={1}
                        listType="picture"
                        className="!rounded-none"
                      >
                        <Button icon={<UploadOutlined />} className="!rounded-none">
                          Télécharger
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>

                {/* Informations véhicule */}
                <div className="mb-8">
                  <h2 className="text-lg font-medium mb-4">Informations véhicule</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="vehicule"
                      label="Véhicule assigné"
                      rules={[{ required: true, message: 'Le véhicule est requis' }]}
                    >
                      <Select
                        className="!rounded-none"
                        placeholder="Sélectionnez un véhicule"
                        options={[
                          { value: 'toyota', label: 'Toyota Corolla - DK-123-AB' },
                          { value: 'honda', label: 'Honda Civic - DK-456-CD' },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      name="typeContrat"
                      label="Type de contrat"
                      rules={[{ required: true, message: 'Le type de contrat est requis' }]}
                    >
                      <Select
                        className="!rounded-none"
                        placeholder="Sélectionnez le type de contrat"
                        options={[
                          { value: 'cdi', label: 'CDI' },
                          { value: 'cdd', label: 'CDD' },
                          { value: 'freelance', label: 'Freelance' },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-4">
                  <Button 
                    onClick={() => navigate('/admin/conducteurs')}
                    className="!rounded-none"
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    className="!rounded-none"
                  >
                    Créer le conducteur
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NouveauConducteur; 