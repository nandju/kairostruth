import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Tag, 
  Space, 
  Progress, 
  Tooltip, 
  Empty,
  Input,
  Statistic,
  Alert
} from 'antd';
import { 
  EditOutlined, 
  FileTextOutlined, 
  CalendarOutlined, 
  UploadOutlined,
  EyeOutlined,
  DownloadOutlined,
  SearchOutlined,
  PlusOutlined,
  WarningOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import PreviewDocumentModal from './modals/PreviewDocumentModal';
import AjouterDocumentModal from './modals/AjouterDocumentModal';

const DocumentsVehiculeComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [ajouterVisible, setAjouterVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Données de test
  const documents = [
    {
      key: '1',
      document: 'Carte grise',
      expiration: '31/12/2024',
      statut: 'Valide',
      dateCreation: '01/01/2024',
      description: 'Document officiel d\'immatriculation du véhicule',
      thumbnail: '/path/to/thumbnail1.jpg'
    },
    {
      key: '2',
      document: 'Assurance',
      expiration: '15/04/2024',
      statut: 'Expire bientôt',
      dateCreation: '15/04/2023',
      description: 'Assurance tous risques du véhicule',
      thumbnail: '/path/to/thumbnail2.jpg'
    },
    {
      key: '3',
      document: 'Contrôle technique',
      expiration: '01/06/2024',
      statut: 'Valide',
      dateCreation: '01/06/2023',
      description: 'Rapport du dernier contrôle technique',
      thumbnail: '/path/to/thumbnail3.jpg'
    }
  ];

  const handlePreview = (doc) => {
    setSelectedDocument(doc);
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
    setSelectedDocument(null);
  };

  const getExpirationProgress = (date) => {
    const expiration = new Date(date.split('/').reverse().join('-'));
    const now = new Date();
    const total = 365; // 1 an
    const remaining = Math.round((expiration - now) / (1000 * 60 * 60 * 24));
    return Math.min(100, Math.max(0, (remaining / total) * 100));
  };

  const handleAjouterDocument = (values) => {
    console.log('Nouveau document:', values);
    setAjouterVisible(false);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <CheckCircleOutlined className="text-success" />
                Documents valides
              </span>
            }
            value={2}
            suffix="/ 3"
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <WarningOutlined className="text-warning" />
                Expirent bientôt
              </span>
            }
            value={1}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
        <Card bordered={false} className="!rounded-none hover:shadow-md transition-shadow">
          <Statistic
            title={
              <span className="flex items-center gap-2">
                <FileTextOutlined className="text-primary" />
                Total documents
              </span>
            }
            value={3}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </div>

      {/* Barre de recherche et actions */}
      <Card bordered={false} className="!rounded-none">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <Input.Search
            placeholder="Rechercher un document..."
            className="w-full md:w-64 [&_.ant-input]:!rounded-none [&_.ant-input-search-button]:!rounded-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
          />
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            className="!rounded-none w-full md:w-auto"
            onClick={() => setAjouterVisible(true)}
          >
            Ajouter un document
          </Button>
        </div>
      </Card>

      {/* Alerte pour les documents expirant bientôt */}
      <Alert
        message="Documents à renouveler"
        description="L'assurance du véhicule expire dans 15 jours. Veuillez procéder au renouvellement."
        type="warning"
        showIcon
        className="!rounded-none"
        action={
          <Button size="small" type="primary" danger className="!rounded-none">
            Renouveler maintenant
          </Button>
        }
      />

      {/* Grille de documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map(doc => (
          <Card
            key={doc.key}
            bordered={false}
            className="!rounded-none hover:shadow-md transition-shadow"
            actions={[
              <Tooltip title="Voir le document">
                <Button 
                  type="text" 
                  icon={<EyeOutlined />} 
                  onClick={() => handlePreview(doc)}
                />
              </Tooltip>,
              <Tooltip title="Télécharger">
                <Button 
                  type="text" 
                  icon={<DownloadOutlined />} 
                />
              </Tooltip>,
              <Tooltip title="Mettre à jour">
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                />
              </Tooltip>
            ]}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileTextOutlined className="text-primary text-lg" />
                    <h3 className="font-medium">{doc.document}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                </div>
                <Tag 
                  color={
                    doc.statut === 'Valide' ? 'success' : 
                    doc.statut === 'Expire bientôt' ? 'warning' : 
                    'error'
                  } 
                  className="!rounded-none"
                >
                  {doc.statut}
                </Tag>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Expiration</span>
                  <span className="font-medium">{doc.expiration}</span>
                </div>
                <Progress 
                  percent={getExpirationProgress(doc.expiration)} 
                  showInfo={false}
                  strokeColor={
                    getExpirationProgress(doc.expiration) > 50 ? '#52c41a' :
                    getExpirationProgress(doc.expiration) > 20 ? '#faad14' : 
                    '#ff4d4f'
                  }
                  className="!rounded-none"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarOutlined />
                <span>Créé le {doc.dateCreation}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modaux */}
      <PreviewDocumentModal
        isOpen={previewVisible}
        onClose={handleClosePreview}
        document={selectedDocument}
      />

      <AjouterDocumentModal
        isOpen={ajouterVisible}
        onClose={() => setAjouterVisible(false)}
        onSubmit={handleAjouterDocument}
      />
    </div>
  );
};

export default DocumentsVehiculeComponent;
