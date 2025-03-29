import React from 'react';
import { Table, Button, Input, Space, Card, Tag, Progress, Statistic, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  SearchOutlined, 
  UserAddOutlined, 
  CarOutlined, 
  StarFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
  FilterOutlined,
  DownloadOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const Conducteurs = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      sorter: true,
      render: (nom, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
            <UserAddOutlined className="text-lg text-gray-500" />
          </div>
          <div>
            <p className="font-medium text-gray-800">{nom}</p>
            <p className="text-xs text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'telephone',
      key: 'telephone',
      render: (telephone, record) => (
        <div>
          <p className="font-medium">{telephone}</p>
          <p className="text-xs text-gray-500">{record.email}</p>
        </div>
      ),
    },
    {
      title: 'Véhicule',
      dataIndex: 'vehicule',
      key: 'vehicule',
      render: (vehicule) => (
        <div className="flex items-center gap-2">
          <CarOutlined className="text-primary" />
          <span>{vehicule}</span>
        </div>
      ),
    },
    {
      title: 'Performance',
      dataIndex: 'note',
      key: 'note',
      sorter: true,
      render: (note) => (
        <div className="flex items-center gap-2">
          <StarFilled className="text-yellow-400" />
          <span className="font-medium">{note}</span>
          <Progress 
            percent={note * 20} 
            size="small" 
            showInfo={false}
            strokeColor="#faad14"
            className="w-20 !rounded-none"
          />
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut) => (
        <Tag 
          icon={
            statut === 'Actif' ? <CheckCircleOutlined /> : 
            statut === 'Inactif' ? <StopOutlined /> : 
            <ClockCircleOutlined />
          }
          color={
            statut === 'Actif' ? 'success' : 
            statut === 'Inactif' ? 'error' : 
            'warning'
          }
          className="!rounded-none px-3 py-1"
        >
          {statut}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Voir les détails">
            <Button 
              type="default" 
              className="!rounded-none border-primary text-primary"
              onClick={() => navigate(`/admin/conducteurs/${record.key}/details`)}
            >
              Détails
            </Button>
          </Tooltip>
          {record.statut === 'Actif' && (
            <Tooltip title="Suspendre le conducteur">
              <Button type="default" className="!rounded-none border-red-500 text-red-500">
                Suspendre
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      nom: 'John Doe',
      telephone: '+221 77 123 45 67',
      email: 'john.doe@example.com',
      statut: 'Actif',
      vehicule: 'Toyota Corolla',
      note: 4.8,
    },
    {
      key: '2',
      nom: 'Jane Smith',
      telephone: '+221 77 234 56 78',
      email: 'jane.smith@example.com',
      statut: 'En cours',
      vehicule: 'Honda Civic',
      note: 4.5,
    },
    // ... existing data ...
  ];

  const stats = [
    {
      title: 'Total Conducteurs',
      value: 45,
      icon: <UserAddOutlined className="text-2xl" />,
      color: 'blue',
      suffix: 'actifs'
    },
    {
      title: 'Note Moyenne',
      value: 4.6,
      icon: <StarFilled className="text-2xl" />,
      color: 'yellow',
      suffix: '/ 5.0'
    },
    {
      title: 'Véhicules Assignés',
      value: 38,
      icon: <CarOutlined className="text-2xl" />,
      color: 'cyan',
      suffix: 'en service'
    },
    {
      title: 'Taux d\'Activité',
      value: 92,
      icon: <CheckCircleOutlined className="text-2xl" />,
      color: 'green',
      suffix: '%'
    }
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

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-clash font-semibold text-gray-800 mb-2">
              Gestion des conducteurs
            </h1>
            <p className="text-gray-500">Gérez vos conducteurs, leurs performances et leurs statuts</p>
          </div>
          <div className="flex gap-4">
            <Button 
              type="default"
              icon={<DownloadOutlined />}
              className="!rounded-none"
            >
              Exporter
            </Button>
            <Button 
              type="primary"
              icon={<UserAddOutlined />}
              className="!rounded-none"
              onClick={() => navigate('/admin/conducteurs/nouveau')}
            >
              Nouveau conducteur
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
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
                             stat.color === 'blue' ? '#1890ff' :
                             '#13c2c2'
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

        {/* Widgets supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Widget Conducteurs récents */}
          <Card 
            title="Derniers conducteurs ajoutés" 
            bordered={false} 
            className="!rounded-none"
            extra={<Button type="link" className="text-primary">Voir tout</Button>}
          >
            <div className="flex flex-col gap-4">
              {data.slice(0, 3).map((conducteur, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
                      <UserAddOutlined className="text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{conducteur.nom}</p>
                      <p className="text-xs text-gray-500">{conducteur.telephone}</p>
                    </div>
                  </div>
                  <Tag color={conducteur.statut === 'Actif' ? 'success' : 'warning'} className="!rounded-none">
                    {conducteur.statut}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>

          {/* Widget Performance */}
          <Card 
            title="Meilleures performances" 
            bordered={false} 
            className="!rounded-none"
            extra={<Button type="link" className="text-primary">Détails</Button>}
          >
            <div className="flex flex-col gap-4">
              {data
                .sort((a, b) => b.note - a.note)
                .slice(0, 3)
                .map((conducteur, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-50 flex items-center justify-center">
                        <StarFilled className="text-yellow-400" />
                      </div>
                      <span className="font-medium">{conducteur.nom}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{conducteur.note}</span>
                      <Progress 
                        percent={conducteur.note * 20} 
                        size="small" 
                        showInfo={false}
                        strokeColor="#faad14"
                        className="w-16 !rounded-none"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Widget Activité */}
          <Card 
            title="Activité récente" 
            bordered={false} 
            className="!rounded-none"
            extra={<Button type="link" className="text-primary">Tout voir</Button>}
          >
            <div className="flex flex-col gap-4">
              {[
                { action: 'Nouveau conducteur ajouté', time: 'Il y a 2h', icon: <UserAddOutlined className="text-blue-500" /> },
                { action: 'Véhicule assigné', time: 'Il y a 3h', icon: <CarOutlined className="text-cyan-500" /> },
                { action: 'Performance mise à jour', time: 'Il y a 5h', icon: <StarFilled className="text-yellow-400" /> }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50">
                  <div className="w-8 h-8 bg-gray-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card bordered={false} className="!rounded-none mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <Button 
                icon={<FilterOutlined />}
                className="!rounded-none"
              >
                Filtres
              </Button>
              <Tag color="blue" className="!rounded-none">Actifs uniquement</Tag>
              <Tag color="purple" className="!rounded-none">Note &gt; 4.5</Tag>
            </div>
            <Input
              placeholder="Rechercher un conducteur..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="!rounded-none w-full md:w-64"
            />
          </div>
        </Card>

        {/* Table */}
        <Card bordered={false} className="!rounded-none">
          <Table 
            columns={columns} 
            dataSource={data}
            className="!rounded-none"
            pagination={{
              total: 100,
              pageSize: 10,
              className: "!rounded-none",
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} conducteurs`
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Conducteurs; 