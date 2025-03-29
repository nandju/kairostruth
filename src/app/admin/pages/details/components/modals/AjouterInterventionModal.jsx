import React from 'react';
import { Modal, Form, Input, DatePicker, Select, InputNumber, Button, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const AjouterInterventionModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Nouvelle intervention"
      open={open}
      onCancel={onCancel}
      width={800}
      footer={[
        <Button key="cancel" onClick={onCancel} className="!rounded-none">
          Annuler
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          className="!rounded-none"
        >
          Enregistrer l'intervention
        </Button>
      ]}
      className="[&_.ant-modal-content]:!rounded-none"
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
      >
        {/* Informations générales */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Informations générales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label="Type d'intervention"
              rules={[{ required: true, message: 'Veuillez sélectionner le type d\'intervention' }]}
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'revision', label: 'Révision complète' },
                  { value: 'reparation', label: 'Réparation' },
                  { value: 'maintenance', label: 'Maintenance préventive' },
                  { value: 'diagnostic', label: 'Diagnostic' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="priorite"
              label="Priorité"
              rules={[{ required: true, message: 'Veuillez sélectionner la priorité' }]}
            >
              <Select
                className="[&_.ant-select-selector]:!rounded-none"
                options={[
                  { value: 'haute', label: 'Haute' },
                  { value: 'moyenne', label: 'Moyenne' },
                  { value: 'basse', label: 'Basse' },
                ]}
              />
            </Form.Item>
          </div>
        </div>

        {/* Détails de l'intervention */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Détails de l'intervention</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="date"
              label="Date de l'intervention"
              rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
            >
              <DatePicker 
                className="w-full !rounded-none" 
                format="DD/MM/YYYY"
              />
            </Form.Item>
            <Form.Item
              name="kilometrage"
              label="Kilométrage"
              rules={[{ required: true, message: 'Veuillez entrer le kilométrage' }]}
            >
              <InputNumber
                className="w-full !rounded-none"
                placeholder="42500"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                suffix="km"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="description"
            label="Description des travaux"
            rules={[{ required: true, message: 'Veuillez décrire les travaux effectués' }]}
          >
            <Input.TextArea
              className="!rounded-none"
              rows={4}
              placeholder="Détaillez les travaux effectués..."
            />
          </Form.Item>
        </div>

        {/* Pièces et coûts */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Pièces et coûts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="pieces"
              label="Pièces remplacées"
            >
              <Select
                mode="multiple"
                className="[&_.ant-select-selector]:!rounded-none"
                placeholder="Sélectionnez les pièces"
                options={[
                  { value: 'huile', label: 'Huile moteur' },
                  { value: 'filtre_huile', label: 'Filtre à huile' },
                  { value: 'filtre_air', label: 'Filtre à air' },
                  { value: 'plaquettes', label: 'Plaquettes de frein' },
                  { value: 'pneus', label: 'Pneus' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="cout"
              label="Coût total"
              rules={[{ required: true, message: 'Veuillez entrer le coût' }]}
            >
              <InputNumber
                className="w-full !rounded-none"
                placeholder="150000"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                suffix="FCFA"
              />
            </Form.Item>
          </div>
        </div>

        {/* Documents */}
        <div>
          <h3 className="font-medium mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="rapport"
              label="Rapport d'intervention"
            >
              <Upload>
                <Button icon={<UploadOutlined />} className="!rounded-none">
                  Ajouter le rapport
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="facture"
              label="Facture"
            >
              <Upload>
                <Button icon={<UploadOutlined />} className="!rounded-none">
                  Ajouter la facture
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AjouterInterventionModal; 