import React from 'react';
import { 
  Card, 
  Button, 
  Statistic, 
  Timeline,
  Tag,
  Input,
} from 'antd';
import { 
  UserOutlined, 
  CarOutlined, 
  StarFilled, 
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AperçuTab = ({ conducteur }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedData, setEditedData] = React.useState({
    telephone: conducteur?.telephone || '',
    email: conducteur?.email || '',
    adresse: conducteur?.adresse || '',
  });

  const handleSave = () => {
    // TODO: Implémenter la sauvegarde des modifications
    console.log('Données modifiées:', editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      telephone: conducteur?.telephone || '',
      email: conducteur?.email || '',
      adresse: conducteur?.adresse || '',
    });
    setIsEditing(false);
  };

  const statsCards = [
    {
      title: 'Courses Totales',
      value: conducteur?.nombreCourses || 0,
      icon: <CarOutlined className="text-2xl" />,
      color: 'blue'
    },
    {
      title: 'Note Moyenne',
      value: conducteur?.note || 0,
      icon: <StarFilled className="text-2xl" />,
      color: 'yellow',
      suffix: '/ 5.0'
    },
    {
      title: 'Taux d\'acceptation',
      value: conducteur?.tauxAcceptation || 0,
      icon: <CheckCircleOutlined className="text-2xl" />,
      color: 'green',
      suffix: '%'
    }
  ];

  const activites = [
    { date: '20/03/2024', action: 'Course complétée', montant: '5,000 XOF', statut: 'success' },
    { date: '19/03/2024', action: 'Maintenance véhicule', montant: '-25,000 XOF', statut: 'warning' },
    { date: '18/03/2024', action: 'Course complétée', montant: '7,500 XOF', statut: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
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
                           '#1890ff'
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

      {/* Informations personnelles */}
      <Card 
        title="Informations personnelles" 
        bordered={false} 
        className="!rounded-none"
        extra={
          isEditing ? (
            <div className="flex gap-2">
              <Button 
                icon={<SaveOutlined />} 
                type="primary"
                onClick={handleSave}
                className="!rounded-none"
              >
                Enregistrer
              </Button>
              <Button 
                icon={<CloseOutlined />} 
                onClick={handleCancel}
                className="!rounded-none"
              >
                Annuler
              </Button>
            </div>
          ) : (
            <Button 
              icon={<EditOutlined />} 
              type="default"
              onClick={() => setIsEditing(true)}
              className="!rounded-none border-primary text-primary"
            >
              Modifier
            </Button>
          )
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <PhoneOutlined className="text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Téléphone</p>
                {isEditing ? (
                  <Input
                    value={editedData.telephone}
                    onChange={(e) => setEditedData(prev => ({ ...prev, telephone: e.target.value }))}
                    className="!rounded-none"
                  />
                ) : (
                  <p className="font-medium">{conducteur?.telephone}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MailOutlined className="text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>
                {isEditing ? (
                  <Input
                    value={editedData.email}
                    onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
                    className="!rounded-none"
                  />
                ) : (
                  <p className="font-medium">{conducteur?.email}</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <EnvironmentOutlined className="text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Adresse</p>
                {isEditing ? (
                  <Input
                    value={editedData.adresse}
                    onChange={(e) => setEditedData(prev => ({ ...prev, adresse: e.target.value }))}
                    className="!rounded-none"
                  />
                ) : (
                  <p className="font-medium">{conducteur?.adresse}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarOutlined className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date d'inscription</p>
                <p className="font-medium">{conducteur?.dateInscription}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activité récente */}
      <Card 
        title="Activité récente" 
        bordered={false} 
        className="!rounded-none"
        extra={
          <Button 
            type="link" 
            className="text-primary"
            onClick={() => navigate('/admin/conducteurs/activites')}
          >
            Voir tout
          </Button>
        }
      >
        <Timeline
          items={activites.map(item => ({
            color: item.statut === 'success' ? 'green' : 'yellow',
            children: (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <Tag 
                  color={item.statut === 'success' ? 'success' : 'warning'}
                  className="!rounded-none"
                >
                  {item.montant}
                </Tag>
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default AperçuTab; 