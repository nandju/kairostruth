import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space, Button } from 'antd';
import { 
  UserOutlined, 
  CarOutlined, 
  ScheduleOutlined, 
  ShoppingOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  PlusOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  ToolOutlined,
  FileSearchOutlined,
  PrinterOutlined,
  WalletOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const cards = [
    {
      title: 'Conducteurs',
      icon: <UserOutlined className="text-4xl text-primary" />,
      description: 'Gérer les conducteurs',
      link: '/admin/conducteurs',
      count: 45,
      stats: {
        actifs: 38,
        enAttente: 7,
        progression: 84
      }
    },
    {
      title: 'Véhicules',
      icon: <CarOutlined className="text-4xl text-primary" />,
      description: 'Gérer la flotte',
      link: '/admin/vehicules',
      count: 32,
      stats: {
        actifs: 28,
        enMaintenance: 4,
        progression: 87
      }
    },
    {
      title: 'Réservations',
      icon: <ScheduleOutlined className="text-4xl text-primary" />,
      description: 'Gérer les réservations',
      link: '/admin/reservations',
      count: 128,
      stats: {
        enCours: 24,
        aVenir: 45,
        progression: 92
      }
    },
    {
      title: 'Commandes',
      icon: <ShoppingOutlined className="text-4xl text-primary" />,
      description: 'Gérer les commandes',
      link: '/admin/commandes',
      count: 24,
      stats: {
        enCours: 8,
        terminees: 16,
        progression: 78
      }
    },
  ];

  const recentActivities = [
    {
      key: '1',
      type: 'Réservation',
      description: 'Nouvelle réservation #128',
      client: 'Marie Diop',
      montant: '25,000 XOF',
      time: 'Il y a 5 min',
      status: 'En attente'
    },
    {
      key: '2',
      type: 'Conducteur',
      description: 'Nouveau conducteur inscrit',
      client: 'John Doe',
      time: 'Il y a 15 min',
      status: 'À valider'
    },
    {
      key: '3',
      type: 'Commande',
      description: 'Commande #45 terminée',
      client: 'Sarah Fall',
      montant: '45,000 XOF',
      time: 'Il y a 30 min',
      status: 'Terminée'
    }
  ];

  const activityColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (text) => (
        <Tag color={
          text === 'Réservation' ? 'blue' : 
          text === 'Conducteur' ? 'green' : 
          'purple'
        } className="!rounded-none">
          {text}
        </Tag>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      width: 150,
      render: (text) => (
        <span className="font-medium">{text}</span>
      )
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      width: 150,
      render: (text) => text ? (
        <span className="font-medium text-primary">{text}</span>
      ) : null
    },
    {
      title: 'Temps',
      dataIndex: 'time',
      key: 'time',
      width: 150,
      render: (text) => (
        <span className="text-gray-500 text-sm">
          <ClockCircleOutlined className="mr-1" />
          {text}
        </span>
      )
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text) => (
        <Tag color={
          text === 'En attente' ? 'warning' : 
          text === 'À valider' ? 'processing' : 
          'success'
        } className="!rounded-none">
          {text}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        record.type === 'Réservation' && record.status === 'En attente' ? (
          <Space>
            <Button 
              type="primary"
              size="small"
              icon={<CarryOutOutlined />}
              className="!rounded-none"
              onClick={() => navigate(`/admin/reservations/${record.key}`)}
            >
              Assigner
            </Button>
            <Button
              size="small"
              icon={<FileSearchOutlined />}
              className="!rounded-none"
            >
              Détails
            </Button>
          </Space>
        ) : record.type === 'Conducteur' && record.status === 'À valider' ? (
          <Button
            type="primary"
            size="small"
            className="!rounded-none"
            ghost
          >
            Valider
          </Button>
        ) : null
      )
    }
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-clash font-semibold text-gray-800">
            Tableau de bord
          </h1>
          <div className="mt-4 md:mt-0">
            <Tag icon={<ClockCircleOutlined />} color="blue" className="!rounded-none mr-2">
              Dernière mise à jour: il y a 5 min
            </Tag>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, index) => (
            <Link 
              key={index} 
              to={card.link}
              className="block transition-transform hover:-translate-y-1"
            >
              <Card 
                bordered={false} 
                className="!rounded-none h-full hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-primary/10">
                      {card.icon}
                    </div>
                    <Progress 
                      type="circle" 
                      percent={card.stats.progression}
                      width={46}
                      strokeWidth={10}
                      strokeColor="#1890ff"
                      className="!rounded-none"
                    />
                  </div>
                  
                  <h3 className="text-lg font-clash font-medium text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  
                  <Statistic 
                    value={card.count} 
                    className="mb-2"
                    valueStyle={{ fontSize: '24px' }}
                  />
                  
                  <div className="mt-auto">
                    <Space direction="vertical" className="w-full">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Actifs</span>
                        <span className="font-medium">{card.stats.actifs || card.stats.enCours}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {card.title === 'Véhicules' ? 'En maintenance' : 
                           card.title === 'Réservations' ? 'À venir' : 
                           card.title === 'Commandes' ? 'Terminées' : 'En attente'}
                        </span>
                        <span className="font-medium">
                          {card.stats.enMaintenance || card.stats.enAttente || card.stats.aVenir || card.stats.terminees}
                        </span>
                      </div>
                    </Space>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="mb-8 -mx-6 px-6 overflow-x-auto">
          <div className="flex space-x-4 pb-2 min-w-max">
            <Button 
              type="primary"
              icon={<UserAddOutlined />}
              className="!rounded-none min-w-[270px] h-12 flex items-center justify-center gap-2 shadow-sm font-medium"
            >
              Nouveau conducteur
            </Button>
            <Button
              icon={<CarOutlined />}
              className="!rounded-none min-w-[180px] h-12 flex items-center justify-center gap-2 shadow-sm"
              onClick={() => navigate('/admin/vehicules/nouveau')}
            >
              Nouveau véhicule
            </Button>
            <Button
              icon={<CarryOutOutlined />}
              className="!rounded-none min-w-[180px] h-12 flex items-center justify-center gap-2 shadow-sm"
            >
              Valider commande
            </Button>
            <Button
              icon={<UserOutlined />}
              className="!rounded-none min-w-[180px] h-12 flex items-center justify-center gap-2 shadow-sm bg-gray-50 hover:bg-gray-100"
              onClick={() => navigate('/admin/conducteurs')}
            >
              Voir les conducteurs
            </Button>
            <Button
              icon={<FileSearchOutlined />}
              className="!rounded-none min-w-[180px] h-12 flex items-center justify-center gap-2 shadow-sm"
            >
              Rapport journalier
            </Button>
            <Button
              icon={<PrinterOutlined />}
              className="!rounded-none min-w-[180px] h-12 flex items-center justify-center gap-2 shadow-sm"
            >
              Imprimer factures
            </Button>
          </div>
        </div>

        {/* Activités récentes */}
        <Card 
          title={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-primary" />
                <span className="font-clash">Activités récentes</span>
              </div>
              <Button 
                type="link" 
                className="text-primary"
                onClick={() => navigate('/admin/activites')}
              >
                Voir tout
              </Button>
            </div>
          }
          bordered={false} 
          className="!rounded-none"
        >
          <Table 
            columns={activityColumns} 
            dataSource={recentActivities}
            pagination={false}
            className="!rounded-none"
            scroll={{ x: true }}
          />
        </Card>

        {/* Statistiques supplémentaires */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card bordered={false} className="!rounded-none">
            <Statistic
              title={<span className="font-clash">Chiffre d'affaires du jour</span>}
              value={234500}
              suffix="XOF"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <Tag color="success" className="mt-4 !rounded-none">
              <ArrowUpOutlined /> +15% par rapport à hier
            </Tag>
          </Card>

          <Card bordered={false} className="!rounded-none">
            <Statistic
              title={<span className="font-clash">Taux de satisfaction</span>}
              value={96}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress percent={96} strokeColor="#1890ff" className="mt-4 !rounded-none" />
          </Card>

          <Card bordered={false} className="!rounded-none">
            <Statistic
              title={<span className="font-clash">Dépenses du mois</span>}
              value={1250000}
              suffix="XOF"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
            <Space className="mt-4" size="small">
              <Tag color="error" className="!rounded-none">
                Carburant: 450,000 XOF
              </Tag>
              <Tag color="error" className="!rounded-none">
                Maintenance: 800,000 XOF
              </Tag>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminHome; 