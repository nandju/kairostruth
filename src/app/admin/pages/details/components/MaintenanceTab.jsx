import React from 'react';
import { Card, Progress, Timeline } from 'antd';

const MaintenanceTab = () => {
  return (
    <div className="space-y-6">
      {/* État de maintenance */}
      <Card 
        title="État de maintenance" 
        bordered={false} 
        className="!rounded-none"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Prochain entretien</p>
            <Progress 
              percent={75} 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              className="!rounded-none"
            />
            <p className="text-sm mt-2">Dans 25 jours ou 2,500 km</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">État général</p>
            <Progress 
              percent={92} 
              strokeColor="#52c41a"
              className="!rounded-none"
            />
            <p className="text-sm mt-2">Excellent état</p>
          </div>
        </div>
      </Card>

      {/* Historique des maintenances */}
      <Card 
        title="Historique des maintenances" 
        bordered={false} 
        className="!rounded-none"
      >
        <Timeline
          items={[
            {
              color: 'green',
              children: (
                <div>
                  <p className="font-medium">Révision complète</p>
                  <p className="text-sm text-gray-500">15/01/2024 - 42,000 km</p>
                  <p className="text-sm">Changement huile, filtres et plaquettes de frein</p>
                </div>
              ),
            },
            {
              color: 'yellow',
              children: (
                <div>
                  <p className="font-medium">Maintenance préventive</p>
                  <p className="text-sm text-gray-500">01/12/2023 - 38,000 km</p>
                  <p className="text-sm">Vérification générale et équilibrage des pneus</p>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default MaintenanceTab; 