import React from 'react';
import { 
  Table, 
  Card, 
  Space, 
  Badge, 
  Button, 
  Tooltip, 
  Tag, 
  Avatar,
  Dropdown,
  Menu,
  Rate
} from 'antd';
import {
  UserOutlined,
  CarOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  MoreOutlined,
  DeleteOutlined,
  MessageOutlined
} from '@ant-design/icons';

const ReservationsTable = ({
  data,
  onViewDetails,
  onAssignDriver,
  onConfirm,
  onCancel,
  getStatusColor
}) => {
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
      title: 'Trajet',
      dataIndex: 'trajet',
      key: 'trajet',
      render: (trajet) => (
        <Space direction="vertical" size="small">
          <div className="flex items-center gap-2">
            <Badge status="success" />
            <span>{trajet.depart}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge status="error" />
            <span>{trajet.destination}</span>
          </div>
        </Space>
      )
    },
    {
      title: 'Date & Heure',
      dataIndex: 'dateHeure',
      key: 'dateHeure',
      render: (dateHeure) => (
        <Space direction="vertical" size="small">
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-gray-400" />
            <span>{dateHeure.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockCircleOutlined className="text-gray-400" />
            <span>{dateHeure.heure}</span>
          </div>
        </Space>
      )
    },
    {
      title: 'Conducteur',
      dataIndex: 'conducteur',
      key: 'conducteur',
      render: (conducteur, record) => (
        conducteur ? (
          <Space>
            <Avatar icon={<CarOutlined />} className="bg-success" />
            <div>
              <div className="font-medium">{conducteur.nom}</div>
              <Rate disabled defaultValue={conducteur.rating} className="text-xs" />
            </div>
          </Space>
        ) : (
          <Button 
            type="dashed" 
            size="small" 
            icon={<UserOutlined />}
            onClick={() => onAssignDriver(record)}
            className="!rounded-none"
          >
            Assigner
          </Button>
        )
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
            {montant.distance} km • {montant.duree}
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
              onClick={() => onViewDetails(record)}
              className="text-gray-600 hover:text-primary"
            />
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item 
                  key="1" 
                  icon={<CheckCircleOutlined />}
                  onClick={() => onConfirm(record.id)}
                >
                  Confirmer
                </Menu.Item>
                <Menu.Item 
                  key="2" 
                  icon={<CarOutlined />}
                  onClick={() => onAssignDriver(record)}
                >
                  Assigner un conducteur
                </Menu.Item>
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
                  onClick={() => onCancel(record.id)}
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

  return (
    <Card 
      bordered={false} 
      className="!rounded-none"
      title={
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Liste des réservations</span>
          <Space>
            <Badge status="processing" text="Mise à jour en temps réel" />
            <span className="text-gray-500">
              {data.length} réservations
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
          showTotal: (total) => `Total: ${total} réservations`,
          className: "!rounded-none"
        }}
      />
    </Card>
  );
};

export default ReservationsTable; 