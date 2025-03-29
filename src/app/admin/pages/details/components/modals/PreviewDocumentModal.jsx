import React from 'react';
import { Modal, Button, Tag } from 'antd';
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons';

const PreviewDocumentModal = ({ isOpen, onClose, document }) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <FileTextOutlined className="text-primary" />
          <span>Aperçu du document</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button 
          key="download" 
          icon={<DownloadOutlined />}
          className="!rounded-none"
        >
          Télécharger
        </Button>,
        <Button 
          key="close" 
          onClick={onClose}
          className="!rounded-none"
        >
          Fermer
        </Button>
      ]}
      width={800}
      className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-t-none"
    >
      {document && (
        <div className="space-y-4">
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <FileTextOutlined style={{ fontSize: 48 }} className="text-gray-300" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">{document.document}</h3>
            <p className="text-gray-500">{document.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Date d'expiration: {document.expiration}
              </span>
              <Tag 
                color={
                  document.statut === 'Valide' ? 'success' : 
                  document.statut === 'Expire bientôt' ? 'warning' : 
                  'error'
                } 
                className="!rounded-none"
              >
                {document.statut}
              </Tag>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PreviewDocumentModal; 