import React from 'react';
import { Modal, Form, Input, DatePicker, Select, InputNumber, Button } from 'antd';
import { CalendarOutlined, ToolOutlined } from '@ant-design/icons';

const PlanifierMaintenanceModal = ({ open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Planifier une maintenance"
      open={open}
      onCancel={onCancel}
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
          Planifier
        </Button>
      ]}
      className="[&_.ant-modal-content]:!rounded-none"
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
      >
        <Form.Item
          name="type"
          label="Type de maintenance"
          rules={[{ required: true, message: 'Veuillez sélectionner le type de maintenance' }]}
        >
          <Select
            className="[&_.ant-select-selector]:!rounded-none"
            options={[
              { value: 'preventive', label: 'Maintenance préventive' },
              { value: 'revision', label: 'Révision complète' },
              { value: 'vidange', label: 'Vidange' },
              { value: 'pneus', label: 'Contrôle pneus' },
            ]}
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="date"
            label="Date prévue"
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <DatePicker 
              className="w-full !rounded-none" 
              placeholder="Sélectionner une date"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            name="kilometrage"
            label="Kilométrage prévu"
            rules={[{ required: true, message: 'Veuillez entrer le kilométrage' }]}
          >
            <InputNumber
              className="w-full !rounded-none"
              placeholder="45000"
              suffix="km"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Description des travaux"
          rules={[{ required: true, message: 'Veuillez décrire les travaux prévus' }]}
        >
          <Input.TextArea
            className="!rounded-none"
            rows={4}
            placeholder="Détaillez les travaux de maintenance prévus..."
          />
        </Form.Item>

        <Form.Item
          name="garage"
          label="Garage"
          rules={[{ required: true, message: 'Veuillez sélectionner un garage' }]}
        >
          <Select
            className="[&_.ant-select-selector]:!rounded-none"
            options={[
              { value: 'garage1', label: 'Garage Central Auto' },
              { value: 'garage2', label: 'Mécanique Générale Plus' },
              { value: 'garage3', label: 'Auto Service Pro' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="cout"
          label="Coût estimé"
          rules={[{ required: true, message: 'Veuillez entrer le coût estimé' }]}
        >
          <InputNumber
            className="w-full !rounded-none"
            placeholder="150000"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            suffix="FCFA"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PlanifierMaintenanceModal; 