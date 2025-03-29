import React from 'react';
import { Modal, Descriptions, Tag, Timeline, Button, Divider } from 'antd';
import { 
  ClockCircleOutlined, 
  ToolOutlined, 
  UserOutlined, 
  DollarOutlined,
  FileTextOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const DetailsInterventionModal = ({ open, onCancel, intervention }) => {
  return (
    <Modal
      title="Détails de l'intervention"
      open={open}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="close" onClick={onCancel} className="!rounded-none">
          Fermer
        </Button>
      ]}
      className="[&_.ant-modal-content]:!rounded-none"
    >
      {/* En-tête avec statut */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-medium">{intervention?.type || 'Révision complète'}</h2>
          <p className="text-gray-500">Référence: {intervention?.reference || 'MAINT-2024-001'}</p>
        </div>
        <Tag 
          color={intervention?.statut === 'Terminée' ? 'success' : 'processing'} 
          className="!rounded-none"
        >
          {intervention?.statut || 'Terminée'}
        </Tag>
      </div>

      {/* Informations principales */}
      <Descriptions 
        bordered 
        column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
        className="mb-6 [&_.ant-descriptions-item-label]:!bg-gray-50"
      >
        <Descriptions.Item 
          label={<><ClockCircleOutlined className="mr-2" />Date</>}
          span={1}
        >
          {intervention?.date || '15/01/2024'}
        </Descriptions.Item>
        <Descriptions.Item 
          label={<><ToolOutlined className="mr-2" />Kilométrage</>}
          span={1}
        >
          {intervention?.kilometrage || '42,000'} km
        </Descriptions.Item>
        <Descriptions.Item 
          label={<><UserOutlined className="mr-2" />Technicien</>}
          span={1}
        >
          {intervention?.technicien || 'Mohamed Diop'}
        </Descriptions.Item>
        <Descriptions.Item 
          label={<><DollarOutlined className="mr-2" />Coût total</>}
          span={1}
        >
          {intervention?.cout?.toLocaleString() || '250,000'} FCFA
        </Descriptions.Item>
      </Descriptions>

      {/* Détails des travaux */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Détails des travaux effectués</h3>
        <Timeline
          items={[
            {
              color: 'green',
              children: (
                <div>
                  <p className="font-medium">Changement d'huile moteur</p>
                  <p className="text-sm text-gray-500">Huile synthétique 5W-40</p>
                </div>
              ),
            },
            {
              color: 'green',
              children: (
                <div>
                  <p className="font-medium">Remplacement des filtres</p>
                  <p className="text-sm text-gray-500">Filtre à huile, air et habitacle</p>
                </div>
              ),
            },
            {
              color: 'green',
              children: (
                <div>
                  <p className="font-medium">Changement plaquettes de frein</p>
                  <p className="text-sm text-gray-500">Plaquettes avant et arrière</p>
                </div>
              ),
            }
          ]}
        />
      </div>

      {/* Pièces remplacées */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Pièces remplacées</h3>
        <Descriptions bordered>
          <Descriptions.Item label="Huile moteur">5L - Shell Helix Ultra</Descriptions.Item>
          <Descriptions.Item label="Filtre à huile">Référence: OF-2024-A</Descriptions.Item>
          <Descriptions.Item label="Plaquettes de frein">Référence: BP-2024-X4</Descriptions.Item>
        </Descriptions>
      </div>

      {/* Observations et recommandations */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Observations et recommandations</h3>
        <div className="bg-gray-50 p-4">
          <p className="text-sm">
            Tous les travaux ont été effectués selon les spécifications du constructeur. 
            Il est recommandé de prévoir un contrôle des pneus dans les 5,000 km.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button icon={<FileTextOutlined />} className="!rounded-none">
          Télécharger le rapport
        </Button>
        <Button icon={<DollarOutlined />} className="!rounded-none">
          Voir la facture
        </Button>
      </div>
    </Modal>
  );
};

export default DetailsInterventionModal; 