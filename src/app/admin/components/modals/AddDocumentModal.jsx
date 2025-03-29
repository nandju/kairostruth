import React from 'react';
import { Modal, Button, Select, Input } from 'antd';

const AddDocumentModal = ({
  isVisible,
  onCancel,
  onConfirm,
  selectedDocumentType,
  setSelectedDocumentType,
  documentFile,
  setDocumentFile,
  documentExpiration,
  setDocumentExpiration,
  documentTypes
}) => {
  const resetForm = () => {
    setSelectedDocumentType(null);
    setDocumentFile(null);
    setDocumentExpiration(null);
  };

  return (
    <Modal
      title="Ajouter un document"
      open={isVisible}
      onCancel={() => {
        onCancel();
        resetForm();
      }}
      footer={[
        <Button 
          key="cancel" 
          onClick={() => {
            onCancel();
            resetForm();
          }}
          className="!rounded-none"
        >
          Annuler
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => onConfirm()}
          disabled={!selectedDocumentType || !documentFile}
          className="!rounded-none"
        >
          Ajouter le document
        </Button>
      ]}
      className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-none [&_.ant-modal-footer]:!rounded-none"
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-2">Type de document</p>
          <Select
            placeholder="Sélectionner le type de document"
            className="w-full [&_.ant-select-selector]:!rounded-none [&_.ant-select-dropdown]:!rounded-none"
            onChange={(value) => setSelectedDocumentType(value)}
            value={selectedDocumentType}
            options={documentTypes}
            popupClassName="!rounded-none"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Fichier du document</p>
          <Input
            type="file"
            onChange={(e) => setDocumentFile(e.target.files[0])}
            className="!rounded-none file:!rounded-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <p className="text-xs text-gray-400 mt-1">Formats acceptés: PDF, JPG, PNG</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Date d'expiration</p>
          <Input
            type="date"
            onChange={(e) => setDocumentExpiration(e.target.value)}
            value={documentExpiration}
            className="!rounded-none"
            min={new Date().toISOString().split('T')[0]}
          />
          <p className="text-xs text-gray-400 mt-1">Laisser vide si le document n'expire pas</p>
        </div>

        <div className="bg-blue-50 p-4 mt-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Le document sera marqué comme "En attente" jusqu'à sa validation par un administrateur.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AddDocumentModal; 