import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Input, 
  Space, 
  Tag, 
  Card, 
  Statistic, 
  Select, 
  DatePicker, 
  Tooltip,
  Badge,
  Dropdown,
  Menu,
  Modal,
  Form,
  notification,
  Alert,
  Avatar,
  Timeline,
  Progress,
  Tabs,
  Row,
  Col,
  Divider,
  Rate
} from 'antd';
import { 
  SearchOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  CarOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  MoreOutlined,
  RiseOutlined,
  FallOutlined,
  BellOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  StarOutlined,
  MessageOutlined,
  ArrowLeftOutlined,
  PlusOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/fr_FR';
import dayjs from 'dayjs';
import AssignDriverModal from './details/components/modals/AssignDriverModal';
import DetailsReservationModal from './details/components/modals/DetailsReservationModal';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Reservations = () => {
  // États
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [periodStats, setPeriodStats] = useState('month');

  const navigate = useNavigate();

  // Fonction pour afficher les notifications
  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight',
      className: '!rounded-none'
    });
  };

  // Fonction pour assigner un conducteur
  const handleAssign = (reservationId, conducteurId) => {
    showNotification(
      'success',
      'Conducteur assigné',
      'La réservation a été assignée avec succès au conducteur.'
    );
    setIsAssignModalVisible(false);
  };

  // Fonction pour annuler une réservation
  const handleCancel = (reservationId) => {
    Modal.confirm({
      title: 'Êtes-vous sûr de vouloir annuler cette réservation ?',
      icon: <ExclamationCircleOutlined />,
      content: 'Cette action est irréversible.',
      okText: 'Oui',
      okType: 'danger',
      cancelText: 'Non',
      onOk() {
        showNotification(
          'info',
          'Réservation annulée',
          'La réservation a été annulée avec succès.'
        );
      },
    });
  };

  // Fonction pour confirmer une réservation
  const handleConfirm = (reservationId) => {
    showNotification(
      'success',
      'Réservation confirmée',
      'La réservation a été confirmée avec succès.'
    );
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Confirmée': return 'success';
      case 'En attente': return 'warning';
      case 'En cours': return 'processing';
      case 'Terminée': return 'default';
      case 'Annulée': return 'error';
      default: return 'default';
    }
  };

  // Données de test pour les conducteurs disponibles
  const availableDrivers = [
    {
      id: 1,
      nom: 'John Doe',
      rating: 4.8,
      courses: 156,
      disponible: true,
      photo: null
    },
    {
      id: 2,
      nom: 'Marie Diop',
      rating: 4.9,
      courses: 203,
      disponible: true,
      photo: null
    }
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id) => <span className="font-medium text-primary">{id}</span>
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (client) => (
        <Space>
          <Avatar icon={<UserOutlined />} className="bg-primary" />
          <div>
            <div className="font-medium">{client.nom}</div>
            <div className="text-xs text-gray-500">{client.telephone}</div>
          </div>
        </Space>
      )
    },
    {
      title: 'Véhicule',
      dataIndex: 'vehicule',
      key: 'vehicule',
      render: (vehicule) => (
        <Space direction="vertical" size="small">
          <div className="flex items-center gap-2">
            <CarOutlined className="text-primary" />
            <span className="font-medium">{vehicule.marque} {vehicule.modele}</span>
          </div>
          <Tag className="!rounded-none" color="blue">
            {vehicule.immatriculation}
          </Tag>
        </Space>
      )
    },
    {
      title: 'Période',
      dataIndex: 'periode',
      key: 'periode',
      render: (periode) => (
        <Space direction="vertical" size="small">
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-gray-400" />
            <span>Du: {periode.debut}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-gray-400" />
            <span>Au: {periode.fin}</span>
          </div>
          <Tag className="!rounded-none" color="purple">
            {periode.duree} jours
          </Tag>
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag 
          color={type === 'Avec conducteur' ? 'processing' : 'success'} 
          className="!rounded-none"
          icon={type === 'Avec conducteur' ? <UserOutlined /> : <CarOutlined />}
        >
          {type}
        </Tag>
      )
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: (montant) => (
        <div className="space-y-1">
          <div className="font-medium text-success">
            {montant.total.toLocaleString()} FCFA
          </div>
          <div className="text-xs text-gray-500">
            {montant.parJour.toLocaleString()} FCFA/jour
          </div>
        </div>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut) => (
        <Tag 
          color={getStatusColor(statut)}
          className="!rounded-none"
          icon={
            statut === 'Confirmée' ? <CheckCircleOutlined /> :
            statut === 'En cours' ? <ClockCircleOutlined /> :
            undefined
          }
        >
          {statut}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedReservation(record);
                setIsDetailsModalVisible(true);
              }}
              className="text-gray-600 hover:text-primary"
            />
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item 
                  key="1" 
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleConfirm(record.id)}
                >
                  Confirmer
                </Menu.Item>
                {record.type === 'Avec conducteur' && (
                  <Menu.Item 
                    key="2" 
                    icon={<CarOutlined />}
                    onClick={() => {
                      setSelectedReservation(record);
                      setIsAssignModalVisible(true);
                    }}
                  >
                    Assigner un conducteur
                  </Menu.Item>
                )}
                <Menu.Item 
                  key="3" 
                  icon={<MessageOutlined />}
                >
                  Contacter le client
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item 
                  key="4" 
                  icon={<DeleteOutlined />} 
                  danger
                  onClick={() => handleCancel(record.id)}
                >
                  Annuler
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button 
              type="text" 
              icon={<MoreOutlined />}
              className="text-gray-600"
            />
          </Dropdown>
        </Space>
      )
    }
  ];

  // Données de test enrichies pour les locations de voiture
  const data = [
    {
      key: '1',
      id: 'LOC-001',
      client: {
        nom: 'Alice Johnson',
        telephone: '+221 77 123 45 67'
      },
      vehicule: {
        marque: 'Toyota',
        modele: 'Land Cruiser',
        immatriculation: 'DK-2024-AA'
      },
      periode: {
        debut: '15/03/2024',
        fin: '20/03/2024',
        duree: '5'
      },
      type: 'Avec conducteur',
      montant: {
        total: 250000,
        parJour: 50000
      },
      statut: 'Confirmée',
    },
    {
      key: '2',
      id: 'LOC-002',
      client: {
        nom: 'Bob Wilson',
        telephone: '+221 76 234 56 78'
      },
      vehicule: {
        marque: 'Hyundai',
        modele: 'Tucson',
        immatriculation: 'DK-2024-BB'
      },
      periode: {
        debut: '18/03/2024',
        fin: '25/03/2024',
        duree: '7'
      },
      type: 'Sans conducteur',
      montant: {
        total: 210000,
        parJour: 30000
      },
      statut: 'En attente',
    }
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-clash font-semibold text-gray-800 mb-1">
              Gestion des locations
            </h1>
            <p className="text-gray-500">Gérez vos locations de véhicules et suivez leur statut en temps réel</p>
          </div>
          <div className="flex gap-4">
            <Button 
              icon={<FilterOutlined />}
              className="!rounded-none"
            >
              Filtres
            </Button>
          </div>
        </div>

        {/* Notifications */}
        <Alert
          message="Nouvelles locations"
          description={
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>3 nouvelles demandes de location en attente</span>
                <Button size="small" type="primary" className="!rounded-none">
                  Voir tout
                </Button>
              </div>
            </div>
          }
          type="info"
          showIcon
          icon={<BellOutlined className="text-primary" />}
          className="!rounded-none"
        />

        {/* Statistiques */}
        <Card 
          bordered={false} 
          className="!rounded-none"
          title={
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Aperçu des performances</span>
              <Select
                value={periodStats}
                onChange={setPeriodStats}
                className="w-32 [&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'day', label: 'Aujourd\'hui' },
                  { value: 'week', label: 'Cette semaine' },
                  { value: 'month', label: 'Ce mois' },
                  { value: 'year', label: 'Cette année' }
                ]}
              />
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-6">
              <Statistic
                title={
                  <span className="flex items-center gap-2">
                    <Badge status="processing" />
                    Locations {periodStats === 'day' ? 'du jour' : 
                             periodStats === 'week' ? 'de la semaine' : 
                             periodStats === 'month' ? 'du mois' : 'de l\'année'}
                  </span>
                }
                value={periodStats === 'day' ? 8 : 
                       periodStats === 'week' ? 45 : 
                       periodStats === 'month' ? 180 : 2160}
                prefix={
                  <Tooltip title="En augmentation">
                    <RiseOutlined className="text-success" />
                  </Tooltip>
                }
                valueStyle={{ color: '#1890ff' }}
              />
              <Progress 
                percent={75} 
                showInfo={false}
                strokeColor="#1890ff"
                className="!rounded-none"
              />
              <div className="text-xs text-gray-500">
                +12% vs période précédente
              </div>
            </div>

            <div className="space-y-6">
              <Statistic
                title={
                  <span className="flex items-center gap-2">
                    <CarOutlined className="text-warning" />
                    Taux d'utilisation
                  </span>
                }
                value={periodStats === 'day' ? 85 : 
                       periodStats === 'week' ? 78 : 
                       periodStats === 'month' ? 80 : 75}
                suffix="%"
                valueStyle={{ color: '#faad14' }}
              />
              <Progress 
                percent={periodStats === 'day' ? 85 : 
                         periodStats === 'week' ? 78 : 
                         periodStats === 'month' ? 80 : 75} 
                showInfo={false}
                strokeColor="#faad14"
                className="!rounded-none"
              />
              <div className="text-xs text-gray-500">
                {periodStats === 'day' ? '12 véhicules en location' : 
                 periodStats === 'week' ? 'Moyenne de 10 véhicules/jour' : 
                 periodStats === 'month' ? 'Pic à 85% d\'utilisation' : 
                 'Performance stable sur l\'année'}
              </div>
            </div>

            <div className="space-y-6">
              <Statistic
                title={
                  <span className="flex items-center gap-2">
                    <Badge status="success" />
                    Taux de satisfaction
                  </span>
                }
                value={periodStats === 'day' ? 100 : 
                       periodStats === 'week' ? 95 : 
                       periodStats === 'month' ? 92 : 94}
                suffix="%"
                valueStyle={{ color: '#52c41a' }}
                prefix={
                  <Tooltip title="En augmentation">
                    <RiseOutlined className="text-success" />
                  </Tooltip>
                }
              />
              <Progress 
                percent={periodStats === 'day' ? 100 : 
                         periodStats === 'week' ? 95 : 
                         periodStats === 'month' ? 92 : 94} 
                showInfo={false}
                strokeColor="#52c41a"
                className="!rounded-none"
              />
              <div className="text-xs text-gray-500">
                Basé sur {periodStats === 'day' ? '8' : 
                         periodStats === 'week' ? '45' : 
                         periodStats === 'month' ? '180' : '2160'} avis clients
              </div>
            </div>

            <div className="space-y-6">
              <Statistic
                title={
                  <span className="flex items-center gap-2">
                    <DollarOutlined className="text-success" />
                    Revenus
                  </span>
                }
                value={periodStats === 'day' ? 450000 : 
                       periodStats === 'week' ? 2800000 : 
                       periodStats === 'month' ? 12500000 : 150000000}
                suffix="FCFA"
                valueStyle={{ color: '#52c41a' }}
              />
              <Progress 
                percent={85} 
                showInfo={false}
                strokeColor="#52c41a"
                className="!rounded-none"
              />
              <div className="text-xs text-gray-500">
                +{periodStats === 'day' ? '15' : 
                   periodStats === 'week' ? '12' : 
                   periodStats === 'month' ? '8' : '10'}% vs période précédente
              </div>
            </div>
          </div>
        </Card>

        {/* Filtres et recherche */}
        <Card bordered={false} className="!rounded-none">
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            className="!rounded-none"
          >
            <TabPane 
              tab={
                <span className="flex items-center gap-2">
                  <Badge status="default" />
                  Toutes
                </span>
              } 
              key="all"
            />
            <TabPane 
              tab={
                <span className="flex items-center gap-2">
                  <Badge status="warning" />
                  En attente
                </span>
              } 
              key="pending"
            />
            <TabPane 
              tab={
                <span className="flex items-center gap-2">
                  <Badge status="processing" />
                  En cours
                </span>
              } 
              key="ongoing"
            />
            <TabPane 
              tab={
                <span className="flex items-center gap-2">
                  <Badge status="success" />
                  Terminées
                </span>
              } 
              key="completed"
            />
          </Tabs>

          <Divider className="my-4" />

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-40 [&_.ant-select-selector]:!rounded-none"
                placeholder="Type de location"
                allowClear
                options={[
                  { value: 'all', label: 'Tous les types' },
                  { value: 'with_driver', label: 'Avec conducteur' },
                  { value: 'without_driver', label: 'Sans conducteur' }
                ]}
              />
              <RangePicker 
                locale={locale}
                className="[&_.ant-picker]:!rounded-none"
                onChange={(dates) => setDateRange(dates)}
                placeholder={['Date début', 'Date fin']}
              />
            </div>
            <div className="flex gap-4 items-center w-full md:w-auto">
              <Input.Search
                placeholder="Rechercher une location..."
                className="w-full md:w-64 [&_.ant-input]:!rounded-none [&_.ant-input-search-button]:!rounded-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
              />
              <Tooltip title="Exporter les locations">
                <Button 
                  icon={<DownloadOutlined />} 
                  className="!rounded-none"
                >
                  Exporter
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>

        {/* Tableau des locations */}
        <Card 
          bordered={false} 
          className="!rounded-none"
          title={
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Liste des locations</span>
              <Space>
                <Badge status="processing" text="Mise à jour en temps réel" />
                <span className="text-gray-500">
                  {data.length} locations
                </span>
              </Space>
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
              showSizeChanger: true,
              showTotal: (total) => `Total: ${total} locations`,
              className: "!rounded-none"
            }}
          />
        </Card>

        {/* Modaux */}
        <AssignDriverModal 
          isOpen={isAssignModalVisible}
          onClose={() => setIsAssignModalVisible(false)}
          onAssign={handleAssign}
          selectedReservation={selectedReservation}
          availableDrivers={availableDrivers}
        />
        <DetailsReservationModal 
          isOpen={isDetailsModalVisible}
          onClose={() => setIsDetailsModalVisible(false)}
          reservation={selectedReservation}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onAssign={() => setIsAssignModalVisible(true)}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
};

export default Reservations; 