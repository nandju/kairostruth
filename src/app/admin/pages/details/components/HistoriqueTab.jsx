import React from 'react';
import { 
  Card, 
  Statistic, 
  Table, 
  Tag, 
  Button, 
  Timeline,
  Select,
  Input
} from 'antd';

const HistoriqueTab = ({ vehicule = {} }) => {
  // Valeurs par défaut pour les statistiques
  const stats = {
    kilometrage: vehicule?.kilometrage || 0,
    nombreCourses: vehicule?.nombreCourses || 0,
    tauxUtilisation: vehicule?.tauxUtilisation || 0
  };

  return (
    <div className="space-y-6">
      {/* Statistiques d'utilisation */}
      <Card 
        title="Statistiques d'utilisation" 
        bordered={false} 
        className="!rounded-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Statistic
            title="Distance totale"
            value={stats.kilometrage}
            suffix="km"
            valueStyle={{ color: '#1890ff' }}
          />
          <Statistic
            title="Courses totales"
            value={stats.nombreCourses}
            valueStyle={{ color: '#52c41a' }}
          />
          <Statistic
            title="Taux d'utilisation moyen"
            value={stats.tauxUtilisation}
            suffix="%"
            valueStyle={{ color: '#faad14' }}
          />
        </div>
      </Card>

      {/* Filtres et recherche */}
      <Card bordered={false} className="!rounded-none">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <Select
              defaultValue="all"
              className="w-40 [&_.ant-select-selector]:!rounded-none"
              options={[
                { value: 'all', label: 'Tous les statuts' },
                { value: 'completed', label: 'Complétées' },
                { value: 'cancelled', label: 'Annulées' },
                { value: 'complaint', label: 'Avec plaintes' }
              ]}
            />
            <Select
              defaultValue="month"
              className="w-40 [&_.ant-select-selector]:!rounded-none"
              options={[
                { value: 'week', label: 'Cette semaine' },
                { value: 'month', label: 'Ce mois' },
                { value: 'quarter', label: 'Ce trimestre' },
                { value: 'year', label: 'Cette année' }
              ]}
            />
          </div>
          <Input.Search
            placeholder="Rechercher une course..."
            className="w-full md:w-64 [&_.ant-input]:!rounded-none [&_.ant-input-search-button]:!rounded-none"
          />
        </div>
      </Card>

      {/* Tableau des courses */}
      <Card 
        title="Historique des courses" 
        bordered={false} 
        className="!rounded-none"
      >
        <Table
          columns={[
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Conducteur',
              dataIndex: 'conducteur',
              key: 'conducteur',
            },
            {
              title: 'Distance',
              dataIndex: 'distance',
              key: 'distance',
              render: (distance) => `${distance} km`,
            },
            {
              title: 'Durée',
              dataIndex: 'duree',
              key: 'duree',
            },
            {
              title: 'Statut',
              dataIndex: 'statut',
              key: 'statut',
              render: (statut) => (
                <Tag 
                  color={statut === 'Terminée' ? 'success' : 'processing'} 
                  className="!rounded-none"
                >
                  {statut}
                </Tag>
              ),
            },
          ]}
          dataSource={[
            {
              key: '1',
              date: '20/03/2024',
              conducteur: 'John Doe',
              distance: 25,
              duree: '45 min',
              statut: 'Terminée',
            },
            {
              key: '2',
              date: '19/03/2024',
              conducteur: 'John Doe',
              distance: 18,
              duree: '30 min',
              statut: 'Terminée',
            },
          ]}
          pagination={false}
          className="!rounded-none"
        />
      </Card>

      {/* Section des plaintes */}
      <Card 
        title="Plaintes reçues" 
        bordered={false} 
        className="!rounded-none"
        extra={
          <Select
            defaultValue="all"
            className="w-40 [&_.ant-select-selector]:!rounded-none"
            options={[
              { value: 'all', label: 'Toutes les plaintes' },
              { value: 'pending', label: 'En attente' },
              { value: 'resolved', label: 'Résolues' }
            ]}
          />
        }
      >
        <Timeline
          items={[
            {
              color: 'red',
              children: (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Retard important</p>
                    <Tag color="error" className="!rounded-none">Non résolue</Tag>
                  </div>
                  <p className="text-sm text-gray-500">
                    Client: Abdou Fall - Course du 21/03/2024
                  </p>
                  <p className="text-sm">
                    Le conducteur est arrivé avec 30 minutes de retard sans prévenir.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button 
                      size="small" 
                      className="!rounded-none"
                    >
                      Voir les détails
                    </Button>
                    <Button 
                      type="primary" 
                      size="small" 
                      className="!rounded-none"
                    >
                      Marquer comme résolue
                    </Button>
                  </div>
                </div>
              )
            },
            {
              color: 'green',
              children: (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Comportement inadéquat</p>
                    <Tag color="success" className="!rounded-none">Résolue</Tag>
                  </div>
                  <p className="text-sm text-gray-500">
                    Client: Marie Diop - Course du 15/03/2024
                  </p>
                  <p className="text-sm">
                    Résolution: Avertissement donné au conducteur
                  </p>
                </div>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default HistoriqueTab; 