import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Tag, 
  Statistic, 
  Alert, 
  Avatar, 
  Space, 
  Tooltip, 
  Progress,
  Divider,
  Input,
  DatePicker,
  Form
} from 'antd';
import { 
  CarOutlined, 
  EditOutlined, 
  CheckCircleOutlined, 
  ToolOutlined,
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const ApercuVehiculeComponent = ({ vehicule = {} }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Données de test (à remplacer par les vraies données)
  const stats = {
    nombreCourses: vehicule?.nombreCourses || 156,
    kilometrage: vehicule?.kilometrage || 42500,
    tauxUtilisation: vehicule?.tauxUtilisation || 78,
    consommationMoyenne: 7.5,
    prochaineRevision: 45000,
    derniereMaintenance: '15/01/2024',
    disponibilite: 92
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log('Nouvelles valeurs:', values);
      setIsEditing(false);
      // TODO: Appeler l'API pour sauvegarder les modifications
    } catch (error) {
      console.error('Erreur de validation:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Statistiques principales avec design amélioré */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <CarOutlined className="text-primary" />
                Courses effectuées
              </span>
            }
            value={stats.nombreCourses}
            valueStyle={{ color: '#1890ff' }}
            prefix={
              <Tooltip title="En augmentation">
                <RiseOutlined className="text-success" />
              </Tooltip>
            }
          />
          <div className="mt-2 text-xs text-gray-500">
            +12 courses cette semaine
          </div>
        </Card>

        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <DashboardOutlined className="text-success" />
                Distance totale
              </span>
            }
            value={stats.kilometrage}
            suffix="km"
            valueStyle={{ color: '#52c41a' }}
          />
          <div className="mt-2 text-xs text-gray-500">
            +350 km cette semaine
          </div>
        </Card>

        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <ThunderboltOutlined className="text-warning" />
                Taux d'utilisation
              </span>
            }
            value={stats.tauxUtilisation}
            suffix="%"
            valueStyle={{ color: '#faad14' }}
          />
          <Progress 
            percent={stats.tauxUtilisation} 
            showInfo={false} 
            strokeColor="#faad14"
            className="!rounded-none mt-2"
          />
        </Card>

        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <CheckCircleOutlined className="text-success" />
                Disponibilité
              </span>
            }
            value={stats.disponibilite}
            suffix="%"
            valueStyle={{ color: '#52c41a' }}
          />
          <Progress 
            percent={stats.disponibilite} 
            showInfo={false} 
            strokeColor="#52c41a"
            className="!rounded-none mt-2"
          />
        </Card>
      </div>

      {/* Informations détaillées du véhicule */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CarOutlined className="text-primary" />
              Informations du véhicule
            </span>
            <Space>
              {isEditing ? (
                <>
                  <Button 
                    className="!rounded-none"
                    onClick={handleCancel}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="primary"
                    className="!rounded-none"
                    onClick={handleSave}
                  >
                    Enregistrer
                  </Button>
                </>
              ) : (
                <Button 
                  icon={<EditOutlined />}
                  className="!rounded-none"
                  type="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </Button>
              )}
            </Space>
          </div>
        }
        bordered={false} 
        className="!rounded-none"
      >
        <Form
          form={form}
          initialValues={{
            marque: vehicule.marque || 'Toyota',
            modele: vehicule.modele || 'Hilux',
            immatriculation: vehicule.immatriculation || 'DK-2024-AA',
            miseEnService: vehicule.miseEnService ? dayjs(vehicule.miseEnService, 'DD/MM/YYYY') : dayjs(),
            etat: vehicule.etat || 'Disponible'
          }}
          layout="vertical"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Informations de base</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CarOutlined className="text-primary text-lg" />
                  <div className="flex-grow">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Form.Item name="marque" className="mb-2">
                          <Input placeholder="Marque" className="!rounded-none" />
                        </Form.Item>
                        <Form.Item name="modele" className="mb-0">
                          <Input placeholder="Modèle" className="!rounded-none" />
                        </Form.Item>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500">Modèle</p>
                        <p className="font-medium">{vehicule.marque || 'Toyota'} {vehicule.modele || 'Hilux'}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <EnvironmentOutlined className="text-primary text-lg" />
                  <div className="flex-grow">
                    {isEditing ? (
                      <Form.Item name="immatriculation" className="mb-0">
                        <Input placeholder="Immatriculation" className="!rounded-none" />
                      </Form.Item>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500">Immatriculation</p>
                        <p className="font-medium">{vehicule.immatriculation || 'DK-2024-AA'}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarOutlined className="text-primary text-lg" />
                  <div className="flex-grow">
                    {isEditing ? (
                      <Form.Item name="miseEnService" className="mb-0">
                        <DatePicker 
                          className="w-full !rounded-none" 
                          format="DD/MM/YYYY"
                          placeholder="Sélectionner une date"
                          allowClear={false}
                        />
                      </Form.Item>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500">Mise en service</p>
                        <p className="font-medium">{vehicule.miseEnService || '01/01/2024'}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* État et maintenance */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">État et maintenance</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <Form.Item name="etat" className="mb-0 w-full">
                      <Input placeholder="État du véhicule" className="!rounded-none" />
                    </Form.Item>
                  ) : (
                    <Tag 
                      color={
                        vehicule.etat === 'Disponible' ? 'success' : 
                        vehicule.etat === 'En course' ? 'processing' : 
                        'warning'
                      } 
                      className="!rounded-none"
                      icon={<CheckCircleOutlined />}
                    >
                      {vehicule.etat || 'Disponible'}
                    </Tag>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <ToolOutlined className="text-primary text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">Dernière maintenance</p>
                    <p className="font-medium">{stats.derniereMaintenance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DashboardOutlined className="text-primary text-lg" />
                  <div>
                    <p className="text-sm text-gray-500">Prochaine révision</p>
                    <p className="font-medium">{stats.prochaineRevision} km</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-500">Performance</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Consommation moyenne</p>
                  <div className="flex items-center gap-2">
                    <Progress 
                      type="circle" 
                      percent={75} 
                      width={64}
                      format={() => `${stats.consommationMoyenne}L`}
                      className="!rounded-none"
                    />
                    <span className="text-xs text-gray-500">
                      par 100km
                    </span>
                  </div>
                </div>
                <Divider className="my-3" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">État général</p>
                  <Progress 
                    percent={92} 
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#52c41a',
                    }}
                    className="!rounded-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Card>

      {/* Conducteur actuel avec design amélioré */}
      <Card 
        title={
          <div className="flex items-center gap-2">
            <UserOutlined className="text-primary" />
            Conducteur actuel
          </div>
        }
        bordered={false} 
        className="!rounded-none"
      >
        {vehicule.conducteur ? (
          <div className="flex items-center gap-6">
            <Avatar 
              size={80} 
              className="bg-primary shadow-lg"
              icon={<UserOutlined />}
            >
              {vehicule.conducteur.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">{vehicule.conducteur || 'John Doe'}</h3>
                  <Space className="mt-2">
                    <Tag color="blue" className="!rounded-none">
                      Expérimenté
                    </Tag>
                    <Tag color="green" className="!rounded-none">
                      4.8 ★
                    </Tag>
                  </Space>
                  <p className="text-gray-500 mt-2">
                    <ClockCircleOutlined className="mr-2" />
                    Assigné depuis le 15/01/2024
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-500">
                    <PhoneOutlined />
                    +221 77 123 45 67
                  </p>
                  <p className="flex items-center gap-2 text-gray-500">
                    <EnvironmentOutlined />
                    Dakar, Sénégal
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button 
                type="primary"
                className="!rounded-none"
                onClick={() => navigate(`/admin/conducteurs/${1}/details`)}
              >
                Voir le profil
              </Button>
              <Button 
                danger
                className="!rounded-none"
              >
                Désassigner
              </Button>
            </div>
          </div>
        ) : (
          <Alert
            message={
              <div className="flex items-center gap-2">
                <WarningOutlined className="text-warning" />
                <span className="font-medium">Aucun conducteur assigné</span>
              </div>
            }
            description="Ce véhicule n'est actuellement assigné à aucun conducteur."
            type="warning"
            showIcon={false}
            className="!rounded-none"
            action={
              <Button type="primary" className="!rounded-none">
                Assigner un conducteur
              </Button>
            }
          />
        )}
      </Card>
    </div>
  );
};

export default ApercuVehiculeComponent;
