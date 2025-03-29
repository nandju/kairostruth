import React from 'react';
import { Card, Form, Input, Button, Select, Upload, InputNumber, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  CarOutlined,
  NumberOutlined,
  CalendarOutlined,
  UploadOutlined,
  DollarOutlined,
  SettingOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  UserAddOutlined,
  FileSearchOutlined,
  TeamOutlined
} from '@ant-design/icons';

const NouveauVehicule = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Valeurs du formulaire:', values);
    message.success('Véhicule ajouté avec succès');
    navigate('/admin/vehicules');
  };

  // Actions rapides sur le côté
  const quickActions = [
    {
      icon: <HomeOutlined />,
      text: 'Tableau de bord',
      onClick: () => navigate('/admin'),
    },
    {
      icon: <UserAddOutlined />,
      text: 'Ajout conducteur',
      onClick: () => navigate('/admin/conducteurs/nouveau'),
    },
    {
      icon: <FileSearchOutlined />,
      text: 'Liste véhicules',
      onClick: () => navigate('/admin/vehicules'),
    },
    {
      icon: <TeamOutlined />,
      text: 'Liste conducteurs',
      onClick: () => navigate('/admin/conducteurs'),
    },
    {
      icon: <CalendarOutlined />,
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
                  Nouveau véhicule
                </h1>
                <p className="text-gray-500">Ajoutez un nouveau véhicule à votre flotte</p>
              </div>
              <Button 
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate('/admin/vehicules')}
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
                {/* Informations de base */}
                <div className="mb-8">
                  <h2 className="text-lg font-medium mb-4">Informations du véhicule</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="marque"
                      label="Marque"
                      rules={[{ required: true, message: 'La marque est requise' }]}
                    >
                      <Input 
                        prefix={<CarOutlined className="text-gray-400" />}
                        className="!rounded-none"
                        placeholder="Ex: Toyota, Honda, etc."
                      />
                    </Form.Item>

                    <Form.Item
                      name="modele"
                      label="Modèle"
                      rules={[{ required: true, message: 'Le modèle est requis' }]}
                    >
                      <Input 
                        className="!rounded-none"
                        placeholder="Ex: Corolla, Civic, etc."
                      />
                    </Form.Item>

                    <Form.Item
                      name="immatriculation"
                      label="Immatriculation"
                      rules={[{ required: true, message: 'L\'immatriculation est requise' }]}
                    >
                      <Input 
                        prefix={<NumberOutlined className="text-gray-400" />}
                        className="!rounded-none"
                        placeholder="Ex: DK-123-AB"
                      />
                    </Form.Item>

                    <Form.Item
                      name="annee"
                      label="Année"
                      rules={[{ required: true, message: 'L\'année est requise' }]}
                    >
                      <InputNumber 
                        prefix={<CalendarOutlined className="text-gray-400" />}
                        className="!rounded-none w-full"
                        placeholder="Ex: 2024"
                        min={2000}
                        max={2025}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Caractéristiques */}
                <div className="mb-8">
                  <h2 className="text-lg font-medium mb-4">Caractéristiques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="type"
                      label="Type de véhicule"
                      rules={[{ required: true, message: 'Le type est requis' }]}
                    >
                      <Select
                        className="!rounded-none"
                        placeholder="Sélectionnez le type"
                        options={[
                          { value: 'berline', label: 'Berline' },
                          { value: 'suv', label: 'SUV' },
                          { value: 'citadine', label: 'Citadine' },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      name="carburant"
                      label="Type de carburant"
                      rules={[{ required: true, message: 'Le type de carburant est requis' }]}
                    >
                      <Select
                        className="!rounded-none"
                        placeholder="Sélectionnez le carburant"
                        options={[
                          { value: 'essence', label: 'Essence' },
                          { value: 'diesel', label: 'Diesel' },
                          { value: 'hybride', label: 'Hybride' },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      name="kilometrage"
                      label="Kilométrage initial"
                      rules={[{ required: true, message: 'Le kilométrage est requis' }]}
                    >
                      <InputNumber
                        className="!rounded-none w-full"
                        placeholder="Ex: 0"
                        min={0}
                        formatter={value => `${value} km`}
                        parser={value => value.replace(' km', '')}
                      />
                    </Form.Item>

                    <Form.Item
                      name="tarifJournalier"
                      label="Tarif journalier"
                      rules={[{ required: true, message: 'Le tarif est requis' }]}
                    >
                      <InputNumber
                        prefix={<DollarOutlined className="text-gray-400" />}
                        className="!rounded-none w-full"
                        placeholder="Ex: 25000"
                        min={0}
                        formatter={value => `${value} XOF`}
                        parser={value => value.replace(' XOF', '')}
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Documents et photos */}
                <div className="mb-8">
                  <h2 className="text-lg font-medium mb-4">Documents et photos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      name="cartegrise"
                      label="Carte grise"
                      rules={[{ required: true, message: 'La carte grise est requise' }]}
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
                      name="assurance"
                      label="Assurance"
                      rules={[{ required: true, message: 'L\'assurance est requise' }]}
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
                      name="photos"
                      label="Photos du véhicule"
                      rules={[{ required: true, message: 'Au moins une photo est requise' }]}
                    >
                      <Upload 
                        maxCount={4}
                        listType="picture"
                        className="!rounded-none"
                      >
                        <Button icon={<UploadOutlined />} className="!rounded-none">
                          Ajouter des photos
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex justify-end gap-4">
                  <Button 
                    onClick={() => navigate('/admin/vehicules')}
                    className="!rounded-none"
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    className="!rounded-none"
                  >
                    Ajouter le véhicule
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

export default NouveauVehicule; 