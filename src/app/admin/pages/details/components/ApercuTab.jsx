import React from 'react';
import { Card, Button, Tag, Statistic, Avatar, Alert } from 'antd';
import { CarOutlined, EditOutlined, CheckCircleOutlined, ToolOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ApercuTab = ({ vehicule }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card bordered={false} className="!rounded-none">
          <Statistic
            title="Courses effectuées"
            value={vehicule.nombreCourses}
            prefix={<CarOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
        <Card bordered={false} className="!rounded-none">
          <Statistic
            title="Kilomètres parcourus"
            value={vehicule.kilometrage}
            suffix="km"
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
        <Card bordered={false} className="!rounded-none">
          <Statistic
            title="Taux d'utilisation"
            value={vehicule.tauxUtilisation}
            suffix="%"
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </div>

      {/* Informations du véhicule */}
      <Card 
        title="Informations du véhicule" 
        bordered={false} 
        className="!rounded-none"
        extra={
          <Button 
            icon={<EditOutlined />}
            className="!rounded-none border-primary text-primary"
          >
            Modifier
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CarOutlined className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Modèle</p>
                <p className="font-medium">{vehicule.marque} {vehicule.modele}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-gray-400">#</div>
              <div>
                <p className="text-sm text-gray-500">Immatriculation</p>
                <p className="font-medium">{vehicule.immatriculation}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircleOutlined className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">État</p>
                <Tag 
                  color={
                    vehicule.etat === 'Disponible' ? 'success' : 
                    vehicule.etat === 'En course' ? 'processing' : 
                    'warning'
                  } 
                  className="!rounded-none mt-1"
                >
                  {vehicule.etat}
                </Tag>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ToolOutlined className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Dernière maintenance</p>
                <p className="font-medium">Il y a 2 mois</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Conducteur actuel */}
      <Card 
        title="Conducteur actuel" 
        bordered={false} 
        className="!rounded-none"
      >
        {vehicule.conducteur ? (
          <div className="flex items-center gap-4">
            <Avatar size={64} className="bg-primary">
              {vehicule.conducteur.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{vehicule.conducteur}</h3>
              <p className="text-gray-500">Assigné depuis le 15/01/2024</p>
            </div>
            <Button 
              type="link" 
              className="ml-auto"
              onClick={() => navigate(`/admin/conducteurs/${1}`)}
            >
              Voir le profil
            </Button>
          </div>
        ) : (
          <Alert
            message="Aucun conducteur assigné"
            description="Ce véhicule n'est actuellement assigné à aucun conducteur."
            type="warning"
            showIcon
            className="!rounded-none"
          />
        )}
      </Card>
    </div>
  );
};

export default ApercuTab; 