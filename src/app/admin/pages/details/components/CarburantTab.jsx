import React from 'react';
import { Card, Statistic, Progress, Table, Alert } from 'antd';

const CarburantTab = () => {
  return (
    <div className="space-y-6">
      {/* Statistiques de consommation */}
      <Card 
        title="Statistiques de consommation" 
        bordered={false} 
        className="!rounded-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Statistic
            title="Consommation moyenne"
            value={7.5}
            suffix="L/100km"
            valueStyle={{ color: '#1890ff' }}
          />
          <Statistic
            title="Coût total ce mois"
            value={125000}
            suffix="FCFA"
            valueStyle={{ color: '#52c41a' }}
          />
          <Statistic
            title="Volume total ce mois"
            value={167}
            suffix="L"
            valueStyle={{ color: '#faad14' }}
          />
        </div>
      </Card>

      {/* Consommation hebdomadaire */}
      <Card 
        title="Consommation hebdomadaire" 
        bordered={false} 
        className="!rounded-none"
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Cette semaine</span>
              <div className="text-right">
                <span className="font-medium">85L</span>
                <span className="text-gray-500 ml-2">75,000 FCFA</span>
              </div>
            </div>
            <Progress 
              percent={85} 
              strokeColor="#1890ff"
              className="!rounded-none"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Semaine dernière</span>
              <div className="text-right">
                <span className="font-medium">92L</span>
                <span className="text-gray-500 ml-2">82,000 FCFA</span>
              </div>
            </div>
            <Progress 
              percent={92} 
              strokeColor="#52c41a"
              className="!rounded-none"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Il y a 2 semaines</span>
              <div className="text-right">
                <span className="font-medium">78L</span>
                <span className="text-gray-500 ml-2">70,000 FCFA</span>
              </div>
            </div>
            <Progress 
              percent={78} 
              strokeColor="#faad14"
              className="!rounded-none"
            />
          </div>
        </div>
      </Card>

      {/* Historique des pleins */}
      <Card 
        title="Historique des pleins" 
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
              title: 'Quantité',
              dataIndex: 'quantite',
              key: 'quantite',
              render: (quantite) => `${quantite}L`,
            },
            {
              title: 'Prix unitaire',
              dataIndex: 'prixUnitaire',
              key: 'prixUnitaire',
              render: (prix) => `${prix} FCFA/L`,
            },
            {
              title: 'Coût total',
              dataIndex: 'cout',
              key: 'cout',
              render: (cout) => `${cout.toLocaleString()} FCFA`,
            },
            {
              title: 'Station',
              dataIndex: 'station',
              key: 'station',
            },
          ]}
          dataSource={[
            {
              key: '1',
              date: '20/03/2024',
              quantite: 45,
              prixUnitaire: 890,
              cout: 40000,
              station: 'Total Almadies',
            },
            {
              key: '2',
              date: '15/03/2024',
              quantite: 40,
              prixUnitaire: 890,
              cout: 35000,
              station: 'Shell Plateau',
            },
            {
              key: '3',
              date: '10/03/2024',
              quantite: 42,
              prixUnitaire: 890,
              cout: 37000,
              station: 'Total Point E',
            },
          ]}
          pagination={false}
          className="!rounded-none"
        />
      </Card>

      {/* Alertes de consommation */}
      <Card 
        title="Alertes de consommation" 
        bordered={false} 
        className="!rounded-none"
      >
        <Alert
          message="Consommation anormale détectée"
          description="La consommation de carburant a augmenté de 15% par rapport à la moyenne habituelle cette semaine."
          type="warning"
          showIcon
          className="!rounded-none mb-4"
        />
        <Alert
          message="Maintenance recommandée"
          description="Une vérification du système d'injection est recommandée pour optimiser la consommation."
          type="info"
          showIcon
          className="!rounded-none"
        />
      </Card>
    </div>
  );
};

export default CarburantTab; 