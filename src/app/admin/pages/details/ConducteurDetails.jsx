import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Tabs, 
  Tag, 
  Progress, 
  Statistic, 
  Timeline,
  Table,
  Space,
  Avatar,
  Divider,
  Input,
  Select,
  Alert,
  Modal,
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
  ArrowLeftOutlined,
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  HistoryOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { 
  DocumentsTab,
  AperçuTab,
  VehiculeTab,
  HistoriqueTab
} from './components';

const ConducteurDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSuspendModalVisible, setIsSuspendModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);

  const handleSuspend = () => {
    // TODO: Implémenter la logique de suspension
    console.log('Conducteur suspendu:', id);
    setIsSuspendModalVisible(false);
  };

  const handleDelete = () => {
    // TODO: Implémenter la logique de suppression
    console.log('Conducteur supprimé:', id);
    setIsDeleteModalVisible(false);
    // Rediriger vers la liste des conducteurs après la suppression
    navigate('/admin/conducteurs');
  };

  // Données mockées pour l'exemple
  const conducteur = {
    id,
    nom: 'John Doe',
    email: 'john.doe@example.com',
    telephone: '+221 77 123 45 67',
    adresse: 'Dakar, Sénégal',
    dateInscription: '15/03/2024',
    statut: 'Actif',
    note: 4.8,
    vehicule: 'Toyota Corolla',
    nombreCourses: 156,
    revenuTotal: '850,000 XOF',
    tauxAcceptation: 95
  };

  const activites = [
    { date: '20/03/2024', action: 'Course complétée', montant: '5,000 XOF', statut: 'success' },
    { date: '19/03/2024', action: 'Maintenance véhicule', montant: '-25,000 XOF', statut: 'warning' },
    { date: '18/03/2024', action: 'Course complétée', montant: '7,500 XOF', statut: 'success' },
  ];

  const statsCards = [
    {
      title: 'Courses Totales',
      value: conducteur.nombreCourses,
      icon: <CarOutlined className="text-2xl" />,
      color: 'blue'
    },
    {
      title: 'Note Moyenne',
      value: conducteur.note,
      icon: <StarFilled className="text-2xl" />,
      color: 'yellow',
      suffix: '/ 5.0'
    },
    {
      title: 'Taux d\'acceptation',
      value: conducteur.tauxAcceptation,
      icon: <CheckCircleOutlined className="text-2xl" />,
      color: 'green',
      suffix: '%'
    }
  ];

  const items = [
    {
      key: '1',
      label: 'Aperçu',
      children: <AperçuTab conducteur={conducteur} />
    },
    {
      key: '2',
      label: 'Véhicule',
      children: <VehiculeTab />
    },
    {
      key: '3',
      label: 'Historique',
      children: <HistoriqueTab />
    },
    {
      key: '4',
      label: 'Documents',
      children: <DocumentsTab />
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Bouton retour */}
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin/conducteurs')}
          className="!rounded-none mb-6 border-primary text-primary hover:text-primary hover:border-primary"
        >
          Retour à la liste
        </Button>

        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-6">
            <Avatar 
              size={64} 
              icon={<UserOutlined />} 
              className="bg-primary"
            />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-clash font-semibold text-gray-800">
                  {conducteur.nom}
                </h1>
                <Tag 
                  icon={<CheckCircleOutlined />}
                  color="success"
                  className="!rounded-none"
                >
                  {conducteur.statut}
                </Tag>
              </div>
              <p className="text-gray-500">ID: {conducteur.id}</p>
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
              icon={<StopOutlined />}
              onClick={() => setIsSuspendModalVisible(true)}
              className="!rounded-none border-yellow-500 text-yellow-500"
            >
              Suspendre
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

        {/* Modal de confirmation de suspension */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <WarningOutlined className="text-yellow-500 text-xl" />
              <span>Confirmer la suspension</span>
            </div>
          }
          open={isSuspendModalVisible}
          onCancel={() => setIsSuspendModalVisible(false)}
          footer={[
            <Button 
              key="cancel" 
              onClick={() => setIsSuspendModalVisible(false)}
              className="!rounded-none"
            >
              Annuler
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={handleSuspend}
              className="!rounded-none !bg-yellow-500 !border-yellow-500 hover:!bg-yellow-600 hover:!border-yellow-600"
              icon={<StopOutlined />}
            >
              Confirmer la suspension
            </Button>
          ]}
          className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-none [&_.ant-modal-footer]:!rounded-none"
        >
          <div className="py-4">
            <p className="text-gray-600">
              Êtes-vous sûr de vouloir suspendre le compte de <strong>{conducteur.nom}</strong> ?
            </p>
            <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 space-y-2">
              <p><strong>Conséquences de la suspension :</strong></p>
              <ul className="list-disc list-inside">
                <li>Le conducteur ne pourra plus accepter de nouvelles courses</li>
                <li>Son profil restera visible mais sera marqué comme "Suspendu"</li>
                <li>Les courses en cours seront maintenues jusqu'à leur terme</li>
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
              Êtes-vous sûr de vouloir supprimer définitivement le compte de <strong>{conducteur.nom}</strong> ?
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

export default ConducteurDetails; 