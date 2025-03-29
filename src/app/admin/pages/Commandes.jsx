import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Card, 
  Select, 
  DatePicker, 
  Tooltip,
  Progress,
  Avatar,
  Statistic
} from 'antd';
import { 
  SearchOutlined, 
  DollarOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CarOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  RiseOutlined,
  EnvironmentOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

const Commandes = () => {
  const navigate = useNavigate();
  // États pour les filtres
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);

  const columns = [
    {
      title: 'N° Commande',
      dataIndex: 'numero',
      key: 'numero',
      width: 120,
      render: (numero) => (
        <span className="font-medium text-primary">{numero}</span>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      sorter: true,
      render: (client) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{client.nom}</div>
            <div className="text-xs text-gray-500">{client.telephone}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag 
          color={type === 'Location' ? 'blue' : 'purple'}
          className="!rounded-none"
        >
          {type}
        </Tag>
      ),
    },
    {
      title: 'Trajet',
      key: 'trajet',
      render: (_, record) => (
        <Tooltip title={`De ${record.depart} à ${record.destination}`}>
          <div className="flex items-center gap-2">
            <EnvironmentOutlined className="text-gray-400" />
            <span className="text-sm">
              {record.depart} → {record.destination}
            </span>
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      sorter: true,
      render: (montant) => (
        <div className="font-medium">
          {montant.toLocaleString()} <span className="text-gray-500">FCFA</span>
        </div>
      ),
    },
    {
      title: 'Progression',
      dataIndex: 'progression',
      key: 'progression',
      render: (_, record) => {
        const config = {
          'Terminée': { percent: 100, status: 'success' },
          'En cours': { percent: 50, status: 'active' },
          'En attente': { percent: 0, status: 'normal' },
          'Annulée': { percent: 100, status: 'exception' }
        };
        
        const progressConfig = config[record.statut] || { percent: 0, status: 'normal' };
        
        return (
          <Progress 
            percent={progressConfig.percent} 
            status={progressConfig.status}
            size="small"
            className="!rounded-none w-24"
          />
        );
      }
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut) => (
        <Tag 
          color={
            statut === 'Terminée' ? 'success' : 
            statut === 'En cours' ? 'processing' : 
            statut === 'En attente' ? 'warning' : 
            statut === 'Annulée' ? 'error' : 
            'default'
          }
          className="!rounded-none"
        >
          {statut}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              className="text-gray-600 hover:text-primary"
            />
          </Tooltip>
          {record.statut === 'En attente' && (
            <Button 
              type="text" 
              danger
              className="hover:text-red-500"
            >
              Annuler
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      numero: 'CMD-001',
      client: {
        nom: 'Alice Johnson',
        telephone: '+221 77 123 45 67',
      },
      type: 'Course',
      depart: 'Aéroport LSS',
      destination: 'Almadies',
      montant: 15000,
      statut: 'Terminée',
    },
    {
      key: '2',
      numero: 'CMD-002',
      client: {
        nom: 'Bob Wilson',
        telephone: '+221 77 234 56 78',
      },
      type: 'Location',
      depart: 'Point E',
      destination: 'Saly',
      montant: 45000,
      statut: 'En cours',
    },
    {
      key: '3',
      numero: 'CMD-003',
      client: {
        nom: 'Marie Diop',
        telephone: '+221 77 345 67 89',
      },
      type: 'Course',
      depart: 'Plateau',
      destination: 'Ouakam',
      montant: 5000,
      statut: 'En attente',
    },
  ];

  const stats = [
    {
      title: 'Commandes du jour',
      value: 24,
      suffix: '',
      prefix: <ClockCircleOutlined className="text-blue-500" />,
      color: '#1890ff',
      trend: '+12%',
      trendUp: true,
      description: '+3 par rapport à hier'
    },
    {
      title: 'Commandes en cours',
      value: 8,
      suffix: '',
      prefix: <CarOutlined className="text-yellow-500" />,
      color: '#faad14',
      trend: '0%',
      trendUp: null,
      description: 'Stable depuis hier'
    },
    {
      title: 'Commandes terminées',
      value: 16,
      suffix: '',
      prefix: <CheckCircleOutlined className="text-green-500" />,
      color: '#52c41a',
      trend: '+8%',
      trendUp: true,
      description: '+2 par rapport à hier'
    },
    {
      title: 'Chiffre d\'affaires',
      value: 325000,
      suffix: ' FCFA',
      prefix: <DollarOutlined className="text-primary" />,
      color: '#1890ff',
      trend: '+15%',
      trendUp: true,
      description: '+45,000 FCFA aujourd\'hui'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Bouton retour */}
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin')}
          className="!rounded-none mb-6 border-primary text-primary hover:text-primary hover:border-primary"
        >
          Retour au tableau de bord
        </Button>

        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-clash font-semibold text-gray-800 mb-1">
              Gestion des commandes
            </h1>
            <p className="text-gray-500">
              Gérez et suivez toutes vos commandes en temps réel
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              icon={<FilterOutlined />}
              className="!rounded-none"
            >
              Filtres
            </Button>
            <Button 
              icon={<DownloadOutlined />}
              className="!rounded-none"
            >
              Exporter
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              bordered={false} 
              className="!rounded-none hover:shadow-md transition-shadow"
            >
              <Statistic
                title={
                  <span className="flex items-center gap-2">
                    {stat.prefix}
                    {stat.title}
                  </span>
                }
                value={stat.value}
                suffix={stat.suffix}
                valueStyle={{ color: stat.color }}
                prefix={
                  stat.trend && (
                    <Tooltip title={stat.description}>
                      {stat.trendUp ? (
                        <RiseOutlined className="text-success" />
                      ) : stat.trendUp === false ? (
                        <RiseOutlined className="text-error rotate-180" />
                      ) : null}
                    </Tooltip>
                  )
                }
              />
              <div className="mt-2 text-xs text-gray-500">
                {stat.description}
              </div>
            </Card>
          ))}
        </div>

        {/* Filtres et recherche */}
        <Card bordered={false} className="!rounded-none">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-40 [&_.ant-select-selector]:!rounded-none"
                placeholder="Statut"
                allowClear
                options={[
                  { value: 'all', label: 'Tous les statuts' },
                  { value: 'completed', label: 'Terminées' },
                  { value: 'ongoing', label: 'En cours' },
                  { value: 'pending', label: 'En attente' },
                  { value: 'cancelled', label: 'Annulées' }
                ]}
                suffixIcon={<FilterOutlined />}
              />
              <Select
                defaultValue="all"
                className="w-40 [&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'all', label: 'Tous les types' },
                  { value: 'course', label: 'Courses' },
                  { value: 'location', label: 'Locations' }
                ]}
              />
              <RangePicker 
                className="[&_.ant-picker]:!rounded-none"
                onChange={(dates) => setDateRange(dates)}
                placeholder={['Date début', 'Date fin']}
              />
            </div>
            <div className="flex gap-4 items-center w-full md:w-auto">
              <Input.Search
                placeholder="Rechercher une commande..."
                className="w-full md:w-64 [&_.ant-input]:!rounded-none [&_.ant-input-search-button]:!rounded-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
              />
            </div>
          </div>
        </Card>

        {/* Tableau des commandes */}
        <Card 
          bordered={false} 
          className="!rounded-none"
          title={
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Liste des commandes</span>
              <span className="text-sm text-gray-500">
                Total: {data.length} commandes
              </span>
            </div>
          }
        >
          <Table 
            columns={columns} 
            dataSource={data}
            className="[&_.ant-table-thead_.ant-table-cell]:!bg-gray-50 [&_.ant-table]:!rounded-none [&_.ant-table-container]:!rounded-none"
            pagination={{
              total: data.length,
              pageSize: 10,
              className: '[&_.ant-pagination-item]:!rounded-none [&_.ant-pagination-prev_.ant-pagination-item-link]:!rounded-none [&_.ant-pagination-next_.ant-pagination-item-link]:!rounded-none',
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Commandes; 