import React from 'react';
import { 
  Modal, 
  Button, 
  Form, 
  Input, 
  DatePicker, 
  Upload, 
  Select,
  Divider,
  Space
} from 'antd';
import { 
  UploadOutlined, 
  FileTextOutlined,
  CalendarOutlined,
  TagOutlined
} from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/fr_FR';

const { TextArea } = Input;

const AjouterDocumentModal = ({ isOpen, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <FileTextOutlined className="text-primary" />
          <span>Ajouter un document</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button 
          key="cancel" 
          onClick={onClose}
          className="!rounded-none"
        >
          Annuler
        </Button>,
        <Button 
          key="submit" 
          type="primary"
          onClick={handleSubmit}
          className="!rounded-none"
        >
          Enregistrer
        </Button>
      ]}
      width={600}
      className="[&_.ant-modal-content]:!rounded-none [&_.ant-modal-header]:!rounded-t-none"
    >
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
      >
        <Form.Item
          name="type"
          label="Type de document"
          rules={[{ required: true, message: 'Veuillez sélectionner le type de document' }]}
        >
          <Select
            placeholder="Sélectionner le type"
            className="[&_.ant-select-selector]:!rounded-none"
            options={[
              { value: 'carte_grise', label: 'Carte grise' },
              { value: 'assurance', label: 'Assurance' },
              { value: 'controle_technique', label: 'Contrôle technique' },
              { value: 'vignette', label: 'Vignette' },
              { value: 'autre', label: 'Autre' }
            ]}
          />
        </Form.Item>

        <Form.Item
          name="numero"
          label="Numéro du document"
          rules={[{ required: true, message: 'Veuillez saisir le numéro du document' }]}
        >
          <Input 
            placeholder="Ex: CG-2024-12345"
            className="!rounded-none"
          />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="dateEmission"
            label="Date d'émission"
            rules={[{ required: true, message: 'Veuillez sélectionner la date d\'émission' }]}
          >
            <DatePicker
              locale={locale}
              className="w-full !rounded-none"
              format="DD/MM/YYYY"
              placeholder="Sélectionner la date"
            />
          </Form.Item>

          <Form.Item
            name="dateExpiration"
            label="Date d'expiration"
            rules={[{ required: true, message: 'Veuillez sélectionner la date d\'expiration' }]}
          >
            <DatePicker
              locale={locale}
              className="w-full !rounded-none"
              format="DD/MM/YYYY"
              placeholder="Sélectionner la date"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea 
            rows={3}
            placeholder="Description du document..."
            className="!rounded-none"
          />
        </Form.Item>

        <Form.Item
          name="document"
          label="Fichier"
          rules={[{ required: true, message: 'Veuillez télécharger le document' }]}
        >
          <Upload
            maxCount={1}
            className="w-full [&_.ant-upload-select]:!rounded-none"
          >
            <Button 
              icon={<UploadOutlined />} 
              className="w-full !rounded-none"
            >
              Télécharger le document
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes additionnelles"
        >
          <TextArea 
            rows={2}
            placeholder="Notes ou commentaires..."
            className="!rounded-none"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AjouterDocumentModal; 