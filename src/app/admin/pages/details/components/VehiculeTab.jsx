import React from 'react';
import { 
  Card, 
  Button, 
  Statistic, 
  Table,
  Tag,
} from 'antd';
import { 
  CarOutlined, 
  CalendarOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { ChangeVehiculeModal } from '../../../components/modals';

const VehiculeTab = ({ onChangeVehicule }) => {
  const [isChangeVehiculeModalVisible, setIsChangeVehiculeModalVisible] = React.useState(false);
  const [selectedVehicule, setSelectedVehicule] = React.useState(null);

  // Liste mockée des véhicules disponibles
  const vehiculesDisponibles = [
    { id: '1', modele: 'Toyota Camry 2023', immatriculation: 'DK-2023-BB', statut: 'Disponible' },
    { id: '2', modele: 'Honda Accord 2023', immatriculation: 'DK-2023-CC', statut: 'Disponible' },
    { id: '3', modele: 'Hyundai Sonata 2023', immatriculation: 'DK-2023-DD', statut: 'Disponible' }
  ];

  const handleChangeVehicule = (selectedVehicule) => {
    if (selectedVehicule) {
      onChangeVehicule();
      setIsChangeVehiculeModalVisible(false);
      setSelectedVehicule(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Véhicule actuel */}
      <Card 
        title="Véhicule actuel" 
        bordered={false} 
        className="!rounded-none"
        extra={
          <Button 
            icon={<EditOutlined />}
            className="!rounded-none border-primary text-primary"
            onClick={() => setIsChangeVehiculeModalVisible(true)}
          >
            Changer de véhicule
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CarOutlined className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Modèle</p>
                <p className="font-medium">Toyota Corolla 2022</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-gray-400">#</div>
              <div>
                <p className="text-sm text-gray-500">Immatriculation</p>
                <p className="font-medium">DK-2023-AA</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarOutlined className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date d'attribution</p>
                <p className="font-medium">15/01/2024</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircleOutlined className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">État</p>
                <Tag color="success" className="!rounded-none mt-1">En service</Tag>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistiques du véhicule */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card bordered={false} className="!rounded-none">
          <Statistic
            title="Courses effectuées"
            value={234}
            prefix={<CarOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
        <Card bordered={false} className="!rounded-none">
          <Statistic
            title="Kilomètres parcourus"
            value={1850}
            suffix="km"
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
        <Card bordered={false} className="!rounded-none">
          <Statistic
            title="Taux d'utilisation"
            value={92}
            suffix="%"
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </div>

      {/* Historique des véhicules */}
      <Card 
        title="Historique des véhicules" 
        bordered={false} 
        className="!rounded-none"
      >
        <Table
          dataSource={[
            {
              key: '1',
              modele: 'Honda Civic 2021',
              immatriculation: 'DK-2021-BB',
              debut: '01/06/2023',
              fin: '14/01/2024',
              statut: 'Terminé'
            },
            {
              key: '2',
              modele: 'Hyundai Accent 2020',
              immatriculation: 'DK-2020-CC',
              debut: '15/01/2023',
              fin: '31/05/2023',
              statut: 'Terminé'
            }
          ]}
          columns={[
            {
              title: 'Modèle',
              dataIndex: 'modele',
              key: 'modele',
              render: (text) => (
                <div className="flex items-center gap-2">
                  <CarOutlined className="text-primary" />
                  <span>{text}</span>
                </div>
              )
            },
            {
              title: 'Immatriculation',
              dataIndex: 'immatriculation',
              key: 'immatriculation'
            },
            {
              title: 'Début',
              dataIndex: 'debut',
              key: 'debut'
            },
            {
              title: 'Fin',
              dataIndex: 'fin',
              key: 'fin'
            },
            {
              title: 'Statut',
              dataIndex: 'statut',
              key: 'statut',
              render: (statut) => (
                <Tag 
                  color={statut === 'En cours' ? 'processing' : 'default'} 
                  className="!rounded-none"
                >
                  {statut}
                </Tag>
              )
            }
          ]}
          className="!rounded-none"
          pagination={false}
        />
      </Card>

      {/* Modal de changement de véhicule */}
      <ChangeVehiculeModal 
        isVisible={isChangeVehiculeModalVisible}
        onCancel={() => setIsChangeVehiculeModalVisible(false)}
        onConfirm={handleChangeVehicule}
        selectedVehicule={selectedVehicule}
        setSelectedVehicule={setSelectedVehicule}
        vehiculesDisponibles={vehiculesDisponibles}
      />
    </div>
  );
};

export default VehiculeTab; 