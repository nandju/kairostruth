import React, { useState } from 'react';
import { 
  Card, 
  Statistic, 
  Table, 
  Tag, 
  Button, 
  Select, 
  Input, 
  DatePicker, 
  Tooltip, 
  Space,
  Empty,
  Modal,
  Descriptions,
  Avatar,
  Divider
} from 'antd';
import { 
  CarOutlined, 
  ClockCircleOutlined, 
  PercentageOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  DollarOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/fr_FR';
import DetailsCourseModal from './modals/DetailsCourseModal';

const { RangePicker } = DatePicker;

const HistoriqueVehiculeComponent = ({ vehicule = {} }) => {
  // États pour les filtres
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  
  // État pour le modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Gestionnaires d'événements pour le modal
  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Valeurs par défaut pour les statistiques avec gestion des undefined
  const stats = {
    kilometrage: vehicule?.kilometrage || 0,
    nombreCourses: vehicule?.nombreCourses || 0,
    tauxUtilisation: vehicule?.tauxUtilisation || 0
  };

  // Données de test pour la table
  const coursesData = [
    {
      key: '1',
      date: '20/03/2024',
      conducteur: 'John Doe',
      distance: 25,
      duree: '45 min',
      statut: 'Terminée',
      depart: 'Almadies',
      destination: 'Plateau',
      cout: 15000
    },
    {
      key: '2',
      date: '19/03/2024',
      conducteur: 'John Doe',
      distance: 18,
      duree: '30 min',
      statut: 'Terminée',
      depart: 'Point E',
      destination: 'Médina',
      cout: 12000
    },
    {
      key: '3',
      date: '19/03/2024',
      conducteur: 'Marie Diop',
      distance: 35,
      duree: '1h',
      statut: 'En cours',
      depart: 'Ouakam',
      destination: 'Rufisque',
      cout: 25000
    }
  ];

  // Colonnes de la table avec des fonctionnalités améliorées
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => (
        <Space>
          <CalendarOutlined className="text-gray-400" />
          {date}
        </Space>
      )
    },
    {
      title: 'Conducteur',
      dataIndex: 'conducteur',
      key: 'conducteur',
      filterable: true
    },
    {
      title: 'Trajet',
      key: 'trajet',
      render: (_, record) => (
        <Tooltip title={`De ${record.depart} à ${record.destination}`}>
          <span className="text-sm">
            {record.depart} → {record.destination}
          </span>
        </Tooltip>
      )
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
      sorter: (a, b) => a.distance - b.distance,
      render: (distance) => (
        <span className="font-medium">
          {distance} <span className="text-gray-500">km</span>
        </span>
      )
    },
    {
      title: 'Durée',
      dataIndex: 'duree',
      key: 'duree',
      render: (duree) => (
        <Space>
          <ClockCircleOutlined className="text-gray-400" />
          {duree}
        </Space>
      )
    },
    {
      title: 'Coût',
      dataIndex: 'cout',
      key: 'cout',
      sorter: (a, b) => a.cout - b.cout,
      render: (cout) => (
        <span className="font-medium">
          {cout.toLocaleString()} <span className="text-gray-500">FCFA</span>
        </span>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      filters: [
        { text: 'Terminée', value: 'Terminée' },
        { text: 'En cours', value: 'En cours' },
        { text: 'Annulée', value: 'Annulée' }
      ],
      onFilter: (value, record) => record.statut === value,
      render: (statut) => (
        <Tag 
          color={
            statut === 'Terminée' ? 'success' : 
            statut === 'En cours' ? 'processing' : 
            'error'
          } 
          className="!rounded-none"
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
              className="text-gray-600 hover:text-primary"
              onClick={() => handleOpenModal(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques d'utilisation avec design amélioré */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <CarOutlined className="text-primary" />
                Distance totale
              </span>
            }
            value={stats.kilometrage}
            suffix="km"
            valueStyle={{ color: '#1890ff' }}
          />
          <div className="mt-2 text-xs text-gray-500">
            +125 km cette semaine
          </div>
        </Card>
        
        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <ClockCircleOutlined className="text-success" />
                Courses totales
              </span>
            }
            value={stats.nombreCourses}
            valueStyle={{ color: '#52c41a' }}
          />
          <div className="mt-2 text-xs text-gray-500">
            +8 courses cette semaine
          </div>
        </Card>
        
        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <PercentageOutlined className="text-warning" />
                Taux d'utilisation
              </span>
            }
            value={stats.tauxUtilisation}
            suffix="%"
            valueStyle={{ color: '#faad14' }}
          />
          <div className="mt-2 text-xs text-gray-500">
            +5% par rapport au mois dernier
          </div>
        </Card>
      </div>

      {/* Filtres et recherche avec design moderne */}
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
                { value: 'cancelled', label: 'Annulées' }
              ]}
              suffixIcon={<FilterOutlined />}
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
              placeholder="Rechercher une course..."
              className="w-full md:w-64 [&_.ant-input]:!rounded-none [&_.ant-input-search-button]:!rounded-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined className="text-gray-400" />}
            />
            <Tooltip title="Exporter l'historique">
              <Button 
                icon={<DownloadOutlined />} 
                className="!rounded-none border-gray-300"
              >
                Exporter
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card>

      {/* Tableau des courses avec design raffiné */}
      <Card 
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Historique des courses</span>
            <span className="text-sm text-gray-500">
              {coursesData.length} courses au total
            </span>
          </div>
        }
        bordered={false} 
        className="!rounded-none"
      >
        <Table
          columns={columns}
          dataSource={coursesData}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total} courses`,
            className: "!rounded-none"
          }}
          className="!rounded-none"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Aucune course trouvée"
              />
            )
          }}
          onChange={(pagination, filters, sorter) => {
            console.log('Table params:', { pagination, filters, sorter });
          }}
        />
      </Card>

      {/* Modal de détails de la course */}
      <DetailsCourseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        course={selectedCourse}
      />
    </div>
  );
};

export default HistoriqueVehiculeComponent;
