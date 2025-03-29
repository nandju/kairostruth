import React from 'react';
import { Modal, Button, Select, Tag } from 'antd';

const ChangeVehiculeModal = ({ 
  isVisible, 
  onCancel, 
  onConfirm, 
  selectedVehicule,
  setSelectedVehicule,
  vehiculesDisponibles 
}) => {
  return (
    <Modal
      title="Changer de véhicule"
      open={isVisible}
      onCancel={() => {
        onCancel();
        setSelectedVehicule(null);
      }}
      footer={[
        <Button 
          key="cancel" 
          onClick={() => {
            onCancel();
            setSelectedVehicule(null);
          }}
          className="!rounded-none"
        >
          Annuler
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => onConfirm(selectedVehicule)}
          disabled={!selectedVehicule}
          className="!rounded-none"
        >
          Confirmer le changement
        </Button>
      ]}
      className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-none [&_.ant-modal-footer]:!rounded-none"
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-2">Sélectionner un nouveau véhicule</p>
          <Select
            placeholder="Choisir un véhicule"
            className="w-full [&_.ant-select-selector]:!rounded-none [&_.ant-select-dropdown]:!rounded-none"
            onChange={(value) => setSelectedVehicule(value)}
            value={selectedVehicule}
            popupClassName="!rounded-none"
          >
            {vehiculesDisponibles.map((vehicule) => (
              <Select.Option key={vehicule.id} value={vehicule.id}>
                <div className="flex items-center justify-between">
                  <span>{vehicule.modele}</span>
                  <Tag className="!rounded-none" color="success">{vehicule.immatriculation}</Tag>
                </div>
              </Select.Option>
            ))}
          </Select>
        </div>

        {selectedVehicule && (
          <div className="bg-gray-50 p-4">
            <h4 className="font-medium mb-2">Détails du véhicule sélectionné</h4>
            {vehiculesDisponibles
              .filter(v => v.id === selectedVehicule)
              .map(vehicule => (
                <div key={vehicule.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Modèle:</span>
                    <span className="font-medium">{vehicule.modele}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Immatriculation:</span>
                    <Tag className="!rounded-none" color="success">{vehicule.immatriculation}</Tag>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Statut:</span>
                    <Tag className="!rounded-none" color="processing">{vehicule.statut}</Tag>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="bg-yellow-50 p-4 mt-4">
          <p className="text-sm text-yellow-700">
            <strong>Note:</strong> Le changement de véhicule sera effectif immédiatement. 
            L'ancien véhicule sera marqué comme disponible.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeVehiculeModal; 