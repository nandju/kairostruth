import React from 'react';
import { 
  Card, 
  Progress, 
  Statistic, 
  Button, 
  Table, 
  Tag, 
  Space, 
  Timeline,
  Alert
} from 'antd';
import {
  CheckCircleOutlined,
  StopOutlined,
  EditOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { AddDocumentModal } from '../../../components/modals';

const DocumentsTab = () => {
  const [isAddDocumentModalVisible, setIsAddDocumentModalVisible] = React.useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = React.useState(null);
  const [documentFile, setDocumentFile] = React.useState(null);
  const [documentExpiration, setDocumentExpiration] = React.useState(null);

  // Liste des types de documents disponibles
  const documentTypes = [
    { value: 'cni', label: 'Carte Nationale d\'Identité' },
    { value: 'permis', label: 'Permis de conduire' },
    { value: 'assurance', label: 'Attestation d\'assurance' },
    { value: 'medical', label: 'Certificat médical' },
    { value: 'casier', label: 'Casier judiciaire' },
    { value: 'residence', label: 'Justificatif de domicile' },
    { value: 'formation', label: 'Attestation de formation' }
  ];

  const handleAddDocument = () => {
    if (selectedDocumentType && documentFile) {
      // Ici, vous implementerez la logique pour ajouter le document
      console.log('Ajout du document:', {
        type: selectedDocumentType,
        file: documentFile,
        expiration: documentExpiration
      });
      setIsAddDocumentModalVisible(false);
      resetDocumentForm();
    }
  };

  const resetDocumentForm = () => {
    setSelectedDocumentType(null);
    setDocumentFile(null);
    setDocumentExpiration(null);
  };

  return (
    <div className="space-y-6">
      {/* État de complétude */}
      <Card bordered={false} className="!rounded-none">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium mb-1">État du dossier</h3>
            <p className="text-gray-500">8 documents sur 10 sont validés</p>
          </div>
          <Progress 
            type="circle" 
            percent={80} 
            width={80}
            strokeColor="#52c41a"
            className="!rounded-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card bordered={false} className="!rounded-none bg-green-50">
            <Statistic
              title="Documents validés"
              value={8}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
          <Card bordered={false} className="!rounded-none bg-red-50">
            <Statistic
              title="Documents manquants"
              value={2}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<StopOutlined />}
            />
          </Card>
        </div>
      </Card>

      {/* Liste des documents */}
      <Card 
        title="Documents administratifs" 
        bordered={false} 
        className="!rounded-none"
        extra={
          <Button 
            type="primary"
            icon={<EditOutlined />}
            className="!rounded-none"
            onClick={() => setIsAddDocumentModalVisible(true)}
          >
            Ajouter un document
          </Button>
        }
      >
        <Table
          dataSource={[
            {
              key: '1',
              document: 'Carte Nationale d\'Identité',
              dateExpiration: '15/03/2025',
              dateAjout: '15/03/2024',
              statut: 'Validé',
              validePar: 'Admin System'
            },
            {
              key: '2',
              document: 'Permis de conduire',
              dateExpiration: '20/06/2026',
              dateAjout: '15/03/2024',
              statut: 'Validé',
              validePar: 'Admin System'
            },
            {
              key: '3',
              document: 'Attestation d\'assurance',
              dateExpiration: '31/12/2024',
              dateAjout: '15/03/2024',
              statut: 'Validé',
              validePar: 'Admin System'
            },
            {
              key: '4',
              document: 'Certificat médical',
              dateExpiration: '15/03/2025',
              dateAjout: '15/03/2024',
              statut: 'En attente',
              validePar: '-'
            },
            {
              key: '5',
              document: 'Casier judiciaire',
              dateExpiration: 'N/A',
              dateAjout: '15/03/2024',
              statut: 'Manquant',
              validePar: '-'
            }
          ]}
          columns={[
            {
              title: 'Document',
              dataIndex: 'document',
              key: 'document',
              render: (text) => (
                <div className="flex items-center gap-2">
                  <HistoryOutlined className="text-primary" />
                  <span>{text}</span>
                </div>
              )
            },
            {
              title: 'Date d\'expiration',
              dataIndex: 'dateExpiration',
              key: 'dateExpiration',
              render: (date) => (
                <span className={
                  date === 'N/A' ? 'text-gray-400' :
                  new Date(date.split('/').reverse().join('-')) < new Date() ? 'text-red-500' :
                  new Date(date.split('/').reverse().join('-')) < new Date(Date.now() + 30*24*60*60*1000) ? 'text-yellow-500' :
                  'text-green-500'
                }>
                  {date}
                </span>
              )
            },
            {
              title: 'Date d\'ajout',
              dataIndex: 'dateAjout',
              key: 'dateAjout'
            },
            {
              title: 'Statut',
              dataIndex: 'statut',
              key: 'statut',
              render: (statut) => (
                <Tag 
                  color={
                    statut === 'Validé' ? 'success' :
                    statut === 'En attente' ? 'warning' :
                    'error'
                  }
                  className="!rounded-none"
                >
                  {statut}
                </Tag>
              )
            },
            {
              title: 'Validé par',
              dataIndex: 'validePar',
              key: 'validePar'
            },
            {
              title: 'Actions',
              key: 'actions',
              render: (_, record) => (
                <Space>
                  <Button 
                    type="link" 
                    className="text-primary p-0"
                  >
                    Voir
                  </Button>
                  {record.statut !== 'Validé' && (
                    <Button 
                      type="link" 
                      className="text-success p-0"
                    >
                      Valider
                    </Button>
                  )}
                  <Button 
                    type="link" 
                    className="text-error p-0"
                  >
                    Supprimer
                  </Button>
                </Space>
              )
            }
          ]}
          className="!rounded-none [&_.ant-table-cell]:!rounded-none [&_.ant-table-thead_.ant-table-cell]:!rounded-none"
          pagination={false}
        />
      </Card>

      {/* Historique des modifications */}
      <Card 
        title="Historique des modifications" 
        bordered={false} 
        className="!rounded-none"
      >
        <Timeline
          items={[
            {
              color: 'green',
              children: (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Validation du permis de conduire</p>
                    <Tag color="success" className="!rounded-none">Validé</Tag>
                  </div>
                  <p className="text-sm text-gray-500">Par Admin System - 15/03/2024 à 14:30</p>
                </div>
              )
            },
            {
              color: 'blue',
              children: (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Ajout du certificat médical</p>
                    <Tag color="processing" className="!rounded-none">Ajouté</Tag>
                  </div>
                  <p className="text-sm text-gray-500">Par John Doe - 15/03/2024 à 14:25</p>
                </div>
              )
            },
            {
              color: 'red',
              children: (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Suppression de l'ancien permis</p>
                    <Tag color="error" className="!rounded-none">Supprimé</Tag>
                  </div>
                  <p className="text-sm text-gray-500">Par Admin System - 15/03/2024 à 14:20</p>
                </div>
              )
            }
          ]}
        />
      </Card>

      {/* Rappels et notifications */}
      <Card 
        title="Rappels et notifications" 
        bordered={false} 
        className="!rounded-none"
      >
        <div className="space-y-4">
          <Alert
            message="Document expirant bientôt"
            description="L'attestation d'assurance expire dans 30 jours. Veuillez prévoir son renouvellement."
            type="warning"
            showIcon
            className="!rounded-none"
          />
          <Alert
            message="Document manquant"
            description="Le casier judiciaire n'a pas encore été fourni. Ce document est requis pour la validation complète du dossier."
            type="error"
            showIcon
            className="!rounded-none"
          />
        </div>
      </Card>

      {/* Modal d'ajout de document */}
      <AddDocumentModal 
        isVisible={isAddDocumentModalVisible}
        onCancel={() => {
          setIsAddDocumentModalVisible(false);
          resetDocumentForm();
        }}
        onConfirm={handleAddDocument}
        selectedDocumentType={selectedDocumentType}
        setSelectedDocumentType={setSelectedDocumentType}
        documentFile={documentFile}
        setDocumentFile={setDocumentFile}
        documentExpiration={documentExpiration}
        setDocumentExpiration={setDocumentExpiration}
        documentTypes={documentTypes}
      />
    </div>
  );
};

export default DocumentsTab; 