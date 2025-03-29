import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Tabs, 
  Tag, 
  Modal,
} from 'antd';
import { 
  CarOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import ApercuVehiculeComponent from './components/ApercuVehiculeComponent';
import MaintenanceVehiculeComponent from './components/MaintenanceVehiculeComponent';
import HistoriqueVehiculeComponent from './components/HistoriqueVehiculeComponent';
import DocumentsVehiculeComponent from './components/DocumentsVehiculeComponent';
import CarburantVehiculeComponent from './components/CarburantVehiculeComponent';

const VehiculeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMaintenanceModalVisible, setIsMaintenanceModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);

  // Données mockées pour l'exemple
  const vehicule = {
    id,
    marque: 'Toyota',
    modele: 'Corolla',
    immatriculation: 'DK-123-AB',
    annee: '2020',
    etat: 'Disponible',
    conducteur: 'John Doe',
    localisation: 'Dakar, Plateau',
    kilometrage: 45000,
    dateAcquisition: '15/01/2020',
    nombreCourses: 234,
    tauxUtilisation: 87,
  };

  const handleMaintenance = () => {
    console.log('Véhicule mis en maintenance:', id);
    setIsMaintenanceModalVisible(false);
  };

  const handleDelete = () => {
    console.log('Véhicule supprimé:', id);
    setIsDeleteModalVisible(false);
    navigate('/admin/vehicules');
  };

  const items = [
    {
      key: '1',
      label: 'Aperçu',
      children: <ApercuVehiculeComponent vehicule={vehicule} />,
    },
    {
      key: '2',
      label: 'Maintenance',
      children: <MaintenanceVehiculeComponent />,
    },
    {
      key: '3',
      label: 'Historique',
      children: <HistoriqueVehiculeComponent vehicule={vehicule} />,
    },
    {
      key: '4',
      label: 'Documents',
      children: <DocumentsVehiculeComponent />,
    },
    {
      key: '5',
      label: 'Carburant',
      children: <CarburantVehiculeComponent />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Bouton retour */}
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin/vehicules')}
          className="!rounded-none mb-6 border-primary text-primary hover:text-primary hover:border-primary"
        >
          Retour à la liste
        </Button>

        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-primary/10 rounded-none flex items-center justify-center">
              <CarOutlined className="text-2xl text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-clash font-semibold text-gray-800">
                  {vehicule.marque} {vehicule.modele}
                </h1>
                <Tag 
                  icon={<CheckCircleOutlined />}
                  color="success"
                  className="!rounded-none"
                >
                  {vehicule.etat}
                </Tag>
              </div>
              <p className="text-gray-500">{vehicule.immatriculation}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              icon={<EditOutlined />}
              className="!rounded-none border-primary text-primary"
            >
              Modifier
            </Button>
            <Button 
              icon={<ToolOutlined />}
              onClick={() => setIsMaintenanceModalVisible(true)}
              className="!rounded-none border-yellow-500 text-yellow-500"
            >
              Maintenance
            </Button>
            <Button 
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteModalVisible(true)}
              className="!rounded-none border-red-500 text-red-500"
            >
              Supprimer
            </Button>
          </div>
        </div>

        {/* Modal de confirmation de maintenance */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <WarningOutlined className="text-yellow-500 text-xl" />
              <span>Confirmer la mise en maintenance</span>
            </div>
          }
          open={isMaintenanceModalVisible}
          onCancel={() => setIsMaintenanceModalVisible(false)}
          footer={[
            <Button 
              key="cancel" 
              onClick={() => setIsMaintenanceModalVisible(false)}
              className="!rounded-none"
            >
              Annuler
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleMaintenance}
              className="!rounded-none !bg-yellow-500 !border-yellow-500 hover:!bg-yellow-600 hover:!border-yellow-600"
              icon={<ToolOutlined />}
            >
              Confirmer la maintenance
            </Button>
          ]}
          className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-none [&_.ant-modal-footer]:!rounded-none"
        >
          <div className="py-4">
            <p className="text-gray-600">
              Êtes-vous sûr de vouloir mettre en maintenance le véhicule <strong>{vehicule.marque} {vehicule.modele}</strong> ?
            </p>
            <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 space-y-2">
              <p><strong>Conséquences de la mise en maintenance :</strong></p>
              <ul className="list-disc list-inside">
                <li>Le véhicule ne sera plus disponible pour les courses</li>
                <li>Le conducteur actuel sera temporairement désassigné</li>
                <li>Une notification sera envoyée à l'équipe de maintenance</li>
              </ul>
            </div>
          </div>
        </Modal>

        {/* Modal de confirmation de suppression */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <ExclamationCircleOutlined className="text-red-500 text-xl" />
              <span>Confirmer la suppression</span>
            </div>
          }
          open={isDeleteModalVisible}
          onCancel={() => setIsDeleteModalVisible(false)}
          footer={[
            <Button 
              key="cancel" 
              onClick={() => setIsDeleteModalVisible(false)}
              className="!rounded-none"
            >
              Annuler
            </Button>,
            <Button
              key="submit"
              type="primary"
              danger
              onClick={handleDelete}
              className="!rounded-none"
              icon={<DeleteOutlined />}
            >
              Confirmer la suppression
            </Button>
          ]}
          className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-none [&_.ant-modal-footer]:!rounded-none"
        >
          <div className="py-4">
            <p className="text-gray-600">
              Êtes-vous sûr de vouloir supprimer définitivement le véhicule <strong>{vehicule.marque} {vehicule.modele}</strong> ?
            </p>
            <div className="mt-4 p-4 bg-red-50 text-red-700 space-y-2">
              <p><strong>Attention :</strong></p>
              <ul className="list-disc list-inside">
                <li>Cette action est irréversible</li>
                <li>Toutes les données associées seront supprimées</li>
                <li>L'historique des courses sera conservé pour des raisons légales</li>
              </ul>
            </div>
          </div>
        </Modal>

        {/* Contenu principal */}
        <Card bordered={false} className="!rounded-none">
          <Tabs 
            items={items}
            className="!rounded-none"
          />
        </Card>
      </div>
    </div>
  );
};

export default VehiculeDetails; 