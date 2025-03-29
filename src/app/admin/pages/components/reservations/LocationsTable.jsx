import React from 'react';
import { Table, Tag, Button, Avatar, Tooltip } from 'antd';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';

const LocationsTable = ({ data, loading, onViewDetails }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (client) => (
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{client.nom}</div>
            <div className="text-xs text-gray-500">{client.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Véhicule',
      dataIndex: 'vehicule',
      key: 'vehicule',
      render: (vehicule) => (
        <div>
          <div className="font-medium">{vehicule.marque} {vehicule.modele}</div>
          <div className="text-xs text-gray-500">{vehicule.immatriculation}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'Avec conducteur' ? 'blue' : 'orange'} className="!rounded-none">
          {type}
        </Tag>
      ),
    },
    {
      title: 'Période',
      dataIndex: 'periode',
      key: 'periode',
      render: (periode) => (
        <div>
          <div>Du: {new Date(periode.debut).toLocaleDateString()}</div>
          <div>Au: {new Date(periode.fin).toLocaleDateString()}</div>
        </div>
      ),
    },
    {
      title: 'Montant',
      dataIndex: 'montant',
      key: 'montant',
      render: (montant) => (
        <div className="font-medium">
          {montant.total?.toLocaleString()} FCFA
        </div>
      ),
    },
    {
      title: 'Statut',
      dataIndex: 'statut',
      key: 'statut',
      render: (statut) => {
        const config = {
          'En cours': { color: 'processing', text: 'En cours' },
          'Terminée': { color: 'success', text: 'Terminée' },
          'Annulée': { color: 'error', text: 'Annulée' },
          'En attente': { color: 'warning', text: 'En attente' },
          'Confirmée': { color: 'success', text: 'Confirmée' }
        };
        
        // Valeur par défaut si le statut n'est pas dans la configuration
        const statusConfig = config[statut] || { color: 'default', text: statut };
        
        return (
          <Tag color={statusConfig.color} className="!rounded-none">
            {statusConfig.text}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Tooltip title="Voir les détails">
          <Button
            icon={<EyeOutlined />}
            onClick={() => onViewDetails(record)}
            className="!rounded-none"
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      className="[&_.ant-table-thead_.ant-table-cell]:!bg-gray-50 [&_.ant-table]:!rounded-none [&_.ant-table-container]:!rounded-none"
      pagination={{
        total: data?.length,
        pageSize: 10,
        className: '[&_.ant-pagination-item]:!rounded-none [&_.ant-pagination-prev_.ant-pagination-item-link]:!rounded-none [&_.ant-pagination-next_.ant-pagination-item-link]:!rounded-none',
      }}
    />
  );
};

export default LocationsTable; 