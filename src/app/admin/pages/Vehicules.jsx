import React from 'react';
import { Table, Button, Input, Space, Tag, Card, Row, Col, Statistic, Progress, Alert } from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  CarOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  SyncOutlined,
  ArrowLeftOutlined,
  AlertOutlined,
  WarningOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Vehicules = () => {
  const navigate = useNavigate();

  const statsCards = [
    {
      title: 'Total Véhicules',
      value: 32,
      icon: <CarOutlined className="text-2xl" />,
      color: 'blue',
      suffix: 'véhicules'
    },
    {
      title: 'En Service',
      value: 28,
      icon: <CheckCircleOutlined className="text-2xl" />,
      color: 'green',
      suffix: 'actifs'
    },
    {
      title: 'En Maintenance',
      value: 4,
      icon: <ToolOutlined className="text-2xl" />,
      color: 'yellow',
      suffix: 'véhicules'
    },
    {
      title: 'Taux d\'utilisation',
      value: 87,
      icon: <ClockCircleOutlined className="text-2xl" />,
      color: 'blue',
      suffix: '%'
    },
  ];

  const maintenanceAlerts = [
    {
      vehicule: 'Toyota Corolla (DK-123-AB)',
      type: 'Révision',
      echeance: '2 jours',
      priorite: 'high',
      kilometrage: '45,000 km',
    },
    {
      vehicule: 'Honda Civic (DK-456-CD)',
      type: 'Vidange',
      echeance: '5 jours',
      priorite: 'medium',
      kilometrage: '32,000 km',
    },
    {
      vehicule: 'Hyundai Tucson (DK-789-EF)',
      type: 'Pneus',
      echeance: '7 jours',
      priorite: 'low',
      kilometrage: '28,000 km',
    },
  ];

  const columns = [
    {
      title: 'Véhicule',
      dataIndex: 'vehicule',
      key: 'vehicule',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100">
            <CarOutlined className="text-lg text-primary" />
          </div>
          <div>
            <div className="font-medium">{record.marque} {record.modele}</div>
            <div className="text-xs text-gray-500">{record.immatriculation}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'État',
      dataIndex: 'etat',
      key: 'etat',
      width: 150,
      render: (etat) => (
        <Tag 
          color={
            etat === 'Disponible' ? 'success' : 
            etat === 'En course' ? 'processing' : 
            etat === 'En maintenance' ? 'warning' : 
            'default'
          }
          className="!rounded-none"
          icon={
            etat === 'Disponible' ? <CheckCircleOutlined /> : 
            etat === 'En course' ? <SyncOutlined spin /> : 
            etat === 'En maintenance' ? <ToolOutlined /> : 
            null
          }
        >
          {etat}
        </Tag>
      ),
    },
    {
      title: 'Conducteur',
      dataIndex: 'conducteur',
      key: 'conducteur',
      width: 200,
      render: (conducteur) => (
        conducteur ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              {conducteur.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="font-medium">{conducteur}</div>
          </div>
        ) : (
          <Tag className="!rounded-none" color="default">Non assigné</Tag>
        )
      ),
    },
    {
      title: 'Localisation',
      dataIndex: 'localisation',
      key: 'localisation',
      width: 200,
      render: (localisation) => (
        <div className="flex items-center gap-2">
          <EnvironmentOutlined className="text-gray-400" />
          <span>{localisation}</span>
        </div>
      ),
    },
    {
      title: 'Kilométrage',
      dataIndex: 'kilometrage',
      key: 'kilometrage',
      width: 150,
      render: (km) => (
        <div className="font-medium">{km.toLocaleString()} km</div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary"
            className="!rounded-none"
            onClick={() => navigate(`/admin/vehicules/:id/details`)}
          >
            Détails
          </Button>
          <Button 
            className="!rounded-none border-yellow-500 text-yellow-500 hover:!text-yellow-600 hover:!border-yellow-600"
            icon={<ToolOutlined />}
          >
            Maintenance
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      marque: 'Toyota',
      modele: 'Corolla',
      immatriculation: 'DK-123-AB',
      annee: '2020',
      etat: 'Disponible',
      conducteur: 'John Doe',
      localisation: 'Dakar, Plateau',
      kilometrage: 45000,
    },
    {
      key: '2',
      marque: 'Honda',
      modele: 'Civic',
      immatriculation: 'DK-456-CD',
      annee: '2021',
      etat: 'En course',
      conducteur: 'Jane Smith',
      localisation: 'Dakar, Almadies',
      kilometrage: 32000,
    },
    {
      key: '3',
      marque: 'Hyundai',
      modele: 'Tucson',
      immatriculation: 'DK-789-EF',
      annee: '2022',
      etat: 'En maintenance',
      conducteur: null,
      localisation: 'Atelier Central',
      kilometrage: 28000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Bouton retour */}
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin')}
          className="!rounded-none mb-6 border-primary text-primary hover:text-primary hover:border-primary"
        >
          Retour au tableau de bord
        </Button>

        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-clash font-semibold text-gray-800 mb-1">
              Gestion des véhicules
            </h1>
            <p className="text-gray-500">Gérez votre flotte de véhicules et suivez leur état en temps réel</p>
          </div>
          <div className="flex gap-4">
            <Button 
              icon={<FilterOutlined />}
              className="!rounded-none"
            >
              Filtres
            </Button>
            <Button 
              type="primary"
              icon={<PlusOutlined />}
              className="!rounded-none"
              onClick={() => navigate('/admin/vehicules/nouveau')}
            >
              Nouveau véhicule
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsCards.map((stat, index) => (
            <Card 
              key={index}
              bordered={false}
              className="!rounded-none hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
                  <Statistic 
                    value={stat.value} 
                    suffix={stat.suffix}
                    valueStyle={{ 
                      color: stat.color === 'yellow' ? '#faad14' :
                             stat.color === 'green' ? '#52c41a' :
                             '#1890ff'
                    }}
                  />
                </div>
                <div className={`p-2 bg-${stat.color}-50`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Widget d'alertes et état de la flotte */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Alertes de maintenance */}
          <div className="md:col-span-2">
            <Card 
              bordered={false} 
              className="!rounded-none h-[400px] flex flex-col"
              title={
                <div className="flex items-center gap-2">
                  <AlertOutlined className="text-primary" />
                  <span className="font-clash">Alertes de maintenance</span>
                </div>
              }
              extra={
                <Tag icon={<BellOutlined />} color="warning" className="!rounded-none">
                  3 alertes en attente
                </Tag>
              }
              bodyStyle={{ flex: 1, overflow: 'auto' }}
            >
              <div className="space-y-4">
                {maintenanceAlerts.map((alert, index) => (
                  <Alert
                    key={index}
                    message={
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{alert.vehicule}</div>
                          <div className="text-sm text-gray-500">
                            {alert.type} - Échéance: {alert.echeance} - {alert.kilometrage}
                          </div>
                        </div>
                        <Space>
                          <Button 
                            size="small" 
                            icon={<ToolOutlined />}
                            className="!rounded-none"
                          >
                            Planifier
                          </Button>
                        </Space>
                      </div>
                    }
                    type={
                      alert.priorite === 'high' ? 'error' :
                      alert.priorite === 'medium' ? 'warning' :
                      'info'
                    }
                    showIcon
                    className="!rounded-none"
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* État de la flotte */}
          <Card 
            bordered={false} 
            className="!rounded-none h-[400px] flex flex-col"
            title={
              <div className="flex items-center gap-2">
                <CarOutlined className="text-primary" />
                <span className="font-clash">État de la flotte</span>
              </div>
            }
            bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Disponibilité</span>
                  <span className="font-medium">87%</span>
                </div>
                <Progress 
                  percent={87} 
                  strokeColor="#52c41a"
                  className="!rounded-none"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Maintenance préventive</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress 
                  percent={92} 
                  strokeColor="#1890ff"
                  className="!rounded-none"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">État général</span>
                  <span className="font-medium">95%</span>
                </div>
                <Progress 
                  percent={95} 
                  strokeColor="#722ed1"
                  className="!rounded-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t mt-auto">
              <p className="text-sm text-gray-500 mb-2">Prochaine maintenance</p>
              <div className="flex items-center justify-between">
                <span className="font-medium">Toyota Corolla</span>
                <Tag color="warning" className="!rounded-none">Dans 2 jours</Tag>
              </div>
            </div>
          </Card>
        </div>

        {/* Tableau des véhicules */}
        <Card 
          bordered={false} 
          className="!rounded-none"
          title={
            <div className="flex items-center justify-between">
              <span className="font-clash">Liste des véhicules</span>
              <Input
                placeholder="Rechercher un véhicule"
                prefix={<SearchOutlined className="text-gray-400" />}
                className="!rounded-none w-64"
              />
            </div>
          }
        >
          <Table 
            columns={columns} 
            dataSource={data}
            className="!rounded-none"
            pagination={{
              total: 100,
              pageSize: 10,
              className: "[&_.ant-pagination-item]:!rounded-none [&_.ant-pagination-prev_.ant-pagination-item-link]:!rounded-none [&_.ant-pagination-next_.ant-pagination-item-link]:!rounded-none",
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Vehicules; 